import * as properties from "../properties";
import Utils from "./../utility/otherUtilities";


class Storage {
	constructor() {
		
	}

	get(key, defaultValue) {
        var value = localStorage.getItem(key,defaultValue);
        return Utils.parseJsonString((value));
	}

	set(key, value) {
		localStorage.setItem(key,value);
	}

	remove(key) {
		localStorage.removeItem(key);
	}

    removeAll () {
        localStorage.clear()
    }

    saveToken(value) {
        this.set(properties.token,value);
    }

    getToken() {
        this.get(properties.token);
    }
	
}

const storage = new Storage();

export default storage;