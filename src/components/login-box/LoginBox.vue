<template>
    <div class="login-box">
        <form @submit.prevent="validate">
            <div class="form-group" :class="{'has-error': errors.has('email')}">
                <input type="text" name="email" class="form-control" placeholder="Username" id="email"
                       v-validate="'required|email'"
                       v-model="credentials.email"
                />
                <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group" :class="{'has-error': errors.has('password')}">
                <input type="password" name="password" class="form-control" placeholder="Password"
                       v-validate="'required|min:6'"
                       v-model="credentials.password"/>
                <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-success btn-lg btn-block"
                        :disabled="shouldDisableDefaultAuth || authenticated">
                    Sign In
                </button>
            </div>
            <div class="form-group or">
                <span> OR </span>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-gplus  btn-block" @click="googleAuth()"
                        :disabled="authenticated">Signin with Google
                    <sup>*</sup></button>
                <div class=" text-right"><em>
                    <small>recommended</small>
                </em></div>
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-fb btn-block" @click="facebookAuth()"
                        :disabled="authenticated"> Signin with Facebook
                </button>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <router-link :to="{ name: 'signup'}"> Create an Account</router-link>
                </div>
                <div class="col-xs-6">
                    <div class="text-right">
                        <router-link :to="{ name: 'forgotPassword'}"> Forgot password</router-link>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import Vue from "vue";
    import GoogleAuth from 'vue-google-auth'
    import swal from 'sweetalert2'
    import {mapGetters, mapState} from 'vuex';
    import {getFaceBookUserInfo} from '../../utility/faceBookUtility';
    import config from "../../config.json"
    import AuthenticationService from '../../services/AuthenticationServices'
    import USER_MUTATION_TYPES from '../../store/mutation-types/user'

    Vue.use(GoogleAuth, {client_id: config.auth.google.clientId})
    Vue.googleAuth().load()
    Vue.googleAuth().directAccess()

    export default {
        name: "login-box",
        data() {
            return {
                credentials: {
                    email: null,
                    password: null
                },
            }
        },
        beforeCreate() {

        },
        created() {

        },
        computed: {
            shouldDisableDefaultAuth() {
                return !this.credentials.email || !this.credentials.password
            },
            ...mapGetters({
                authenticated: 'authenticated'
            })
        },
        methods: {
            validate() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.login();
                    }
                }).catch(() => {
                });
            },
            login() {
                this.$store.dispatch('defaultAuth', this.credentials).then(_ => {
                    swal({
                        title: '<h2> Welcome </h2>',
                        type: 'success',
                        timer: 4000,
                        text: 'in the Medilern ',
                        showCloseButton: false,
                        showCancelButton: false,
                    }).then(
                        _ => {
                            this.$router.push({name: 'dashboard'})
                        },
                        _ => {
                            this.$router.push({name: 'dashboard'})
                        }
                    )
                }).catch(({error}) => {
                    swal(
                        'Error!',
                        error,
                        'error'
                    );
                });
            },
            facebookAuth() {
                // TODO: create facebook login
            },
//            faceBookLogIn: function () {
//                getFaceBookUserInfo().then(data => {
//                    console.log('I am from fb', data);
//                    if (data) {
//                        this.$store.dispatch("registerWithFaceBook", data).then(data => {
//                            this.$router.push({name: 'dashboard'});
//                        }).catch(() => {
//
//                        });
//                    }
//                }).catch(() => {
//
//                });
//            },
            googleAuth() {
                Vue.googleAuth().signIn(googleUser => {
                    const profile = googleUser.getBasicProfile();
                    this.$store.dispatch('googleAuth', profile)
                        .then(_ => {
                            this.$router.push({name: 'dashboard'})
                        })
                        .catch(error => {
                            // TODO: log error
                        })
                }, function (error) {
                    // things to do when sign-in fails
                    console.log(error);
                })
            }
        },
    }
</script>

