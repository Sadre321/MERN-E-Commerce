import "./Tabs.css"
import Reviews from "../../Reviews/Reviews"
import { useState } from "react"

const Tabs = () => {
  
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
        <p>
          Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin
          vitae magna in dui finibus malesuada et at nulla. Morbi elit ex,
          viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum
          iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales
          nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc
          tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt.
          Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.
        </p>
        <br />
        <p>
          Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin
          vitae magna in dui finibus malesuada et at nulla. Morbi elit ex,
          viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum
          iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales
          nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc
          tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt.
          Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.
        </p>
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
                <p>XXS, XS, S, M, L, XL, XXL</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Reviews activeTabs={activeTabs==="reviews"&&"active"}/>
    </div>
  </div>
  )
}

export default Tabs