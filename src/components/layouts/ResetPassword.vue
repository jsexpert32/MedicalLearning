<template>
  <div>
    <splash-view></splash-view>
    <div class="forgot-password full-screen">
      <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
          <form @submit.prevent="validatePassword()" novalidate>
            <h2 class="text-center"> Reset Password</h2>
            <div class="form-group" :class="{'has-error': errors.has('password')}">
              <input class="form-control"
                     v-model="password"
                     name="password"
                     type="password"
                     placeholder="password"
                     v-validate="'required|min:6'"
                     :class="{'is-danger': errors.has('password')}"
              />
              <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block" :disabled="errors.has('password')"> Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
  import SplashView from './../public/SplashView.vue';
  import FooterBar from './../public/FooterBar.vue';
  import {mapGetters, mapState} from 'vuex';
  import * as properties from '../../properties'


  export default {
    name: "reset-password",
    components: {
      SplashView,
      FooterBar
    },
    beforeCreate() {

    },
    created() {
      this.reset_token = this.$route.params.reset_token;
    },
    data: function () {
      return {
        password: "",
        reset_token: ""
      }
    },
    computed: {},
    methods: {
      validatePassword: function () {
        this.$validator.validateAll().then((value) => {
          if (value) {
            this.resetPassword();
          }

        }).catch(() => {
        });
      },
      resetPassword: function () {
        let formData = {};
        formData.password = this.password;
        formData.token = this.reset_token;
        this.$store.dispatch("resetPassword", formData).then(data => {
          this.$router.push("/medi");
        }).catch(() => {
        });
      }
    }
  }

</script>
