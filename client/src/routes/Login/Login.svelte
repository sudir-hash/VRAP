<script>
    import righttop from '../../assets/righttop.svg';
    import leftbottom from '../../assets/leftbottom.svg'
    import './Login.css'
  import Card from '../../components/Card/Card.svelte';
    
</script>



<div class="login">
    
    <div class="svg-top">
        <img  src={righttop} alt="righttop" />
    </div>
    
    <div class="svg-bottom">
        <img  src={leftbottom} alt="leftbottom" />
    </div>
    <Card>
        <section class="main-content">
            <form action="">
              <input type="email" placeholder="Email">
              <div class="line"></div>
              <input type="password" placeholder="Password">
              <button>Login</button>
            </form>
          </section>
    </Card>

</div>



