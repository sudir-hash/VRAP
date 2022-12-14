<script>

  //Svelte Routing Imports
  import { Router, Route, Link } from "svelte-routing";



  //Local Components Imports
  import Login from './routes/Login/Login.svelte';
  import Home from './routes/home/Home.svelte';



  export let url = "";
</script>

<main>
  
  <Router url="{url}">
    <div>
      <Route path="/"><Login /></Route>
     <Route path="login"><Login /></Route>
     <Route path="home"><Home /></Route>
    </div>
  </Router>
</main>

<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
  body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
    background-color: #DBE0F9;
    font-family: "Roboto", sans-serif;
  }
</style>
