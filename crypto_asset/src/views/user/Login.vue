<template>
  <div class="app flex-row align-items-center">
    <vue-particles
      color="#ffffff"
      :particleOpacity="0.7"
      linesColor="#ffffff"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="5"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="4">
          <b-card no-body class="p-0">
            <b-card-body>
              <b-form @submit="onSubmit">
                <h1>{{ $ml.get('login') }}</h1>
                <p class="text-muted">{{ $ml.get('sign_in_your_account') }}</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <b-form-input type="text" class="form-control" v-model="form.username" :placeholder="$ml.get('username')" autocomplete="username email" />
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <b-form-input type="password" class="form-control" v-model="form.password" :placeholder="$ml.get('password')" autocomplete="current-password" />
                </b-input-group>
                <b-button type="submit" variant="primary" block squared>{{ $ml.get('login') }}</b-button>
              </b-form>
            </b-card-body>
            <b-row class="px-4">
              <b-col cols="6">
                <b-button variant="link" class="px-0" @click="signUp">{{ $ml.get('sign_up') }}</b-button>
              </b-col>
              <b-col cols="6" class="text-right">
                <b-button variant="link" class="px-0">{{ $ml.get('forgot_password') }}?</b-button>
              </b-col>
            </b-row>
            <b-card-footer class="px-4">
              <b-row>
                <b-col cols="12" class="text-right">
                  <b-button variant="link" class="px-0" @click="switchLang('en')"><i class="flag-icon flag-icon-us h3" title="EN" id="af"></i></b-button>
                  <b-button variant="link" class="px-0" @click="switchLang('cn')"><i class="flag-icon flag-icon-cn h3" title="CN" id="af"></i></b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },
  mounted() {
    this.$ml.change(localStorage.getItem('lang'))
  },
  methods: {
    signUp: function() {
      this.$router.push('/register');
    },
    onSubmit (evt) {
      evt.preventDefault()
      const self = this
      this.$auth.login(this.form)
        .then((response) => {
          if (response.code === 'SUCCESS') {
            self.notifice('success', this.$ml.get('logged_in'), this.$ml.get('success_login'))
            this.$router.push('/')
          } else {
            self.notifice('error', this.$ml.get('error_login'), this.$ml.get('something_went_wrong_login'))
          }
        })
        .catch((error) => {
          self.notifice('error', this.$ml.get('error_login'), this.$ml.get('wrong_username_password'))
        })
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
    switchLang (lang) {
      this.$ml.change(lang)
      localStorage.setItem('lang', lang)
    },
  }
}
</script>

<style scoped>
.card {
    opacity:0.85;
}
.particles-js {
  background-image: url("/img/bg/bg.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.btn-link {
  padding: 0;
  padding-bottom: 0;
}
</style>
