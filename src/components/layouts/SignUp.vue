<template>
  <div class="signup-container">
    <div class="container">
      <div class="row">
        <h1 class="text-center"> Sign up </h1>
        <!-- sign up -->
        <div class="signup-holder">
          <div class="row">
            <hr>
            <div class="col-md-6 col-xs-12">
              <div class="well sign-up-container">
                <div>
                  <form @submit.prevent="validateRegister" novalidate>
                    <div>
                      <div class="form-group" :class="{'has-error': errors.has('email')}">
                        <label for="email">Email:</label>
                        <input id="email" type="email" name="email"
                               v-validate="'required|email'"
                               v-model="registerData.email"
                               :class="{'form-control': true, 'has-error': errors.has('registerData.email')}"
                        />
                        <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
                      </div>
                      <div class="form-group" :class="{'has-error': errors.has('password')}">
                        <label for="password">Password:</label>
                        <input id="password" type="password" name="password"
                               v-validate="'required|min:6'"
                               v-model="registerData.password"
                               :class="{'form-control': true , 'has-error': errors.has('password')}"
                        />
                        <span v-show="errors.has('password')"
                              class="help text-danger">{{ errors.first('password') }}</span>

                      </div>
                    </div>
                    <div class="form-group">
                      <button type="submit" class="btn btn-success">Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="social-btn-holder">
                <p class="lead text-center">  with social networks</p>
                <div class="form-group">
                  <button type="submit" class="btn btn-gplus btn-block" @click="googleLogIn()">Sign up with Google
                    <sup>*</sup></button>
                  <div class=" text-right"><em>
                    <small>recommended</small>
                  </em></div>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-fb btn-block" @click="faceBookLogIn()"> Sign up with Facebook
                  </button>
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
  import Vue from "vue";
  import {datepicker} from "vue-strap"
  import AuthenticationService from './../../services/AuthenticationServices'
  import swal from 'sweetalert2'
  import GoogleAuth from 'vue-google-auth'
  import {getFaceBookUserInfo} from '../../utility/faceBookUtility';
  import config from "../../config.json"

  Vue.use(GoogleAuth, {client_id: config.auth.google.clientId})
  Vue.googleAuth().load()
  Vue.googleAuth().directAccess()

  import {mapGetters, mapState} from 'vuex';


  export default {
    name: "sign-up",
    components: {
      datepicker
    },

    beforeCreate() {

    },
    created() {

    },
    computed: {
      ...mapState({mailSentMessage: state => state.mailSentMessage})
    },
    mounted() {

    },
    methods: {
      setForgotPassword: function () {
        document.querySelector('.cont').classList.toggle('s--signup');
      },
      validateRegister: function () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.registerUser();
          }
        }).catch(() => {
        });
      },
      registerUser: function () {
        this.$store.dispatch("registerUser", this.registerData).then(data => {
          swal({
            title: '<h2>Thanks</h2>',
            type: 'success',
            timer: 4000,
            text: 'Congratulation! Please verify email to login',
            showCloseButton: false,
            showCancelButton: false,
          }).then(
            function () {
              this.$router.push({name: 'emailVerification'});
            },
            // handling the promise rejection
            function (dismiss) {
              if (dismiss === 'timer') {
                self.$router.push({name: 'emailVerification'});
              }
            }
          )
        }).catch((err) => {
          swal(
            'Error!',
            err.response.data.error,
            'error'
          );
        });
      },
      faceBookLogIn: function () {
        getFaceBookUserInfo().then(data => {
          if (data) {
            this.$store.dispatch("registerWithFaceBook", data).then(data => {
              this.$router.push({name: 'setavailable'});
            }).catch(() => {

            });
          }
        }).catch(() => {

        });
      },
      googleLogIn: function () {
        Vue.googleAuth().signIn(function (googleUser) {
          let googleUserData = {};
          let profile = googleUser.getBasicProfile();
          googleUserData.id = profile.getId();
          googleUserData.name = profile.getEmail();
          googleUserData.email = profile.getName();
          this.$store.dispatch("registerWithGoogle", googleUserData).then(data => {
            this.$router.push({name: 'setavailable'});
          }).catch(() => {

          });
          // TODO: things to do when sign-in succeeds
        }, function (error) {
          // TODO: things to do when sign-in fails
        })
      }
    },
    data: function () {
      return {
        registerData: {
          name: '',
          email: this.$route.params.email || '',
          password: '',
          user_type: "student",
          profile: {
            medicalschool: '',
            graduationdate: ''
          }

        },
        signup_failed: false,

      }
    }
  }
</script>
