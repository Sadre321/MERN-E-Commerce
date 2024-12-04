import Blogs from '../Components/Blogs/Blogs'
import Brands from '../Components/Brands/Brands'
import Campaings from '../Components/Campaigns/Campaings'
import CampaignSingle from '../Components/CampaignSingle/CampaignSingle'
import Categories from '../Components/Category/Categories'
import Products from '../Components/Products/Products'
import Slider from '../Components/Slider/Slider'

const HomePage = () => {
  return (
    <>
        <Slider/>
        <Categories/>
        <Products/>
        <Campaings/>
        <Products/>
        <Blogs/>
        <Brands/>
        <CampaignSingle/>
    </>
  )
}

export default HomePage