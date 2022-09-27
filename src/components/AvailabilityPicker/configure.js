// import configuration from '../../utils/configuration';
import * as localizers from '../../utils/localizers';


export default {

  // setAnimate(animatefn) {
  //   configuration.animate = animatefn
  // },

  setLocalizers({ date, number }) {
    date && this.setDateLocalizer(date)
    number && this.setNumberLocalizer(number)
  },

  setDateLocalizer: localizers.setDate,

  setNumberLocalizer: localizers.setNumber
}
