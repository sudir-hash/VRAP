<script>
    export let name;
    import axios from 'axios';


    const handleSubmit= async () => {
        let email = document.querySelector('input[type="email"]').value;
        let password = document.querySelector('input[type="password"]').value;
        let data = {
            email: email,
            password: password
        }
        console.log(data);
        // const response = await axios.post('http://localhost:3000/api/auth/login', {
        //     email: "",
        //     password: ""
        // });
        // console.log(response);
    }

</script>




<form on:submit|preventDefault={handleSubmit}>
    <input type="email" placeholder="Email" value="">
    <div class="line"></div>
    <input type="password" placeholder="Password" value="">
    <button type="submit">{name}</button>
</form>