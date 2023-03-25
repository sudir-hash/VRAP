import axios from "axios";
import { useContext, useEffect,useState } from "react";
import { FeatureCategoryContext } from "../../../Context/FeaturedCategoryContext";
import CategoryCard from "../../Card/FeaturedCard/CategoryCard";
import FeaturedCard from "../../Card/FeaturedCard/FeaturedCategoryCard";
import getLocation from "../../../utils/getLocation";

import './FeaturedCategories.css'




const Categories = () => {
    const [shops,setShops]=useState([]);
    const [location,setLocation]=useState({latitude:0,longitude:0});
    const getFeaturedCategories = async () => {
        try {
            getLocation(setLocation)
            console.log(location)
            const response = await axios.post(
                'http://localhost:8003/shop/getShops',
                {
                    latitude: location[0],
                    longitude: location[1]
                },{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(response.data)
            setShops(response.data)
        } catch (error) {
            console.log(error)
        }
        
    }
    const featuredCategories = useContext(FeatureCategoryContext);
    useEffect(() => {
        window.scrollTo(0, 0)
        getFeaturedCategories()


    }, [])

    
    return ( 
        <div className="featured__categories__container">
            <div className="featured__categories">
                <div className="featured__categories__header">
                    <h1 className='featured__header__big'>Featured Stores </h1>
                    <div className="featured__categories__header__line"></div>
                </div>
                <div className="featured__categories__card__container">
                    {/* { featuredCategories.map((category) =>  <CategoryCard key={category.id} data={category}/>)} */}
                    { shops.map((category) =>  <FeaturedCard key={category.id} data={category}/>)}
                </div>
            </div>
        </div>  
     );
}
 
export default Categories;