import axios from 'axios';
const handleVerification = async() => {
    try {
        const token = await axios.get('http://localhost:8003/auth/request-verify-token');
        //console.log("token", token);
        const verified  =   await axios.post('http://localhost:8003/auth/verify-token', {
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