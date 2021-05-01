<template>
  <div class="container">
   <router-link to="/Registro" >Registro</router-link> |
    <router-link to="/servicios">Inicio</router-link> |
    <router-link to="/" >Home</router-link>
    <form class="form-horizontal" role="form">
      <h2>Registro</h2>
      <div class="form-group">
        <label for="firstName" class="col-sm-3 control-label">Nombre</label>
        <div class="col-sm-13">
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            class="form-control"
            autofocus
          />
        </div>
      </div>
      <div class="form-group">
        <label for="lastName" class="col-sm-3 control-label">Apellido</label>
        <div class="col-sm-13">
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            class="form-control"
            autofocus
          />
        </div>
      </div>
      <div class="form-group">
        <label for="email" class="col-sm-3 control-label">Email* </label>
        <div class="col-sm-13">
          <input
            type="email"
            id="email"
            placeholder="Email"
            class="form-control"
            name="email"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="col-sm-3 control-label">Password*</label>
        <div class="col-sm-13">
          <input
            type="password"
            id="password"
            placeholder="Password"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="col-sm-10 control-label"
          >Confirmar Contraseña*</label
        >
        <div class="col-sm-13">
          <input
            type="password"
            id="password"
            placeholder="Password"
            class="form-control"
          />
        </div>
      </div>
      <!-- /.form-group -->
      <div class="form-group">
        <div class="col-sm-13 col-sm-offset-3">
          <span class="help-block">*Campos requeridos</span>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">
        Registrarse
      </button>
    </form>
    <!-- /form -->
  </div>
  <!-- ./container -->
</template>

<script>
export default {
  name: "Registro",
};
</script>

<style scoped>
body {
  background: url("https://static-communitytable.parade.com/wp-content/uploads/2014/03/rethink-target-heart-rate-number-ftr.jpg")
    fixed;
  background-size: cover;
}
*[role="form"] {
  max-width: 430px;
  padding: 15px;
  margin: 0 auto;
  border-radius: 0.3em;
  background-color: #f2f2f2;
}
*[role="form"] h2 {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #de6262;
  margin-top: 5%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
}
.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 15px 20px 0px rgba(0, 0, 0, 0.1);
}
</style>
