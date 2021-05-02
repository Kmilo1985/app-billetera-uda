<template>
  <div class="container">
    <router-link to="/Registro">Registro</router-link> |
    <router-link to="/servicios">Inicio</router-link> |
    <router-link to="/">Home</router-link>
    <!-- /form -->
    <br />
    <br />

    <h2 class="center-center">Gestion de registro</h2>
    <form style="margin: 20px" @submit.prevent="registrar()">
      <div class="row">
        <div class="col-md-6">
          <label for="password" class="col-md-3 control-label">Nombre*</label>
          <input
            type="nombre"
            id="nombre"
            placeholder="nombre"
            class="form-control"
            v-model="user.nombre"
          />
        </div>
        <div class="col-md-6">
          <label for="password" class="col-md-3 control-label">Apellido*</label>
          <input
            type="apellido"
            id="apellido"
            placeholder="apellido"
            class="form-control"
            v-model="user.apellido"
          />
        </div>
        <div class="col-md-6">
          <label for="password" class="col-md-3 control-label"
            >Direccion*</label
          >
          <input
            type="direccion"
            id="direccion"
            placeholder="direccion"
            class="form-control"
            v-model="user.direccion"
          />
        </div>
        <div class="col-md-6">
          <label for="password" class="col-md-3 control-label">Telefono*</label>
          <input
            type="telefono"
            id="telefono"
            placeholder="telefono"
            class="form-control"
            v-model="user.telefono"
          />
        </div>
        <div class="col-md-6">
          <label for="password" class="col-md-3 control-label">Celular*</label>
          <input
            type="celular"
            id="celular"
            placeholder="celular"
            class="form-control"
            v-model="user.celular"
          />
        </div>
        <div class="col-md-6">
          <label for="password" class="col-md-6 control-label"
            >Número Cuenta*</label
          >
          <input
            type="cuenta"
            id="cuenta"
            placeholder="Número de cuenta"
            class="form-control"
            v-model="user.cuenta"
          />
        </div>
      </div>
      <br />
      <button type="submit" class="btn btn-primary btn-block">
        Registrarse
      </button>
    </form>
  </div>
  <!-- ./container -->
</template>

<script>
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "Registro",
  data: function () {
    return {
      user: {
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        celular: "",
        cuenta: "",
      },
    };
  },
  methods: {
    registrar() {
      console.log(this.user, "Usuario");

      // Login...
      axios
        .post("http://localhost:3000/usuarios", this.user)
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro completas",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
          this.$router.push("/servicios");
        })
        .catch(function (error) {
          console.log("error");
          console.log(error.response["status"]);
          if (error.response["status"] == 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "A pasado un error ",
              footer: "<a href>Servidor ausente o conexion?</a>",
            });
          }
          throw error;
          // when you throw error this will also fetch error.
        });
    },
  },
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
}
*[role="form"] h2 {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 40px;
  font-weight: 600;
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
