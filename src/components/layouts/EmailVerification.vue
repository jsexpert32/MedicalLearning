<template>
  <div>
    <splash-view></splash-view>
    <div class="email-verification full-screen">
      <div>
        <h2> Email Verification</h2>
        <div class="verification-body">
          <img class="mail-icon" src="../../asset/images/email_verify.png"></img>
          <div>
            <h4>We've just sent email to your address: {{verifyEmailAddress}}</h4>
            <h5>Please check your email and click the link provided to verify your address.</h5>
          </div>
          <br/>
          <button @click="resendEmail()" type="button">Please re-send that verification email</button>
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

  export default {
    name: "email-verification",
    components: {
      SplashView,
      FooterBar
    },
    beforeCreate() {

    },
    created() {
      if (this.verifyEmailAddress == "") {
        this.$router.push({name: 'home'});
      }
    },
    computed: {
      ...mapState({verifyEmailAddress: state => state.verifyEmailAddress})
    },
    methods: {
      resendEmail: function () {
        this.$store.dispatch("resendEmailVerification", this.verifyEmailAddress);
      }
    }
  }
</script>
