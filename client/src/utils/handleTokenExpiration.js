const handleTokenExpiration = (dispatch) => {
    setTimeout(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        dispatch({ type: "LOGOUT" });
    }, 3600000);
};

export default handleTokenExpiration;