import types from '../mutation-types/user'
import Vue from 'vue'
import * as properties from '../../properties'
import storage from '../../services/Storage'

// initial state
const state = {
    details: {},
    token: null,
    authenticated: false
}

// getters
const getters = {
    authenticated: state => state.authenticated,
}

// actions
const actions = {
    auth({commit, state}, data) {
        //TODO: move everything form the index.js of store of user to this module
    },
    logOut({commit}) {
        commit(types.LOGOUT)
    },
    syncUser({commit, dispatch}) {
        const token = storage.get(properties.token)
        if (token) {
            commit(types.AUTHENTICATED, token)
            dispatch('loadProfileDetails')
        } else {
            commit(types.LOGOUT)
            commit(types.AUTHENTICATION_ERROR, {})
        }
    },
    defaultAuth({commit, dispatch}, credentials) {
        return new Promise((resolve, reject) => {
            Vue.axios
                .post(properties.signinUrl, credentials)
                .then(({data}) => {
                    commit(types.AUTHENTICATED, data)
                    dispatch('loadProfileDetails').then(data => {
                        resolve(data)
                    })
                })
                .catch((errors) => {
                    commit(types.LOGOUT)
                    commit(types.AUTHENTICATION_ERROR, errors)
                    reject(errors)
                })
        })
    },
    // google authentication with profile info passed
    googleAuth({commit, dispatch}, profile) {
        return new Promise((resolve, reject) => {
            // call authentication url
            Vue.axios
                .post(properties.googleUrl, profile)
                .then(({data}) => {
                    commit(types.AUTHENTICATED, data)
                    dispatch('loadProfileDetails').then(data => {
                        resolve(data);
                    })
                })
                .catch((errors) => {
                    commit(types.LOGOUT)
                    commit(types.AUTHENTICATION_ERROR, errors)
                    reject(errors)
                })
        })
    },
    // update profile details
    loadProfileDetails({commit}) {
        return new Promise((resolve, reject) => {
            // call account info url to get user data
            Vue.axios.get(properties.accountUrl).then(({data}) => {
                // call old setUserInfo mutation
                commit('setUserInfo', data)
                // call new mutation
                commit(types.USER_INFO, data)
                resolve(data)
            }).catch((errors) => {
                // TODO: failure handling
                reject(errors)
            })
        })
    }
}

// mutations
const mutations = {
    [types.AUTHENTICATED](state, token) {
        if (token) {
            state.token = token
            state.authenticated = true
            storage.set(properties.token, JSON.stringify(token))
        }
    },
    [types.USER_INFO](state, info) {
        state.details = info
    },
    [types.AUTHENTICATION_ERROR](state, data) {
        // TODO: do something on error
    },
    [types.LOGOUT](state) {
        state.token = null
        state.authenticated = false
        state.details = {}
        storage.removeAll()
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}