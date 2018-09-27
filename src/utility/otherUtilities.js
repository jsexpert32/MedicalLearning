export default {
  isEmptyArray (val) {
    if (val == null || val === void (0) || val.length == 0) {
      return true
    } else {
      return false
    }
  },

  isEmptyObject (val) {
    if (val == null || val === void (0) || val === '' || val === {}) {
      return true
    } else {
      return false
    }
  },

  isEmpty (val) {
    if (val == null || val === void (0) || val === '') {
      return true
    } else {
      return false
    }
  },

  parseJsonString (str) {
    let val
    try {
      val = JSON.parse(str);
    } catch (e) {
      val = {}
    }
    return val
  }
}

export const Log = {
  put () {
    // console.log(arguments)
    if (process.env.NODE_ENV !== 'production') {
      console.log.apply(console, arguments)
    }
  }
}

