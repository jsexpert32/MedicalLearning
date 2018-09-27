<template>
    <ul class="nav navbar-nav main-nav">
        <router-link tag="li" exact-active-class="active" :to="{name: 'home'}">
            <a href="javascript:;"> HOME </a>
        </router-link>
        <router-link exact-active-class="active" tag="li" :to="{name: 'tutor'}">
            <a href="javascript:;"> TUTORS </a>
        </router-link>
        <router-link tag="li" exact-active-class="active" :to="{name: 'teach'}">
            <a href="javascript:;">HOW WE TEACH</a>
        </router-link>
        <router-link :to="{name: 'faq'}" exact-active-class="active" tag="li">
            <a href="javascript:;">FAQ </a>
        </router-link>
        <router-link :to="{name: 'signup'}" exact-active-class="active" tag="li">
            <a href="javascript:;">SIGN UP</a>
        </router-link>
        <router-link :to="{name: 'contact'}" exact-active-class="active" tag="li">
            <a href="javascript:;">CONTACT</a>
        </router-link>
        <li class="welcome-box" v-if="authenticated">

            <dropdown>
                // main button limited only to html styling
                <div class="avatar-holder" slot="button"><span>Hi,{{userName()}}</span>
                    <vue-letter-avatar name='user' size='40' :rounded=true></vue-letter-avatar>
                </div>
                <ul slot="dropdown-menu" class="dropdown-menu">
                    <li>
                        <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
                    </li>
                    <li role="separator" class="divider"></li>
                    <li><a href="javascript:;" @click="logOut">Logout</a></li>
                </ul>

            </dropdown>

        </li>

    </ul>
</template>

<script>
    import dropdown from 'vue-strap/src/dropdown'
    import {mapGetters, mapState} from 'vuex'
    import UserTypes from '../../utility/users.constants'

    export default {
        name: 'header-bar',
        components: {
            dropdown
        },
        computed: {
            ...mapState({user: state => state.user.details}),
            ...mapGetters({
                'authenticated': 'authenticated'
            })
        },
        beforeCreate() {
        },
        created: function () {
        },
        mounted() {
        },
        methods: {
            logOut() {
                this.$store.dispatch('logOut').then(_ => {
                    this.$router.push({path: '/'})
                })
            },
            userName() {
                switch (this.user.userType) {
                    case UserTypes.USER_TYPES.ADMIN:
                        return 'Admin'
                    default:
                        return typeof this.user.profile !== 'undefined' ? this.user.profile.name : ''
                }
            }
        }
    }
</script>
