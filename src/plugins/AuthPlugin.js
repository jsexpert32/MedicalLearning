var authx = {

    setAuthData(authData) {
        // TODO: log using some kind of debugger
        // console.log("Setting authentication data...");
        localStorage.setItem("authData", JSON.stringify(authData));
    },

    cleanAuthData() {
        // TODO: log using some kind of debugger
        // console.log("Removing authentication data...");
        localStorage.removeItem("authData");
    },

    isUserAuthenticated() {
        if (typeof window !== 'undefined') {
            // We are in the browser
            var token = this.getAuthToken();
            if (token) {
                return true;
            }
        }
        return false;
    },

    getAuthData() {

        if (!localStorage) {
            // TODO: log using some kind of debugger
            // console.log("LocalStorage has not been initialised...");
            return null;
        }

        var authData = JSON.parse(localStorage.getItem("authData"));

        if (!authData) {
            return null;
        }

        if (!authData.token || !authData.expires || authData.token.length < 10) {
            this.cleanAuthData();// localStorage.removeItem("authData");
            return null;
        }

        if (Date.now() > parseInt(authData.expires)) {
            // TODO: log using some kind of debugger
            //console.log("User session has been expired...");
            this.cleanAuthData(); // localStorage.removeItem("authData");
            return null;
        }

        return authData;
    },

    getAuthToken() {
        var authData = this.getAuthData();

        if (!authData) {
            return null;
        }
        ;

        return authData.token;
    }
};

export const authPlugin = function (Vue) {
    // TODO: log using some kind of debugger
    //console.log("installing Auth plugin");

    if (authPlugin.installed || Vue.auth) {
        return;
    }

    authPlugin.installed = true;

    Vue.auth = authx;

    // TODO: log using some kind of debugger
    //console.log("not installed, starting installation");
    Object.defineProperties(Vue.prototype, {
        $auth: {
            get() {
                return Vue.auth;
            }
        }
    });
    // TODO: log using some kind of debugger
    //console.log("authplugin successfully installed");
};