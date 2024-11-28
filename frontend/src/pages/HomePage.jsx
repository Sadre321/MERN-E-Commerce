import React from 'react'
import Blogs from '../Components/Blogs/Blogs'
import Brands from '../Components/Brands/Brands'
import Campaings from '../Components/Campaigns/Campaings'
import CampaignSingle from '../Components/CampaignSingle/CampaignSingle'
import Categories from '../Components/Category/Categories'
import Footer from '../Components/Layouts/Footer/Footer'
import Header from '../Components/Layouts/Header/Header'
import Policy from '../Components/Layouts/Policy/Policy'
import Products from '../Components/Products/Products'
import Slider from '../Components/Slider/Slider'

const HomePage = () => {
  return (
    <>
        <Header/>
        <Slider/>
        <Categories/>
        <Products/>
        <Campaings/>
        <Products/>
        <Blogs/>
        <Brands/>
        <CampaignSingle/>
        <Policy/>
        <Footer/>
    </>
  )
}

export default HomePage