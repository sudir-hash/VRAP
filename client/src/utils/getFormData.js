const getFormData = (formData) => {
    //console.log(formData)
    const form = new FormData();
    for(let key in formData){
        form.append(key, formData[key]);
    }
    
    return form;
}


export default getFormData;