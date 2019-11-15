<template>
  <div class="animated fadeIn">
    <b-card no-body bg-variant="light">
      <b-card-header>
        <h5><li class="fa fa-lock" style="padding-right: 10px;" /><strong>{{ $ml.get('choose_verification_method') }}</strong></h5>
      </b-card-header>
      <b-card-body style="padding: 10px 20px 5px 20px;">
        <p>
          {{ $ml.get('choose_verification_method_content') }}
        </p>
      </b-card-body>
    </b-card>
    <b-row>
      <b-col sm="6" lg="4">
        <div class="brand-card">
          <div class="brand-card-header bg-cyan " style="background: #f2f8fe; border: 1px solid #d9e6fe;">
            <img src="img/authqrcode.png" width="50px;">
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-03" :data="[50, 45, 60, 90, 80, 12, 40]" />
            </div>
          </div>
          <div class="brand-card-body">
            <div style="padding: 10px;">
              <h5>{{ $ml.get('authentication_app') }}</h5>
              <p>
                {{ $ml.get('authentication_app_content') }}
              </p>
              <b-button variant="outline-light" v-if="auth2fa==0" class="bg-cyan" block @click="enable2fa()">{{ $ml.get('activate') }}</b-button>
              <b-button variant="outline-light" v-if="auth2fa==1" class="bg-cyan" block @click="$bvModal.show('verification-deactivate-qrcode-modal')">{{ $ml.get('deactivate') }}</b-button>
            </div>
          </div>
        </div>
      </b-col>
      <b-col sm="6" lg="4">
        <div class="brand-card" style="background: #f2f8fe; border: 1px solid #d9e6fe;">
          <div class="brand-card-header bg-pink" >
            <img src="img/authsms.png" width="50px;">
            <div class="chart-wrapper">
              <social-box-chart-example chartId="box-chart-01" :data="[65, 59, 84, 84, 51, 55, 40]" />
            </div>
          </div>
          <div class="brand-card-body">
            <div style="padding: 10px;">
              <h5>{{ $ml.get('otp_sms') }}</h5>
              <p>
                {{ $ml.get('otpContent') }}
              </p>
              <b-button variant="outline-light" class="bg-pink" block @click="$bvModal.show('verification-sms-modal')">{{ $ml.get('activate') }}</b-button>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal id="verification-qrcode-modal" hide-footer>
      <template v-slot:modal-title>
        <h4><li class="fa fa-qrcode" style="padding-right: 10px;" /><strong>{{ $ml.get('authentication_app') }}</strong></h4>
      </template>
      <div>
        <b-form>
          <b-row>
            <b-col cols="12" sm="6" md="6" xl class="mb-3 mb-xl-0">
              <qrcode-vue :value="googleSecret.otpauth_url" :size="size" level="H"></qrcode-vue>
            </b-col>
            <b-col cols="12" sm="6" md="6" xl class="mb-3 mb-xl-0">
              <b-form-group
                id="code2fa"
                label-for="code2fa"
              >
                <b-form-input
                  id="code2fa"
                  v-model="code2fa"
                  :placeholder="$ml.get('enter_6_digits')"
                />
              </b-form-group>
              <b-button variant="outline-light" class="bg-cyan" block @click="verify2fa()">{{ $ml.get('verify') }}</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-modal>
    <b-modal id="verification-deactivate-qrcode-modal" hide-footer>
      <template v-slot:modal-title>
        <h4><li class="fa fa-qrcode" style="padding-right: 10px;" /><strong>{{ $ml.get('authentication_app') }}</strong></h4>
      </template>
      <div>
        <b-form>
          <b-row>
            <b-col cols="12" sm="6" md="6" xl class="mb-3 mb-xl-0">
              <b-form-group
                id="code2fa"
                label-for="code2fa"
              >
                <b-form-input
                  id="code2fa"
                  v-model="code2fa"
                  :placeholder="$ml.get('enter_6_digits')"
                />
              </b-form-group>
              <b-button variant="outline-light" class="bg-cyan" block @click="deactivate2fa()">{{ $ml.get('verify') }}</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-modal>
    <b-modal id="verification-sms-modal" hide-footer>
      <template v-slot:modal-title>
        <h4><li class="fa fa-qrcode" style="padding-right: 10px;" /><strong>{{ $ml.get('otp_sms') }}</strong></h4>
      </template>
      <div>
        <b-form>
          <b-row>
            <b-col cols="12" sm="6" md="6" xl class="mb-3 mb-xl-0">
              <h4> -- Coming Soon 在即 -- </h4>
              <!-- <b-form-group
                id="code2fa"
                label-for="code2fa"
              >
                <b-form-input
                  id="code2fa"
                  v-model="code2fa"
                  :placeholder="$ml.get('enter_6_digits')"
                />
              </b-form-group>
              <b-button variant="outline-light" class="bg-cyan" block @click="deactivate2fa()">{{ $ml.get('verify') }}</b-button> -->
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import store from '@/store'
import SocialBoxChartExample from '../coreui/dashboard/SocialBoxChartExample'
import QrcodeVue from 'qrcode.vue'
import Speakeasy from 'speakeasy'
import { MLBuilder } from 'vue-multilanguage'

export default {
  name: 'profile',
  components: {
    SocialBoxChartExample,
    QrcodeVue,
  },
  data: () => {
    return { 
      phone: '',
      code2fa: '',
      googleSecret: '',
      size: 200,
      auth2fa: 0,
      authSMS: 0,
    }
  },
  mounted () {
    this.phone = store.getters.phone
    this.auth2fa = localStorage.getItem('caAuthCode')
    this.authSMS = localStorage.getItem('caAuthOtp')
  },
  computed: {
    mlotpContent () {
      return new MLBuilder('otp_sms_content').with('p', this.phone)
    }
  },
  methods: {
    enable2fa() {
      this.googleSecret = Speakeasy.generateSecret({
        issuer: 'Crypto Asset Management',
        length: 120,
        name: store.getters.username+' (Crypto Asset Management)',
      })
      this.$bvModal.show('verification-qrcode-modal')
    },
    verify2fa() {
      var tokenValidates = Speakeasy.totp.verify({
        secret: this.googleSecret.base32,
        encoding: 'base32',
        token: this.code2fa,
      })
      const self = this
      if (tokenValidates) {
        var objParams = {
          e: 'activate2FA',
          secret: this.googleSecret.base32,
        }
        this.$api.apiRequest(objParams)
          .then((response) => {
            if (response.status === 'SUCCESS') {
              this.$bvModal.hide('verification-qrcode-modal')
              localStorage.setItem('caAuthCode', 1)
              this.code2fa = ''
              this.auth2fa = 1
              self.notifice('success', this.$ml.get('success_activate_2fa'), this.$ml.get('authentication_app_activated'))
            } else {
              self.notifice('error', this.$ml.get('fail_activate_2fa'), this.$ml.get('authentication_app_fail_activate_2fa'))
            }
          })
          .catch((error) => {
            self.notifice('error', this.$ml.get('fail_activate_2fa'), this.$ml.get('authentication_app_fail_activate_2fa'))
          })
      } else {
        self.notifice('error', this.$ml.get('incorrect_digits_code'), '')
      }
    },
    deactivate2fa() {
      const self = this
      var objParams = {
        e: 'deactivate2FA',
        code2fa: this.code2fa,
      }
      this.$api.apiRequest(objParams)
        .then((response) => {
          if (response.status === 'SUCCESS') {
            this.$bvModal.hide('verification-deactivate-qrcode-modal')
            localStorage.setItem('caAuthCode', 0)
            this.code2fa = ''
            this.auth2fa = 0
            self.notifice('success', this.$ml.get('success_deactivate_2fa'), this.$ml.get('authentication_app_deactivated'))
          } else {
            self.notifice('error', this.$ml.get('fail_deactivate_2fa'), this.$ml.get('authentication_app_fail_deactivate_2fa'))
          }
        })
        .catch((error) => {
          self.notifice('error', this.$ml.get('fail_deactivate_2fa'), this.$ml.get('authentication_app_fail_deactivate_2fa'))
        })
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
  }
}
</script>

<style scoped>
.vue-tel-input {
  border: 1px solid #e4e7ea;
}
</style>
