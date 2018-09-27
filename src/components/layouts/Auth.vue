<template>
  <div id="auth" class="full-screen">
    <div class="cont">
      <!--Sign In-->
      <div class="form sign-in">
        <h2>Welcome To Medilern</h2>
        <div class="alert alert-danger alert-dismissable login-failed" v-if="login_failed">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a> Invalid Email or Password!
        </div>
        <form @submit.prevent="validateLogin('signin')" data-vv-scope="signin">
          <div class="signin-form">
            <input type="email" name="email" placeholder="EMAIL" v-validate="'required|email'"
                   :class="{'is-danger': errors.has('signin.email')}"
                   v-model="loginData.email"/>
            <input type="password" name="password" placeholder="PASSWORD" v-validate="'required|min:6'"
                   :class="{'is-danger': errors.has('signin.password')}"
                   v-model="loginData.password"/>
          </div>
          <p class="forgot-pass">
            <router-link :to="{path: '/verify/forgot_password'}">Forgot password?</router-link>
          </p>
          <button type="submit" class="submit">Sign In</button>
        </form>
        <button @click="faceBookLogIn()" class="loginBtn loginBtn--facebook">Signin with Facebook</button>
        <button @click="googleLogIn()" class="loginBtn loginBtn--google">Signin with Google</button>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <div class="img__text m--in">
            <h2>One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
          </div>
          <div class="img__btn">
            <span class="m--up">Sign Up</span>
            <span class="m--in">Sign In</span>
          </div>
        </div>
        <!-- sign up -->
        <div class="form sign-up">
          <div>
            <h2>Welcome To Medilern</h2>
            <div class="alert alert-danger alert-dismissable signup-failed" v-if="signup_failed">
              <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a> Invalid Email or Password!
            </div>
            <form @submit.prevent="validateRegister('signup')" data-vv-scope="signup">
              <div class="signup-form">
                <div>
                  <div class="iName">Name:</div>
                  <input type="text" name="name" v-validate="'required'"
                         :class="{'is-danger': errors.has('signup.name')}"
                         v-model="registerData.name"/></div>
                <div>
                  <div class="iName">Email:</div>
                  <input type="email" name="email" v-validate="'required|email'"
                         :class="{'is-danger': errors.has('signup.email')}"
                         v-model="registerData.email"/></div>
                <div>
                  <div class="iName">Password:</div>
                  <input type="password" name="password" v-validate="'required|min:6'"
                         :class="{'is-danger': errors.has('signup.password')}" v-model="registerData.password"
                  /></div>
                <div>
                  <div class="iName">Medical School:</div>
                  <input type="text" name="medical" v-model="registerData.medicalschool"
                  /></div>
                <div>
                  <div class="iName">Graduation Date:</div>
                  <input type="text" name="graduation" v-model="registerData.graduationdate"
                  /></div>
              </div>
              <button type="submit" class="submit btn_signup">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import Vue from "vue";
  import VueResource from 'vue-resource'
  import VeeValidate from "vee-validate";
  import GoogleAuth from 'vue-google-auth'

  import {mapGetters, mapState} from 'vuex';
  import {getFaceBookUserInfo} from '../../utility/faceBookUtility';
  import config from "../../config.json"

  Vue.use(GoogleAuth, {client_id: config.auth.google.clientId})
  Vue.googleAuth().load()
  Vue.googleAuth().directAccess()

  Vue.use(VeeValidate);

  export default {
    name: 'auth',
    beforeCreate() {

    },
    created() {

    },
    computed: {
      ...mapState({mailSentMessage: state => state.mailSentMessage})
    },
    mounted() {
      var me = this;
      document.querySelector('.img__btn').addEventListener('click', function (e) {
        document.querySelector('.cont').classList.toggle('s--signup');
        me.login_failed = false;
        me.signup_failed = false;
      });
    },
    methods: {
      setForgotPassword: function () {
        document.querySelector('.cont').classList.toggle('s--signup');
      },
      validateLogin: function (scope) {
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.logInUser();
          }
        }).catch(() => {
        });
      },
      validateRegister: function (scope) {
        this.$validator.validateAll(scope).then((result) => {
          if (result) {
            this.registerUser();
          }
        }).catch(() => {
        });
      },
      registerUser: function () {
        this.$store.dispatch("registerUser", this.registerData).then(data => {
          this.$router.push("/verify/email_verification");
        }).catch(() => {
        });
      },
      logInUser: function () {
        this.$store.dispatch("logInUser", this.loginData).then(data => {
          this.$router.push("/medi");
        }).catch(() => {
          this.login_failed = true;
        });
      },
      faceBookLogIn: function () {
        getFaceBookUserInfo().then(data => {
          if (data) {
            this.$store.dispatch("registerWithFaceBook", data).then(data => {
              this.$router.push("/medi");
            }).catch(() => {

            });
          }
        }).catch(() => {

        });
      },
      googleLogIn: function () {
        var me = this;
        Vue.googleAuth().signIn(function (googleUser) {
          var googleUserData = {};
          var profile = googleUser.getBasicProfile();
          googleUserData.id = profile.getId();
          googleUserData.name = profile.getEmail();
          googleUserData.email = profile.getName();
          me.$store.dispatch("registerWithGoogle", googleUserData).then(data => {
            me.$router.push("/medi");
          }).catch(() => {

          });
          // things to do when sign-in succeeds
        }, function (error) {
          // things to do when sign-in fails
        })
      }
    },
    data: function () {
      return {
        registerData: {},
        loginData: {},
        login_failed: false,
        signup_failed: false
      }
    }
  }
</script>

<style scoped>
  #auth {
    background: #ededed;
  }

  .tip {
    font-size: 20px;
    margin: 40px auto 50px;
    text-align: center;
  }

  .cont {
    overflow: hidden;
    position: relative;
    width: 900px;
    height: 550px;
    margin: 100px auto 100px;
    background: #fff;
    box-shadow: 2px 2px 2px #eeeaea;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  }

  .form {
    position: relative;
    width: 640px;
    height: 100%;
    -webkit-transition: -webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
    padding: 50px 30px 0;
  }

  .sub-cont {
    overflow: hidden;
    position: absolute;
    left: 640px;
    top: 0;
    width: 900px;
    height: 100%;
    padding-left: 260px;
    background: #fff;
    -webkit-transition: -webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
  }

  .cont.s--signup .sub-cont {
    -webkit-transform: translate3d(-640px, 0, 0);
    transform: translate3d(-640px, 0, 0);
  }

  button {
    display: block;
    width: 300px;
    margin: 0 auto;
    height: 38px;
    border-radius: 5px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  }

  input {
    height: 40px;
    padding: 0 10px;
    color: #333;
    border: 1px solid #ddd
  }

  .img {
    overflow: hidden;
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    width: 260px;
    height: 100%;
    padding-top: 360px;
  }

  .img:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 900px;
    height: 100%;
    background-image: url("http://wisdomcnatraining.com/wp-content/uploads/2016/11/wisdomcnatrainingacademy-00043.jpg");
    background-size: cover;
    -webkit-transition: -webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
  }

  .img:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .cont.s--signup .img:before {
    -webkit-transform: translate3d(640px, 0, 0);
    transform: translate3d(640px, 0, 0);
  }

  .img__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    -webkit-transition: -webkit-transform 1.2s ease-in-out;
    transition: -webkit-transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out;
    transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
  }

  .img__text h2 {
    margin-bottom: 10px;
    font-weight: normal;
  }

  .img__text p {
    font-size: 14px;
    line-height: 1.5;
  }

  .cont.s--signup .img__text.m--up {
    -webkit-transform: translateX(520px);
    transform: translateX(520px);
  }

  .img__text.m--in {
    -webkit-transform: translateX(-520px);
    transform: translateX(-520px);
  }

  .cont.s--signup .img__text.m--in {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  .img__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: 36px;
    margin: 0 auto;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;
  }

  .img__btn:after {
    content: '';
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 30px;
  }

  .img__btn span {
    position: absolute;
    left: 0;
    top: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
    -webkit-transition: -webkit-transform 1.2s;
    transition: -webkit-transform 1.2s;
    transition: transform 1.2s;
    transition: transform 1.2s, -webkit-transform 1.2s;
  }

  .img__btn span.m--in {
    -webkit-transform: translateY(-72px);
    transform: translateY(-72px);
  }

  .cont.s--signup .img__btn span.m--in {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  .cont.s--signup .img__btn span.m--up {
    -webkit-transform: translateY(72px);
    transform: translateY(72px);
  }

  h2 {
    width: 100%;
    font-size: 26px;
    text-align: center;
  }

  .forgot-pass {
    cursor: pointer;
    text-align: center;
    font-size: 13px;
    color: #cfcfcf;
  }

  .submit {
    margin-top: 40px;
    margin-bottom: 15px;
    background: #d4af7a;
    text-transform: uppercase;
  }

  .fb-btn {
    border: 2px solid #d3dae9;
    color: #8fa1c7;
  }

  .fb-btn span {
    font-weight: bold;
    color: #455a81;
  }

  .sign-in {
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }

  .cont.s--signup .sign-in {
    -webkit-transition-timing-function: ease-in-out;
    transition-timing-function: ease-in-out;
    -webkit-transition-duration: 1.2s;
    transition-duration: 1.2s;
    -webkit-transform: translate3d(640px, 0, 0);
    transform: translate3d(640px, 0, 0);
  }

  .sign-up {
    -webkit-transform: translate3d(-900px, 0, 0);
    transform: translate3d(-900px, 0, 0);
  }

  .cont.s--signup .sign-up {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .icon-link {
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 32px;
  }

  .icon-link img {
    width: 100%;
    vertical-align: top;
  }

  .icon-link--twitter {
    left: auto;
    right: 5px;
  }

  .loginBtn {
    box-sizing: border-box;
    position: relative;
    /* width: 13em;  - apply for fixed size */
    padding: 0 15px 0 46px;
    margin-bottom: 15px;
    border: none;
    text-align: left;
    line-height: 34px;
    white-space: nowrap;
    font-size: 16px;
    color: #FFF;
  }

  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }

  .loginBtn:focus {
    outline: none;
  }

  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }

  /* Facebook */

  .loginBtn--facebook {
    background-color: #4C69BA;
    background-image: linear-gradient(#4C69BA, #3B55A0);
    /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
    text-shadow: 0 -1px 0 #354C8C;
  }

  .loginBtn--facebook:before {
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
  }

  .loginBtn--facebook:hover,
  .loginBtn--facebook:focus {
    background-color: #5B7BD5;
    background-image: linear-gradient(#5B7BD5, #4864B1);
  }

  /* Google */

  .loginBtn--google {
    /*font-family: "Roboto", Roboto, arial, sans-serif;*/
    background: #DD4B39;
  }

  .loginBtn--google:before {
    border-right: #BB3F30 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
  }

  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background: #E74B37;
  }

  .signin-form {
    margin-top: 60px;
  }

  .signup-form {
    margin-top: 40px;
  }

  .signup-form > div {
    margin-bottom: 10px;
    width: 450px;
    margin-left: auto;
    margin-right: auto;
  }

  .signup-form > div input {
    width: 300px;
  }

  .signup-form > div .iName {
    display: inline-block;
    width: 140px;
    font-size: 14px;
  }

  .signin-form input {
    display: block;
    width: 300px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn_signup {
    width: 450px !important;
  }

  .signup-social {
    width: 450px;
    margin-left: auto;
    margin-right: auto;
  }

  .signup-social > button {
    display: inline-block;
    width: 210px !important;
  }

  .signup-social .loginBtn--facebook {
    float: left;
  }

  .signup-social .loginBtn--google {
    float: right;
  }

  .login-failed {
    width: 300px;
    margin: auto;
    margin-top: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .signup-failed {
    width: 470px;
    margin: auto;
    margin-top: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>