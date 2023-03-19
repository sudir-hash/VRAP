import './Control.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import { useContext } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';

import { AuthContext } from '../../../Context/Context';
const Control = () => {
    const wishItems = useContext(WishItemsContext);
    const {user,dispatch} = useContext(AuthContext);
    return ( 
        <div className="control__bar__container">
            <div className="controls__container">
               {
                     !user ?
                     (
                        <div className="control">
                            <Link to="/account/login">
                                <PersonOutlineIcon color="black" size="large" sx={{ width: '35px'}}/>
                            </Link>
                        </div>
                     ):
                     (
                        <button className="control" onClick={()=>{
                            //console.log('logout');
                            dispatch({type:"LOGOUT"});
                            localStorage.removeItem('user');
                            localStorage.removeItem('access_token');
                        }}>
                                <LogoutOutlined color="black" size="large" sx={{ width: '35px'}}/>
                        </button>
                     )
               }
                <div className="control">
                    <Link to="/wishlist">
                        <Badge badgeContent={wishItems.items.length} color="error">
                            <FavoriteBorderIcon color="black" sx={{ width: '35px'}}/>
                        </Badge>
                    </Link>
                </div>
                <div className="control">
                    <Cart />
                </div>
                
            </div>
        </div>
     );
}
 
export default Control;