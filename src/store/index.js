import Vue from 'vue'
import Vuex from 'vuex'
import * as properties from '../properties'
import storage from './../services/Storage'
import Utils from "./../utility/otherUtilities";
// import scheduling from './modules/scheduling'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {},
        userType: "tutor",
        mailSentMessage: "",
        verifyEmailAddress: "",
        token: Utils.parseJsonString(storage.get(properties.token)),
        isUserLoggedIn: false
    },

    actions: {
        registerUser: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                Vue.axios
                    .post(properties.signupUrl, payload)
                    .then(response => {
                        if (response.status == 200) {
                            commit('saveEmailAddress', payload);
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            })
        },
        logInUser: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                Vue.axios
                    .post(properties.signinUrl, payload)
                    .then(response => {
                        if (response.status == 200) {
                            commit('logInSuccess', response.data);
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        // logOut({commit}) {
        //     commit('logOut')
        // },
        sendToken: ({commit}, token) => {
            return new Promise((resolve, reject) => {
                Vue.axios
                    .get(properties.confirmEmailUrl + "/" + token)
                    .then(response => {
                        if (response.status == 200) {
                            commit('logInSuccess', response.data);
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        submitEmailForPassword: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                Vue.axios
                    .post(properties.forgotPasswordUrl, payload)
                    .then(response => {
                        if (response.status == 200) {
                            commit('saveEmailAddress', payload);
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        resetPassword: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                var formData = {};
                formData.password = payload.password;
                Vue.axios
                    .post(properties.resetPasswordUrl + "/" + payload.token, formData)
                    .then(response => {
                        if (response.status == 200) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        resendEmailVerification: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                Vue.axios
                    .post(properties.resendVerificationUrl, payload)
                    .then(response => {
                        if (response.status == 200) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        registerWithFaceBook: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                Vue.axios
                    .post(properties.faceBookUrl, data)
                    .then(response => {
                        if (response.status == 200) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        registerWithGoogle: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                Vue.axios
                    .post(properties.googleUrl, data)
                    .then(response => {
                        if (response.status == 200) {
                            commit('logInSuccess', response.data);
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        getTutorList: ({commit}) => {
            return new Promise((resolve, reject) => {
                Vue.axios.get(properties.tutorListUrl).then(response => {
                    if (response.status == 200) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        getAccountProfile: ({commit}) => {
            return new Promise((resolve, reject) => {
                Vue.axios.get(properties.accountUrl).then(response => {
                    if (response.status == 200) {
                        commit('setUserInfo', response.data);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch((errors) => {
                    reject(errors);
                    // eslint-disable-next-line
                });
            });
        },
        syncUserData: ({commit}) => {
            commit('syncUserData');
        }
    },

    mutations: {
        saveEmailAddress: (state, params) => {
            state.verifyEmailAddress = params.email;
        },
        setUserInfo: (state, params) => {
            state.userInfo = params;
            state.userType = params.userType;
            storage.set(properties.userInfo, JSON.stringify(state.userInfo));
        },
        syncUserData: (state, params) => {
            if (typeof window !== 'undefined') {
                //this mean we are in the browser
                if (storage.get(properties.userInfo)) {
                    state.userInfo = storage.get(properties.userInfo);
                    state.userType = state.userInfo["userType"];
                }
            }
            else {
                console.log("error");
            }
        },
        logInSuccess: (state, token) => {
            // state.token = token
            // storage.set(properties.token, JSON.stringify(token));
            // TODO: handle failed user sync
        },
        logOut(state) {
            storage.removeAll()
            state.token = null;
            state.userInfo = {};
        }
    },

    getters: {},

    modules: {
        'user': user
    }
})

export default store