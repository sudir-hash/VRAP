import { Fragment, useContext, useEffect, useState } from 'react';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import CartCard from './CartCard/CartCard';
import './Cart.css'
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '950px',
  width: '45%',
  minHeight: '700px',
  height: '80%',
  bgcolor: 'background.paper',
  border: '5px solid #FFE26E',
  borderRadius: '15px',
  boxShadow: 24,
  p: 2,
};

const Cart = () => {
    const navigate = useNavigate();
   

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ openCheckoutModal, setOpenCheckoutModal] = useState(false);
    const handleCheckoutOpen = () => setOpenCheckoutModal(true);
    const handleCheckoutClose = () => setOpenCheckoutModal(false);
    const cartItems = useContext(CartItemsContext);
    const handleCheckout = async () => {
            if(cartItems.totalAmount <= 0)return;
            //console.log("checkout")
            handleCheckoutOpen();
            handleClose();
            for(let item of cartItems.items){
                //console.log(item,"item")
                await axios.post(
                    `http://0.0.0.0:8003/product/buy/${item._id}`,
                    {
                      count: 10,
                    },
                    {
                      headers: {
                        "Content-type": "application/json",
                      },
                      // crossOriginIsolated: true,
                    }
                  )
                .then((res) => {
                        //console.log(res.data)
                    }
                )
                .catch((err) => {
                    console.log(err);
                });
                cartItems.removeItem(item)
            }
           
            
            handleCheckoutOpen();
        }
       
        
    

    return (
        <Fragment>
                <Badge badgeContent={cartItems.items.length} color="error">
                    <ShoppingCartIcon color="black" onClick={handleOpen} sx={{ width: '35px'}}/>
                </Badge>
                <Modal
                    open={open}
                    onClose={handleClose}
                    size="lg"
                >
                    <Box sx={style}>
                    <div className="cart__header">
                        <h2>Your Cart</h2>
                    </div>
                    <div className="cart__items__container">
                        <div className="cartItems">
                            {cartItems.items.length===0? 
                                <div className="cart__empty"> Empty cart!</div> : 
                                <div className="shop__cart__items">
                                    {cartItems.items.map((item) => <CartCard key={item._id} item={item}/>)}
                                </div>
                            }
                            {cartItems.items.length > 0 &&
                                <div className="options">
                                    <div className="total__amount">
                                        <div className="total__amount__label">Total Amount:</div>
                                        <div className="total__amount__value">₹ {cartItems.totalAmount}.00</div>
                                    </div>
                                    <div className="checkout">
                                        <Button variant="outlined" onClick={handleCheckout}>Order</Button>
                                    </div>
                                </div>
                            }
                            </div>
                    </div>
                    </Box>
                </Modal>
                <Modal
                open={openCheckoutModal}
                onClose={handleCheckoutClose}
                >
                    <Box sx={style}>
                    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                        <h2>Your checkout was successful</h2>
                    </div>
                    </Box>
                </Modal>
                <Modal
                open={openCheckoutModal}
                onClose={handleCheckoutClose}
                >
                    <Box sx={style}>
                    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                        <h2>Your checkout was successful</h2>
                    </div>
                    </Box>
                </Modal>
        </Fragment>
     );
}
 
export default Cart;