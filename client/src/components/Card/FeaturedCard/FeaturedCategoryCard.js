import { Link } from 'react-router-dom';
import './CategoryCard.css'
import { Button } from '@mui/material';

const FeaturedCard = (props) => { 
    console.log(props)
    const {shopname,image_url:image,distance}=props.data;
    return ( 
        <div className="category__card__card">
                <div className="category__image"> 
                   <img src= {image[0]} alt="" className="product__img"/> 
                </div>
                <div className="category__card__detail">
                    <div className="category__name">
                        <span>{parseInt((distance)/1000)}km</span>
                    </div>
                    <div className="category__card__action">
                        <Link to={props.data.url}>
                            <Button variant='outlined' sx={[{'&:hover': { backgroundColor: 'none', borderColor: '#FFE26E', color: '#FFE26E'}, borderRadius: '20px' , borderColor: '#FFE26E', backgroundColor: "#FFE26E" , color: "#000", fontWeight: '300',fontSize:"12px"}]}>{shopname}</Button>
                        </Link>
                    </div>
            </div>
        </div>
     );
}
 
export default FeaturedCard;