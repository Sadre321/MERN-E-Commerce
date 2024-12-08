import Proptypes from "prop-types";
import Header from "../Components/Layout/Header/Header";
import Footer from "../Components/Layout/Footer/Footer";
import Search from "../Components/Modals/Search/Search";
import { useEffect, useState } from "react";
import Dialog from "../Components/Modals/Dialog/Dialog";

const MainLayouts = ({children}) => {

    const [isSearchShow,setIsSearchShow] = useState(false);
    const [isDialogShow,setIsDialogShow] = useState(false);

    useEffect(()=>{

        const dialogStatus = localStorage.getItem("dialog")?JSON.parse(localStorage.getItem("dialog")):localStorage.setItem("dialog",JSON.stringify(true));

        setTimeout(()=>{
            setIsDialogShow(dialogStatus);
        },2000)
    },[])

  return (
    <div className="main-layout">
        <Search setIsSearchShow={setIsSearchShow} isSearchShow={isSearchShow}/>
        <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow}/>
        <Header setIsSearchShow={setIsSearchShow}/>
        {children}
        <Footer/>
    </div>
)
}

export default MainLayouts;

MainLayouts.propTypes = {
    children:Proptypes.node
}