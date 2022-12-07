<script>
    import './Card.css';
    import Form from '../Form/Form.svelte';
  </script>

<section class="container">
    <section class="wrapper">
      <header>
        <div class="logo">
          <span>Logo</span>
        </div>
        <h1>Welcome back!</h1>
        <p>User Login</p>
      </header>
      <section class="main-content">
          <Form
            name="Login"
          />
      </section>
      <footer>
        <p><a href="/" title="Forgot Password">Forgot Password?</a></p>
        <p><a href="/" title="Register">Register</a></p>
      </footer>
    </section>
</section>

