import { useEffect, useState } from "react";
import "./Category.css";
import CategoryItem from './CategoryItem';
import { message } from "antd";

const Categories = () => {
  
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [categoryData, setCategoryData] = useState([]);

  useEffect(()=>{
    const fetchCategories = async() => {
      try {
        const response = await fetch(`${apiUri}/api/categories`);
  
        if (response.ok) {
          const data = await response.json();
          setCategoryData(data);
        } else {
          message.error("Giriş yaparken bir hata oluştu");
        }
      } catch (error) {
        console.log("Giriş hatası:", error);
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    };

    fetchCategories();
  },[apiUri])
  
  return (
    <section className="categories">
    <div className="container">
      <div className="section-title">
        <h2>All Categories</h2>
        <p>Summer Collection New Morden Design</p>
      </div>
      <ul className="category-list">
        {categoryData.map((category)=>(
          <CategoryItem key={category._id} category={category}/>
        ))}        
      </ul>
    </div>
  </section>
  )
}

export default Categories