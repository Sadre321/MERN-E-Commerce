import "./Tabs.css"
import Reviews from "../../Reviews/Reviews"
import { useState } from "react"
import PropTypes from "prop-types"

const Tabs = ({product}) => {
  
  const [activeTabs,setActiveTabs] = useState("desc");
  
  const handleTabClick =(e,tabs)=>{
    e.preventDefault();
    setActiveTabs(tabs);
  }

  return (
    <div className="single-tabs">
    <ul className="tab-list">
      <li>
        <a href="#" className={`tab-button ${activeTabs==="desc"&&"active"}`} onClick={(e)=>{
          handleTabClick(e,"desc")
        }}>
          Description
        </a>
      </li>
      <li>
        <a href="#" className={`tab-button ${activeTabs==="info"&&"active"}`} onClick={(e)=>{
          handleTabClick(e,"info")
        }}>
          Additional information
        </a>
      </li>
      <li>
        <a href="#" className={`tab-button ${activeTabs==="reviews"&&"active"}`} onClick={(e)=>{
          handleTabClick(e,"reviews")
        }}>
          Reviews
        </a>
      </li>
    </ul>
    <div className="tab-panel">
      <div className={`tab-panel-descriptions content ${activeTabs==="desc"&&"active"}`} id="desc">
        <p className="product-description" dangerouslySetInnerHTML={{__html:product.description}}></p>
        </div>
      <div className={`tab-panel-information content ${activeTabs==="info"&&"active"}`} id="info">
        <h3>Additional information</h3>
        <table>
          <tbody>
            <tr>
              <th>Color</th>
              <td>
                <p>
                  Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                  White
                </p>
              </td>
            </tr>
            <tr>
              <th>Size</th>
              <td>
              <p>
                    {product.sizes.map((item, index) => (
                      <span key={index}>
                        {item.toUpperCase()}
                        {index < product.sizes.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Reviews activeTabs={activeTabs==="reviews"&&"active"} product={product}/>
    </div>
  </div>
  )
}

export default Tabs
Tabs.propTypes ={
  product:PropTypes.object
}