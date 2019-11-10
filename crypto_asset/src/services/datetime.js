import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default {
  install: (Vue, options) => {
    Vue.prototype.$datetime = {
      currentDateTimeMoment () { return moment() },
      dateStringToMoment (dateString) { return moment(dateString, 'YYYY-MM-DD') },
      momentToDateString (dateMoment) { return moment(dateMoment).format('YYYY-MM-DD') },
      timeStringToMoment (timeString) { return moment(timeString, 'h:mm a') },
      momentToTimeString (timeMoment) { return moment(timeMoment).format('HH:mm:ss') },
      momentToDateTimeString (dateMoment) { return moment(dateMoment).format('YYYY-MM-DD h:mm a') },
    }
  },
}
