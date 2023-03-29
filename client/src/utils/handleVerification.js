import axios from 'axios';
import BASE_URL from '../constants/BASE_URL';
const handleVerification = async() => {
    try {
        const token = await axios.get(BASE_URL+'/auth/request-verify-token');
        //console.log("token", token);
        const verified  =   await axios.post(BASE_URL+'/auth/verify-token', {
            token: token.data.token
        });
        //console.log("verified", verified);
        return {
            data: verified.data,
            token: token.data.token
        };
        
    } catch (err) {
        ////console.log("err", err);
        return {
            data: err.data,
            token: null
        };
    }
}
export default handleVerification;