function getLocation(setLocation=()=>{},toast) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocation([position.coords.latitude,position.coords.longitude]);
            localStorage.setItem("latitude",position.coords.latitude);
            localStorage.setItem("longitude",position.coords.longitude);
        },(err)=>{
            toast.error(err.message);
        });
    } else {
        toast("Geolocation is not supported by this browser.");
    }
}

export default getLocation;