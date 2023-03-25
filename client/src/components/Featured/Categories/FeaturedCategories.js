import axios from "axios";
import { useContext, useEffect,useState } from "react";
import { FeatureCategoryContext } from "../../../Context/FeaturedCategoryContext";
import CategoryCard from "../../Card/FeaturedCard/CategoryCard";
import FeaturedCard from "../../Card/FeaturedCard/FeaturedCategoryCard";
import getLocation from "../../../utils/getLocation";

import './FeaturedCategories.css'
import { toast, ToastContainer } from "react-toastify";




const Categories = () => {
    const [shops,setShops]=useState([]);
    // const [location,setLocation]=useState([0,0]);
    
    const getFeaturedCategories = async () => {
        try {
            // console.log(location)
            let latitude    =   parseFloat(localStorage.getItem('latitude'))
            let longitude   =   parseFloat(localStorage.getItem('longitude'))
            
            if(latitude===NaN || longitude===NaN){
                toast('unable to get location')
            }

            const response = await axios.post(
                'http://localhost:8003/shop/getShops',
                {
                    latitude: latitude,
                    longitude: longitude
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
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>  
     );
}
 
export default Categories;