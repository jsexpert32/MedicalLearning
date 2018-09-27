<template>
  <div>
    <splash-view></splash-view>
    <div class="forgot-password full-screen">
      <div v-if="!sendSucceed" class="row">
        <form @submit.prevent="validateEmail()" novalidate>
          <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
              <h2> Forgot your password?</h2>
              <p>To reset your password,type the full email address you used to sign up
                and we'll send you an e-mail to walk you through resetting your password.
              </p>
              <div class="form-group" :class="{'has-error': errors.has('email')}">
                <input class="form-control"
                       v-model="submitData.email"
                       name="email"
                       type="email"
                       placeholder="Email here"
                       v-validate="'required|email'"/>
                <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block" :disabled="errors.has('email')"> Next</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div v-else class="row">
        <div class="col-sm-10 col-sm-offset-1">
          <div class="text-center">
            <img src="../../asset/images/animate-checkmark-color.gif" height="200" width="200">
          </div>
          <h5 class="text-center"> An e-mail has been sent to {{verifyEmailAddress}}</h5>
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
    name: "forgot-password",
    components: {
      SplashView,
      FooterBar
    },
    beforeCreate() {

    },
    created() {
    },
    data: function () {
      return {
        submitData: {},
        sendSucceed: false
      }
    },
    computed: {
      ...mapState({verifyEmailAddress: state => state.verifyEmailAddress})
    },
    methods: {
      validateEmail: function () {
        this.$validator.validateAll().then((value) => {
          if (value) {
            this.submitEmailAddress();
          }

        }).catch(() => {
        });
      },
      submitEmailAddress: function () {
        this.$store.dispatch("submitEmailForPassword", this.submitData).then(data => {
          this.sendSucced = true;
          // this.$router.push("/verify/reset_password");
        }).catch(() => {
        });
        ;
      }
    }
  }

</script>
