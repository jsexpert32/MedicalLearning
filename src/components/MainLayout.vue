<template>
    <div id="main">
        <splash-view></splash-view>
        <!--<headerbar></headerbar>-->
        <router-view></router-view>
        <footer-bar></footer-bar>
    </div>
    <!-- end of container -->
</template>
<script>
    import FooterBar from './public/FooterBar.vue';
    import SplashView from './public/SplashView.vue';

    export default {
        name: "mainlayout",
        components: {
            FooterBar,
            SplashView
        },
        beforeCreate() {
            this.$store.dispatch("syncUserData");
            this.$store.dispatch('syncUser')
        },
        created() {

        }
    }
</script>

