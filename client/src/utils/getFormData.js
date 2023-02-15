const getFormData = (formData) => {
    const form = new FormData();
    for(let key in formData){
        const form = new FormData();
        form.append(key, formData[key]);
    }
    return form;
}


export default getFormData;