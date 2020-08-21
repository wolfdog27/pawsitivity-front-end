import React, { Component, useState } from "react";
import { Layout } from 'antd';
import AnimalCardComp from "../components/animalCard"
import './Swipe.css'
import petAPI from "../utils/petAPI";
import matchAPI from "../utils/matchAPI";
import userAPI from "../utils/userAPI";

const { Content } = Layout;


class Swipe extends Component {
  state = {
    pets: [],
    userId: "",
    likedPets: []
  }

  componentDidMount() {
    userAPI.getCurrentUserInfo().then(res => {
      this.setState({
        userId: res.data.userId
      })
    })

    petAPI.petSearch().then(res => {
      this.setState({
        pets: res.data
      })
    })
  }

  onLikeButtonClick = () => {
    let newPetArray = [... this.state.pets]
    const petObject = {
      petfinderId: newPetArray[0].id,
      isLiked: true
    }
    matchAPI.saveMatch(petObject)
    newPetArray.shift()
    this.setState({ pets: newPetArray })
  }

  onDislikeButtonClick = () => {
    let newPetArray = [... this.state.pets]
    newPetArray.shift()
    this.setState({ pets: newPetArray })
    console.log(newPetArray)
  }

  render() {
    return (

      <Layout>
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