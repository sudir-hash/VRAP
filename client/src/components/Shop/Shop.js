import { useEffect, useState,useContext } from 'react';
import { TabTitle } from '../../utils/General';
import axios from "axios";
import ShopCategory from './Container/ShopCategory';
import './Shop.css';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/Context';

const Shop = () => {
    TabTitle("Shop - SHEMA");
    const [ menItems, setMenItems ] = useState()
    // const [ womenItems, setWomenItems ] = useState()
    // const [ kidsItems, setKidsItems ] = useState()
    const [ loading , setLoading ] = useState(true) 
    const navigate  =   useNavigate();
    const context = useContext(AuthContext);


        
    useEffect(() => {
        if(!context.user){
            navigate('/account/login')
        }

       
        axios.get("http://localhost:8003/product/view-all")
            .then(res => {
                let items=res.data.map(item=>({...item,image:item.image_url}))
                //console.log(items)
                setMenItems(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        window.scrollTo(0, 0)
    
    }, [context])

    return ( 
        <div className="shop__contianer">
            {loading && <ReactLoading type="balls" color='#FFE26E'  height={100} width={100} className='container h-100 w-10 justify-self-center align-self-center m-auto'/>}
            {menItems && <ShopCategory name="Men" key="men" items={menItems}/>}
            {/* {womenItems && <ShopCategory name="Women" key="women" items={womenItems}/>}
            {kidsItems && <ShopCategory name="Kids" key="kids" items={kidsItems}/>} */}
        </div>
     );
}
 
export default Shop;