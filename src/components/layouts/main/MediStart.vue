<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <div class="sidebar-wrapper">
      <ul class="sidebar-nav">
        <li class="sidebar-brand">
          <router-link :to="{path: 'dashboard'}"> Start Medilern
          </router-link>
        </li>
        <li>
          <router-link :to="{path: 'dashboard'}"> Dashboard</router-link>
        </li>
        <li v-if="userType == user.TUTOR">
          <router-link :to="{path: 'setavailable'}"> Set Availability</router-link>
        </li>
        <li v-if="userType == user.ADMIN">
          <router-link :to="{path: 'settrial'}"> Set Trial Point</router-link>
        </li>
        <li v-if="userType == user.STUDENT">
          <router-link :to="{path: 'booktrial'}"> Book Trial</router-link>
        </li>
        <li v-if="userType == user.STUDENT">
          <router-link :to="{path: 'payment'}"> Payment</router-link>
        </li>
        <li>
          <router-link :to="{path: 'conference'}"> Conference</router-link>
        </li>
        <li>
          <router-link :to="{path: 'tutoring'}"> Tutoring</router-link>
        </li>
      </ul>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div class="page-content-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
</template>

<script>

  import Vue from 'vue';
  import calendar from '../home-components/SchedulingCalendar.vue';
  import {mapGetters, mapState} from 'vuex';
  import UserTypes from '../../../utility/users.constants'

  Vue.component('calendar', calendar);

  export default {
    name: "medi-start",
    data () {
      return {
        user : UserTypes.USER_TYPES
      }
    },
    computed: {
      ...mapState({userInfo: state => state.userInfo, userType: state => state.userType})
    },
    beforeCreate() {
      this.$store.dispatch("syncUserData");
    },
    created() {


    }
  }
</script>
