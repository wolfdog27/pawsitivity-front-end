import React from 'react'
import { PageHeader} from 'antd';
import { Link } from "react-router-dom"
import logo3Jpeg from '../Header/logo3.jpeg';
import LogoutComp from '../Logout'


export default function HeaderComp() {
    return (
            <PageHeader
                className="site-page-header-responsive" //flex className to try and justify center align space around in css
                title={<a href="/swipe"><img className="logo" Link="/swipe" alt="logo" src={logo3Jpeg} /></a>}
                extra={[
                    <Link justify='space-around' key={1} className="headerLink" to="/swipe">Swipe</Link>,
                    <Link justify='space-around' key={2} className="headerLink" to="/updateprofile">Profile</Link>,
                    <Link justify='space-around' key={3} className="headerLink" to="/matches">Matches</Link>,
                    <LogoutComp/>
                ]}
            />
    )
}