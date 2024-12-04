import Products from '../Components/Products/Products'
import Categories from '../Components/Category/Categories'
import CampaignSingle from '../Components/CampaignSingle/CampaignSingle'

const ShopPage = () => {
  return (
    <>
      <Categories/>
      <Products/>
      <CampaignSingle/>
      <Products/>
    </>
  )
}

export default ShopPage