function getLocation(setLocation,toast) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocation([position.coords.latitude,position.coords.longitude]);
        },(err)=>{
            toast.error(err.message);
        });
    } else {
        toast("Geolocation is not supported by this browser.");
    }
}

export default getLocation;