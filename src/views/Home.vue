<template>
  <div>
   <router-link to="/Registro" >Registro</router-link> |
    <router-link to="/servicios">Inicio</router-link> |
    <router-link to="/" >Home</router-link>
    <div class="container">
      <div class="row">
        <div class="col-md-4 login-sec">
          <h2 class="text-center">Ingresar Ahora</h2>
          <form class="login-form" v-on:submit.prevent="login">
            <div class="form-group">
              <label for="exampleInputEmail1" class="text-uppercase"
                >Usuario</label
              >
              <input
                type="text"
                class="form-control"
                placeholder="usuario"
                v-model="user.email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1" class="text-uppercase"
                >Password</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="password"
                v-model="user.password"
              />
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input" />
                <small>Recordar</small>
              </label>
              <button type="submit" class="btn btn-login float-right">
                Ingresar
              </button>
            </div>
          </form>
          <div class="copy-text">
            Registrarse <i class="fa fa-heart"></i>
            <a href="Registro">Ingresa Aqui</a>
          </div>
        </div>
        <div class="col-md-8 banner-sec">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                class="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item active">
                <img
                  class="d-block img-fluid"
                  src="https://static.pexels.com/photos/33972/pexels-photo.jpg"
                  alt="First slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <div class="banner-text">
                    <h2>Wallet Arq</h2>
                    <p>
                      Aprende a manejar tu economía y mejorar tus hábitos
                      financieros
                    </p>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  class="d-block img-fluid"
                  src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg"
                  alt="First slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <div class="banner-text">
                    <h2>Wallet Arq</h2>
                    <p>
                      Aprende a manejar tu economía y mejorar tus hábitos
                      financieros
                    </p>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  class="d-block img-fluid"
                  src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg"
                  alt="First slide"
                />
                <div class="carousel-caption d-none d-md-block">
                  <div class="banner-text">
                    <h2>that is Heaven</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

// CommonJS
// const Swal = require('sweetalert2');
// var that = this;

import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "Home",
  components: {},
  created() {},
  data: function () {
    return {
      user: {
        email: "mckamilo@gmail.com",
        password: "123456",
      },
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validacionLogin(res) {
      const cache = JSON.parse(res["config"].data);
      console.log(res);
      console.log(res["config"].data);
      console.log(cache);
      console.log("cache");
      if (res.statusText == "OK") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Credenciales completas",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.email = cache["email"];
        localStorage.password = cache["password"];
        this.$router.push("/servicios");
      }
    },

    validacionError() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "<a href>Why do I have $this issue?</a>",
      });
    },

    validarErrorServidor() {
      Swal.fire({
        icon: "error",
        title: "Oops...error 500!!",
        text: "A pasado un error 500!",
        footer: "<a href>Servidor ausente o conexion?</a>",
      });
    },
    erroresGenerales() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "A pasado un error ",
        footer: "<a href>Servidor ausente o conexion?</a>",
      });
    },
    login() {
      console.log(this.user, "Usuario");

      axios
        .get("http://localhost:8001/sanctum/csrf-cookie")
        .then(() => {
          // Login...
          axios
            .post("http://localhost:8001/login", this.user)
            .then((res) => {
              this.validacionLogin(res);
            })
            .catch(function (error) {
              console.log("error");
              console.log(error.response["status"]);
              if (error.response["status"] == 500) {
                this.validarErrorServidor();
              } else {
                this.erroresGenerales();
              }
              console.log(error);
              throw error;
              // when you throw error this will also fetch error.
            });
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
          // when you throw error this will also fetch error
          if (error.response["status"] == 500) {
            this.erroresGenerales();
          } else {
            this.validarErrorServidor();
          }
          throw error;
        });
    },
  },
};
</script>

<style scoped>
@import url("//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css");
.login-block {
  background: #de6262; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #ffb88c,
    #de6262
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffb88c,
    #de6262
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  float: left;
  width: 100%;
  padding: 50px 0;
}
.banner-sec {
  background: url(https://static.pexels.com/photos/33972/pexels-photo.jpg)
    no-repeat left bottom;
  background-size: cover;
  min-height: 500px;
  border-radius: 0 10px 10px 0;
  padding: 0;
}
.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 15px 20px 0px rgba(0, 0, 0, 0.1);
}
.carousel-inner {
  border-radius: 0 10px 10px 0;
}
.carousel-caption {
  text-align: left;
  left: 5%;
}
.login-sec {
  padding: 50px 30px;
  position: relative;
}
.login-sec .copy-text {
  position: absolute;
  width: 80%;
  bottom: 20px;
  font-size: 13px;
  text-align: center;
}
.login-sec .copy-text i {
  color: #feb58a;
}
.login-sec .copy-text a {
  color: #e36262;
}
.login-sec h2 {
  margin-bottom: 30px;
  font-weight: 800;
  font-size: 30px;
  color: #de6262;
}
.login-sec h2:after {
  content: " ";
  width: 100px;
  height: 5px;
  background: #feb58a;
  display: block;
  margin-top: 20px;
  border-radius: 3px;
  margin-left: auto;
  margin-right: auto;
}
.btn-login {
  background: #de6262;
  color: #fff;
  font-weight: 600;
}
.banner-text {
  width: 70%;
  position: absolute;
  bottom: 40px;
  padding-left: 20px;
}
.banner-text h2 {
  color: #fff;
  font-weight: 600;
}
.banner-text h2:after {
  content: " ";
  width: 100px;
  height: 5px;
  background: #fff;
  display: block;
  margin-top: 20px;
  border-radius: 3px;
}
.banner-text p {
  color: #fff;
}
</style>
