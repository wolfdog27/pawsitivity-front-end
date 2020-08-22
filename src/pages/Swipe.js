import React, { Component, useState } from "react";
import { Layout } from 'antd';
import AnimalCardComp from "../components/animalCard"
import './Swipe.css'
import petAPI from "../utils/petAPI";
import matchAPI from "../utils/matchAPI";
import userAPI from "../utils/userAPI";
import HeaderComp from "../components/Header"

const { Content } = Layout;


class Swipe extends Component {
  state = {
    pets: [],
    matchedPets: []
  }

  componentDidMount() {
    this.gatherUserAndPetfinderInfo()
  }

  gatherUserAndPetfinderInfo = async () => {
    const matchArr = []

    let results = await matchAPI.getMatchInfo()
    results.data.petfinderMatches.push(results.data.shelterMatches)
    this.setState({ matchedPets: results.data.petfinderMatches })
    let { data } = await petAPI.petSearch()
    this.setState({ pets: data })

    const petCopy = [... this.state.pets]
    const matchedPetsCopy = [... this.state.matchedPets]
    matchedPetsCopy.forEach(match => matchArr.push(parseInt(match.petfinderId)))
    let filteredPets = petCopy.filter(pet => {
      if (!matchArr.includes(pet.id)) return true
    })
    this.setState({ pets: filteredPets })
  }

  onLikeButtonClick = async () => {
    let newPetArray = [... this.state.pets]
    const petObject = {
      PetfinderId: newPetArray[0].id,
      isLiked: true
    }
    await matchAPI.saveMatch(petObject)
    newPetArray.shift()
    this.setState({ pets: newPetArray })
  }

  onDislikeButtonClick = async () => {
    let newPetArray = [... this.state.pets]
    const petObject = {
      PetfinderId: newPetArray[0].id,
      isLiked: false
    }
    await matchAPI.saveMatch(petObject)
    newPetArray.shift()
    this.setState({ pets: newPetArray })
  }

  render() {
    return (
      <Layout>
        <HeaderComp />
        <Content >
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {this.state.pets.length > 0 ? <AnimalCardComp like={this.onLikeButtonClick} dislike={this.onDislikeButtonClick} pet={this.state.pets[0]}
              imageSrc={this.state.pets[0].photos && this.state.pets[0].photos.length && this.state.pets[0].photos[0] && this.state.pets[0].photos[0].small
                ?
                (
                  this.state.pets[0].primary_photo_cropped.full
                    ?
                    this.state.pets[0].primary_photo_cropped.full
                    :
                    "https://www.lotus-supplies.com/wp-content/uploads/2019/07/image-coming-soon.jpg"
                )
                :
                "https://www.lotus-supplies.com/wp-content/uploads/2019/07/image-coming-soon.jpg"}

            /> : <img src={"https://home.ask.vet/images/loading-dog.gif"} className="tableImage" />}
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Swipe;