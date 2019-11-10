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
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form @submit="onSubmitR">
                <h1>{{ $ml.get('register') }}</h1>
                <p class="text-muted">{{ $ml.get('create_your_account') }}</p>

                <b-form-group
                  class="mb-3"
                  label-for="Username"
                  :invalid-feedback="invalidFeedback.username"
                  :state="state.username"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="username"
                      v-model="form.username"
                      type="text"
                      required
                      :placeholder="$ml.get('username')"
                      @input="checkUsername"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="Email"
                  :invalid-feedback="invalidFeedback.email"
                  :state="state.email"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>@</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      :placeholder="$ml.get('email')"
                      @input="checkEmail"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="Phone"
                  :invalid-feedback="invalidFeedback.phone"
                  :state="state.phone"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <vue-tel-input
                      class="form-control"
                      id="phone"
                      v-model="form.phone"
                      :valid-characters-only="true"
                      :placeholder="$ml.get('phone_number')"
                      style="padding: 3px 0 3px 0;"
                      @input="checkPhone"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="password"
                  :invalid-feedback="invalidFeedback.password"
                  :state="state.password"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="password"
                      v-model="form.password"
                      type="password"
                      required
                      :placeholder="$ml.get('password')"
                      @input="checkPassword"
                    />
                  </b-input-group>
                </b-form-group>

                <b-form-group
                  class="mb-3"
                  label-for="password"
                  :invalid-feedback="invalidFeedback.repeatPassword"
                  :state="state.repeatPassword"
                >
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      id="repeatPassword"
                      v-model="form.repeatPassword"
                      type="password"
                      required
                      :placeholder="$ml.get('repeat_password')"
                      @input="checkRepeatPassword"
                    />
                  </b-input-group>
                </b-form-group>

                <b-button type="submit" block squared variant="success">{{ $ml.get('create_account') }}</b-button>
              </b-form>
            </b-card-body>
            <b-row class="px-4">
              <b-col cols="12" style="padding-bottom: 20px;">
                <b-button variant="link" class="px-0" @click="loginPage">{{ $ml.get('already_have_account') }}?</b-button>
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
  name: 'Register',
  data () {
    return {
      form: {
        username: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: ''
      },
      invalidFeedback: {
        username: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: ''
      },
      state: {
        username: true,
        email: true,
        phone: true,
        password: true,
        repeatPassword: true
      },
    }
  },
  mounted() {
    this.$ml.change(localStorage.getItem('lang'))
  },
  methods: {
    loginPage: function() {
      this.$router.push('/login');
    },
    onSubmitR (evt) {
      evt.preventDefault()
      const self = this
      if (this.state.username && this.state.email && this.state.phone && this.state.password && this.state.repeatPassword) {
        this.$auth.register(this.form)
          .then((response) => {
            if (response.code === 'SUCCESS') {
              self.notifice('success', this.$ml.get('success_register'), this.$ml.get('account_was_created_success'))
              this.$router.push('/login')
            } else {
              self.notifice('error', this.$ml.get('error_register'), this.$ml.get('something_went_wrong'))
            }
          })
          .catch((error) => {
            self.notifice('error', this.$ml.get('error_register'), this.$ml.get('something_went_wrong'))
          })
      } else {
        this.$message.error(this.$ml.get('validation_error'))
      }
    },
    notifice (type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      })
    },
    checkUsername (name) {
      if (name.length < 8) {
        this.invalidFeedback.username = this.$ml.get('invalid_username')
        this.state.username = false
      } else {
        this.invalidFeedback.username = ''
        this.state.username = true
      }

      if (this.state.username) {
        const self = this
        this.$auth.checkExistingUsername(name)
          .then((response) => {
            if (response.code === 'SUCCESS') {
              self.state.username = true
              self.invalidFeedback.username = ''
            }
          })
          .catch((error) => {
            self.state.username = false
            self.invalidFeedback.username = this.$ml.get('invalid_existing_username')
          })
      }
    },
    checkEmail (email) {
      var re = /\S+@\S+\.\S+/

      if (!email.match(re)) {
        this.invalidFeedback.email = this.$ml.get('invalid_email')
        this.state.email = false
      } else {
        this.invalidFeedback.email = ''
        this.state.email = true
      }

      if(this.state.email) {
        const self = this
        this.$auth.checkExistingEmail(email)
          .then((response) => {
            if (response.code === 'SUCCESS') {
              self.state.email = true
              self.invalidFeedback.email = ''
            }
          })
          .catch((error) => {
            self.state.email = false
            self.invalidFeedback.email = this.$ml.get('invalid_existing_email')
          })
      }  
    },
    checkPhone (formattedNumber, { number, valid, country }) {
      this.form.phone = number.international
      if (!valid) {
        if (number.international) {
          this.invalidFeedback.phone = this.$ml.get('invalid_phone')
          this.state.phone = false
        } else {
          this.invalidFeedback.phone = ''
          this.state.phone = true
        }
      } else {
        this.invalidFeedback.phone = ''
        this.state.phone = true
      }
    },
    checkPassword (password) {
      var lowerCaseLetters = /[a-z]/g
      var upperCaseLetters = /[A-Z]/g
      var numbers = /[0-9]/g

      this.invalidFeedback.password = '';

      if (password.length < 8) {
        this.invalidFeedback.password += this.$ml.get('invalid_password')
        this.state.password = false
      }
      if (!password.match(lowerCaseLetters)) {
        this.invalidFeedback.password += this.$ml.get('invalid_password_lowercase')
        this.state.password = false
      }
      if (!password.match(upperCaseLetters)) {
        this.invalidFeedback.password += this.$ml.get('invalid_password_uppercase')
        this.state.password = false
      }
      if (!password.match(numbers)) {
        this.invalidFeedback.password += this.$ml.get('invalid_password_digit')
        this.state.password = false
      } 
      if(password.length >= 8 && password.match(lowerCaseLetters) && password.match(upperCaseLetters) && password.match(numbers)){
        this.invalidFeedback.password = ''
        this.state.password = true
      }
      this.checkRepeatPassword(this.form.repeatPassword)
    },
    checkRepeatPassword (repeatPassword) {
      if (repeatPassword !== this.form.password) {
        this.invalidFeedback.repeatPassword = this.$ml.get('invalid_password_match')
        this.state.repeatPassword = false
      } else {
        this.invalidFeedback.repeatPassword = ''
        this.state.repeatPassword = true
      }
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
.vue-tel-input {
  border: 1px solid #e4e7ea;
}
.vti_dropdown {
  padding: 0px;
}
.btn-link {
  padding: 0;
  padding-bottom: 0;
}
</style>