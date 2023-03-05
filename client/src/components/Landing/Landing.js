import './Landing.css'
import land from '../../asset/brand/men2.png'
import { Link } from "react-router-dom"
import { Button } from "@mui/material";

const Landing = () => {
    const handleClick=()=>{
        console.log('clicked')
        let access_token    =   localStorage.getItem('access_token');
        console.log(access_token)
        let user    =   localStorage.getItem('user');
        console.log(user);
    }
    return ( 
        <div className="landing__container">
            <div className="landing__header__container">
                <div className="landing__header">
                    <h3 className="landing__header__discount">UP TO 15% DISCOUNT</h3>
                    <h1 className="landing__header__main">Checkout The Best Fashion Style</h1>
                    <h3 className="landing__header__discount">WELCOME TO VRAP</h3>
                    <Link to="/shop">
                        <Button variant='outlined' sx={[ {width: '190px', height: '50px', borderRadius: '20px' , fontWeight: '700', backgroundColor: 'none', borderColor: 'black', color: 'black' }, {'&:hover': {  backgroundColor: "black" , color: "#FFE26E", borderColor: 'black'}}]}
                            onClick={handleClick}
                        >SHOP NOW</Button>
                    </Link>
                </div>
            </div>
            <div className="landing__image__container">
                <img className="landing__image" src={land} alt=""/>
            </div>
        </div>
     );
}
 
export default Landing;