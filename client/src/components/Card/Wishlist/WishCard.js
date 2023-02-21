import { useContext } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import './WishCard.css'
import { Button } from '@mui/material';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const WishCard = (props) => {

    const wishItems = useContext(WishItemsContext)

    const handelRemoveItem = () => {
        wishItems.removeItem({
            _id: props.item._id,
            name: props.item.name,
            price: props.item.price,
            image_url: props.item.image,
            category: props.item.category,
            sizes: props.item.size,
        })
    }

    const handelAddToCart = () => {
        wishItems.addToCart({
            _id: props.item._id,
            name: props.item.name,
            price: props.item.price,
            image_url: props.item.image,
            category: props.item.category,
            sizes: props.item.size,
        })
    };

    return ( 
        <div className="wishcard">
             <div className="wish__remove__item__icon">
                <IconButton>
                    <HighlightOffIcon onClick={handelRemoveItem}/>
                </IconButton>
            </div>
            <div className="wish__item__image">
                <img src={props.item.image[0]} alt="item" className="wish__image"/>
            </div>
            <div className="wish__item__name">{props.item.name}</div>
            <div className="wish__item__price">${props.item.price}</div>
            <div className="add__to__cart">
                <Button variant='outlined' onClick={handelAddToCart} sx={[{'&:hover': { backgroundColor: '#FFE26E', borderColor: '#FFE26E', color: 'black'}, borderColor: 'black', backgroundColor: "black" , color: "#FFE26E"}]}>Add to cart</Button>
            </div>
        </div>
     );
}
 
export default WishCard;