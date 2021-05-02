<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Registro" class="nav-link"
                >Registro</router-link
              >
              |
            </li>
            <li class="nav-item">
              <router-link to="/servicios" class="nav-link"
                >Gestion</router-link
              >
            </li>
          </ul>
          <span class="navbar-text"> Navbar text with an inline element </span>
        </div>
      </div>
    </nav>
    <br />
    <br />

    <div class="container">
      <h2 class="center-center">Gestion de cuenta</h2>
      <form style="margin: 20px" @submit.prevent="registrarCuenta()">
        <div class="row">
          <div class="col-md-6">
            <label for="fechaCierre" class="col-md-6 control-label"
              >Fecha de Activacion*</label
            >
            <v-date-picker v-model="cuenta.fechaActivacion">
              <template v-slot="{ inputValue, inputEvents }">
                <input
                  class="form-control px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                  :value="inputValue"
                  v-on="inputEvents"
                  is-expanded
                />
              </template>
            </v-date-picker>
          </div>
          <div class="col-md-6">
            <label for="fechaCierre" class="col-md-3 control-label"
              >fehaCierre*</label
            >
            <v-date-picker v-model="cuenta.fechaCierre">
              <template v-slot="{ inputValue, inputEvents }">
                <input
                  class="form-control px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                  :value="inputValue"
                  v-on="inputEvents"
                  is-expanded
                />
              </template>
            </v-date-picker>
          </div>
          <div class="col-md-6">
            <label for="password" class="col-md-3 control-label"
              >saldoCuenta*</label
            >
            <input
              type="number"
              id="saldoCuenta"
              placeholder="saldoCuenta"
              class="form-control"
              v-model="cuenta.saldoCuenta"
            />
          </div>
          <div class="col-md-6">
            <label for="validationCustom04" class="form-label"
              >Transacción</label
            >
            <select
              class="form-select"
              id="validationCustom04"
              v-model="cuenta.tipoTransaccion"
              required
            >
              <option selected disabled value="">Tipo de transaccion...</option>
              <option value="Enviar">Enviar</option>
              <option value="Abonar">Abonar</option>
            </select>
            <div class="invalid-feedback">Please select a valid state.</div>
          </div>
        </div>
        <br />
        <button type="submit" class="btn btn-primary btn-block">
          Ejecutar transaccion
        </button>
      </form>
      <div class="col-md-12">
        <br />
        <br />
        <table class="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Saldo en la cuenta</th>
              <th scope="col">Tiene abono</th>
              <th scope="col">Destinatario</th>
              <th scope="col">Crear Abono</th>
              <th scope="col">Agregar Destinatario</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data2, key, index) in allCuentas" :key="index">
              <th scope="row">{{ data2.id }}</th>
              <td>{{ data2.fechaCierre }}</td>
              <td>{{ data2.fechaActivacion }}</td>
              <td>{{ data2.saldoCuenta }}</td>
              <td scope="row">
                <button
                  @click="abrirModal()"
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalCuenta"
                >
                  <i class="bi bi-arrow-right-square">Gestionar</i>
                </button>
              </td>
              <td scope="row">
                <button
                  @click="abrirModal()"
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="bi bi-arrow-right-square">Gestionar</i>
                </button>
              </td>
              <td scope="row">
                <button
                  @click="consultar(data2)"
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalActualizar"
                >
                  <i class="bi bi-arrow-right-square">Actualizar</i>
                </button>
                <button
                  @click="eliminar(data2.id)"
                  type="button"
                  class="btn btn-danger"
                >
                  <i class="bi bi-arrow-right-square">Eliminar</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!--*********************SECCION DE MODALES*******************-->
        <!-- Modal 1 -->
        <div
          v-if="modal"
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-dismiss="modal"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Gestion del Abono
                </h5>

                <button
                  id="Close"
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="registrarEnvio()">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label"
                      >Monto:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                      v-model="abonar.cantidad"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label"
                      >Destinatario:</label
                    >
                    <textarea
                      class="form-control"
                      id="message-text"
                      v-model="abonar.formaDeAbono"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  @click="registrarEnvio()"
                  class="btn btn-primary"
                >
                  Procesar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal 2-->
        <div
          class="modal fade"
          id="modalCuenta"
          tabindex="-1"
          aria-labelledby="modalCuenta"
          aria-hidden="true"
          data-dismiss="modalCuenta"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Gestion del destinatario
                </h5>
                <button
                  id="Close"
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="CrearAbono()">
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label"
                      >Cantidad:</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                      v-model="enviarSaldo.monto"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label"
                      >Formato de abono:</label
                    >
                    <textarea
                      class="form-control"
                      id="message-text"
                      v-model="enviarSaldo.destinatario"
                    ></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  @click="CrearAbono()"
                  class="btn btn-primary"
                >
                  Procesar
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal 2-->
        <!-- Modal 3 actualizar-->

        <div
          class="modal fade"
          id="modalActualizar"
          tabindex="-1"
          aria-labelledby="modalCuenta"
          aria-hidden="true"
          data-dismiss="modalCuenta"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Actualizar información
                </h5>
                <button
                  id="Close"
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form style="margin: 20px" @submit.prevent="registrarCuenta()">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="fechaCierre" class="col-md-6 control-label"
                        >Fecha de Activacion*</label
                      >
                      <v-date-picker v-model="cuenta.fechaActivacion">
                        <template v-slot="{ inputValue, inputEvents }">
                          <input
                            class="form-control px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                            :value="inputValue"
                            v-on="inputEvents"
                            is-expanded
                          />
                        </template>
                      </v-date-picker>
                    </div>
                    <div class="col-md-6">
                      <label for="fechaCierre" class="col-md-3 control-label"
                        >fehaCierre*</label
                      >
                      <v-date-picker v-model="cuenta.fechaCierre">
                        <template v-slot="{ inputValue, inputEvents }">
                          <input
                            class="form-control px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                            :value="inputValue"
                            v-on="inputEvents"
                            is-expanded
                          />
                        </template>
                      </v-date-picker>
                    </div>
                    <div class="col-md-6">
                      <label for="password" class="col-md-3 control-label"
                        >saldoCuenta*</label
                      >
                      <input
                        type="number"
                        id="saldoCuenta"
                        placeholder="saldoCuenta"
                        class="form-control"
                        v-model="cuenta.saldoCuenta"
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="validationCustom04" class="form-label"
                        >Transacción</label
                      >
                      <select
                        class="form-select"
                        id="validationCustom04"
                        v-model="cuenta.tipoTransaccion"
                        required
                      >
                        <option selected disabled value="">
                          Tipo de transaccion...
                        </option>
                        <option value="Enviar">Enviar</option>
                        <option value="Abonar">Abonar</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid state.
                      </div>
                    </div>
                  </div>
                  <br />
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  @click="actualizar()"
                  class="btn btn-primary"
                >
                  Actulizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import $ from "jquery";

import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "servicios",
  data: function () {
    return {
      cuenta: {
        idUsuario: 0,
        fechaActivacion: "",
        fechaCierre: "",
        saldoCuenta: 0,
        tipoTransaccion: "",
      },
      modal: true,
      abonar: {
        cantidad: "",
        formaDeAbono: "",
      },
      enviarSaldo: {
        monto: "",
        destinatario: "",
      },
      allCuentas: [],
    };
  },
  created() {
    this.obtenerCuentas();
  },
  methods: {
    registrarCuenta() {
      console.log(this.cuenta, "cuentas");

      // Login...
      axios
        .post("http://localhost:3000/cuentas", this.cuenta)
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro completo",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
          this.modal = false;
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
    obtenerCuentas() {
      axios
        .get("http://localhost:3000/cuentas")
        .then((res) => {
          console.log((this.allCuentas = res.data), "todas las cuentas");
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
    CrearAbono() {
      console.log(this.abonar);
      axios
        .post("http://localhost:3000/abonar", this.abonar)
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro completo",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
          // $("#modalCuenta .close").click();
          // $("body").removeClass("modal-open");
          // $("#modalCuenta").removeClass("in");
          // $('#modalCuenta' + ' .close').click();
          $("#modalCuenta").on("click", function () {
            $(".modalCuenta").removeClass("show");
            $("#modalCuenta").attr("data-dismiss", "modal");
          });

          $(".modal-backdrop").remove();

          this.modal = false;
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
      this.obtenerCuentas();
    },
    registrarEnvio() {
      console.log(this.enviarSaldo);
      axios
        .post("http://localhost:3000/enviar", this.enviarSaldo)
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro completo",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
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
    consultar(valor) {
      // const convertir2 = new Date();
      const convertir2 =  Date.parse(valor.fechaCierre);
      this.cuenta.fechaActivacion = convertir2;
      const convertir =Date.parse(valor.fechaCierre);
      this.cuenta.fechaCierre = convertir;
      this.cuenta.saldoCuenta = valor.saldoCuenta;
      this.cuenta.id = valor.id;
      this.cuenta.tipoTransaccion = valor.tipoTransaccion;

    },

    actualizar() {
      axios
        .put("http://localhost:3000/cuentas/" + this.cuenta.id, this.cuenta)
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro completo",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
          this.obtenerCuentas();
          // $("#modalCuenta .close").click();
          // $("body").removeClass("modal-open");
          // $("#modalCuenta").removeClass("in");
          // $('#modalCuenta' + ' .close').click();
          // $("#modalCuenta").on("click", function () {
            // $(".modalCuenta").removeClass("show");
            // $("#modalCuenta").attr("data-dismiss", "modal");
          // });

          // $(".modal-backdrop").remove();

          // this.modal = false;
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

     eliminar(id) {
      axios
        .delete("http://localhost:3000/cuentas/" + id)
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro Eliminado",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
          this.obtenerCuentas();
          // $("#modalCuenta .close").click();
          // $("body").removeClass("modal-open");
          // $("#modalCuenta").removeClass("in");
          // $('#modalCuenta' + ' .close').click();
          // $("#modalCuenta").on("click", function () {
            // $(".modalCuenta").removeClass("show");
            // $("#modalCuenta").attr("data-dismiss", "modal");
          // });

          // $(".modal-backdrop").remove();

          // this.modal = false;
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


    cerrarModal() {
      // document.getElementById("close").click();

      $(this.$refs.exampleModal).modal("hide");
      this.$emit("save");
    },
    abrirModal() {
      this.modal = true;
    },
  },
};
</script>

<style scoped>
.social-part .fa {
  padding-right: 20px;
}
ul li a {
  margin-right: 20px;
}
</style>
