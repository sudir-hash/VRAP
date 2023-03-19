import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const ItemCard = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const  cartItemsContext  = useContext(CartItemsContext)
    const wishItemsContext = useContext(WishItemsContext)

    const handleAddToWishList = () => {
        wishItemsContext.addItem(props.item)
    }

    const handleAddToCart = () => {
        //console.log(props.item)
        cartItemsContext.addItem(props.item, 1)
    }

    return ( 
        <div className="product__card__card">
            <div className="product__card">
                <div className="product__image" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                > 
                    {
                        Array.isArray(props.item.image_url)?props.item.image_url.length>0?!isHovered? <img src={props.item.image_url[0]} alt="item" className="product__img"/>: <img src={props.item.image_url[props.item.image_url.length>1?1:0]} alt="item" className="product__img"/> 
                        :<img src={props.item.image_url[0]} alt="item" className="product__img"/>:null
                    }
                </div>
                <div className="product__card__detail">
                    {/* <div className="product__name">
                        <Link to={`/item/${props.item.category}/${props.item._id}`}>
                           {props.item.name}
                        </Link>
                    </div> */}
                    <div className="product__description">
                        <span>{props.item.description}</span>
                    </div>
                    <div className="product__price">
                        <span>₹{props.item.price}</span>
                    </div>
                    <div className="product__card__action">
                        <IconButton onClick={handleAddToWishList} sx={ {borderRadius: '20px', width: '40px', height: '40px', /* borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */ }  }>
                            <FavoriteBorderIcon sx={{width: '22px', height: '22px', color: 'black'}}/>
                        </IconButton>
                        <IconButton onClick={handleAddToCart} sx={ {borderRadius: '20px', width: '40px', height: '40px' /*  borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */}}>
                            <AddShoppingCartIcon sx={{width: '22px', height: '22px', color: 'black'}}/>
                        </IconButton >
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ItemCard;

/**
  {
    "_id": "63f4aa30d64e1e395f3b4e7c",
    "name": "Dennis Lingo Men's Solid Slim Fit Cotton Casual Shirt with Spread Collar & Full Sleeves",
    "description": " Black Polo T-shirt with white collar",
    "price": 399,
    "image": [
      "https://m.media-amazon.com/images/I/61Ikn0SD7RL._UX679_.jpg"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "stock": 3
  }
 */