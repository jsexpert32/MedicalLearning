import Api from '@/services/Api'

export default {
  contact (params) {
    return Api().post('contact', params)
  },
  getReview () {
    return Api().get('reviews')
  }
}
