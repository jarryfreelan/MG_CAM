<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="icon-user h4" style="padding-right: 5px;" />
    </template>
    <template slot="dropdown">
      <!-- <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" /> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" /> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item> -->
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>{{ $ml.get('username') }}</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user h5" /> {{ username }}</b-dropdown-item>
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>{{ $ml.get('account') }}</strong>
      </b-dropdown-header>
      <b-dropdown-item to="/user/profile"><i class="fa fa-id-card" /> {{ $ml.get('profile') }}</b-dropdown-item>
      <b-dropdown-item to="/user/verification"><i class="fa fa-lock" /> {{ $ml.get('change_verify') }}</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="logout"><i class="fa fa-sign-out" /> {{ $ml.get('logout') }}</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import store from '@/store'

import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      itemsCount: 42,
      username: '', 
    }
  },
  mounted () {
    this.username = store.getters.username
  },
  methods: {
    logout() {
      var self = this
      this.$auth.logout()
      self.notifice('success', this.$ml.get('logged_out'), this.$ml.get('success_logout'))
      this.$router.push('/login')
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
