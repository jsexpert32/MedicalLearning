import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://52.14.72.225/api/v1`
  })
}
