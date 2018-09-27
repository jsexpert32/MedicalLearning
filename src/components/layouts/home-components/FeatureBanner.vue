<template>
    <div class="feature-banner">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-8 col-pull-lg-4 col-pull-md-4 ">
                    <h1 class="main-title">Award Winning Test Prep & Academic Tutoring </h1>
                    <img class="img-responsive" src="../../../asset/images/img-stu-tutor.png" alt="Studnet and Tutor">
                </div>
                <div class="col-lg-4 col-push-lg-8 col-md-4 col-push-md-8">
                    <LoginBox></LoginBox>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import LoginBox from '../../login-box/LoginBox.vue'


    export default {
        name: "feature-banner",
        components: {
            LoginBox
        },
        data() {
            return {}
        },
        beforeCreate() {

        },
        created() {

        }
    }
</script>

