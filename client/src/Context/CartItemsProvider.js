import { useEffect, useState } from "react";
import { CartItemsContext } from "./CartItemsContext";

const CartItemsProvider = (props) => {

    const [cartItems, setCartItems] = useState([])
    const [totalAmountOfItems, setTotalAmountOfItems] = useState(0)
    
    const addToCartHandler = (item, quantity) => {
        const { _id, name, price,category, image_url, sizes} = item;
        removeFromCartHandler(item)
        setCartItems((prevItems) => [...prevItems, {_id, name, price, image:image_url, category, itemQuantity: quantity, size:sizes}])
    }

    const removeFromCartHandler = (item) => {
        setCartItems(cartItems.filter((prevItem) => prevItem._id !== item._id))
    }

    const calculateTotalAmount = (currentCartItems) => {
        let total = 0
        currentCartItems.forEach((item) => {
            total = total + (item.price * item.itemQuantity)
        })

        setTotalAmountOfItems(total)
    }

    const quantityHandler = (itemId, action) => {
        if(action === 'INC'){
            setCartItems(cartItems.map((item) => {
                if(item.id  === itemId){
                    item.itemQuantity += 1
                }
                return item
            }))
        }
        else {
            setCartItems(cartItems.map((item) => {
                if(item.id  === itemId){
                    item.itemQuantity -= 1
                }
                return item
            }))
        }
    }

    useEffect(() => {
        calculateTotalAmount(cartItems)
    }, [cartItems])


    const cartItemCtx = {
        items: cartItems,
        totalAmount: totalAmountOfItems,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
        quantity: quantityHandler,
    }

    return ( 
        <CartItemsContext.Provider value={cartItemCtx}>
            {props.children}
        </CartItemsContext.Provider>
     );
}
 
export default CartItemsProvider;