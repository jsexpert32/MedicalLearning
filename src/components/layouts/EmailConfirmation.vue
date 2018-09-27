<template>
  <div>
  </div>
</template>

<script>

  import {mapGetters, mapState} from 'vuex';
  import * as properties from '../../properties'

  export default {
    name: "email-confirmation",
    beforeCreate() {

    },
    created() {
      this.email_token = this.$route.params.email_token;
      this.continueLogin();
    },
    data: function () {
      return {
        email_token: ""
      }
    },
    computed: {},
    methods: {
      continueLogin: function () {
        this.$store.dispatch("sendToken", this.email_token).then(data => {
          this.$store.dispatch("getAccountProfile").then(data => {

          }).catch(() => {
          });
          this.$router.push("/medi");
        }).catch(() => {
        });
      }
    }
  }

</script>
