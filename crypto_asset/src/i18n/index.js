import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
import { enLangData } from './enLangData'
import { cnLangData } from './cnLangData'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'en',
  languages: [

    new MLanguage('en').create(enLangData),
 
    new MLanguage('cn').create(cnLangData)
  ]
})