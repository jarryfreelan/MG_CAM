<template>
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/logo/logo6.PNG" width="90%" height="90%" alt="Crypto Asset Logo">
        <img class="navbar-brand-minimized" src="img/logo/demo.svg" width="30" height="30" alt="Crypto Asset Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">{{ $ml.get('dashboard') }}</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>{{ $ml.get('wallet') }}</b-nav-item>
        <b-nav-item class="px-3">{{ $ml.get('investment') }}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none h4">
          <AppHeaderDropdown no-caret style="padding: 0 12px 0 10px;">
            <template slot="header">
              <span v-if="$ml.get('lang') == 'en'">
                <i class="flag-icon flag-icon-us h6" title="EN" id="en" style="padding-right: 25px;"></i><span style="font-size: 15px;"> English</span>
              </span>
              <span v-if="$ml.get('lang') == 'cn'">
                <i class="flag-icon flag-icon-cn h6" title="CN" id="cn" style="padding-right: 25px;"></i><span style="font-size: 15px;"> 中文</span>
              </span>
            </template>
            <template slot="dropdown">
              <b-dropdown-item @click = "switchLang('en')"><i class="flag-icon flag-icon-us" title="EN" id="en"></i> English</b-dropdown-item>
              <b-dropdown-item @click = "switchLang('cn')"><i class="flag-icon flag-icon-cn" title="CN" id="cn"></i> 中文</b-dropdown-item>
            </template>
          </AppHeaderDropdown>
        </b-nav-item>
        <b-nav-item class="d-md-down-none h5">
          <i class="icon-bell"></i>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!-- <AsideToggler class="d-none d-lg-block" /> -->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
</template>
<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import { Header as AppHeader, SidebarToggler, AsideToggler } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultHeader',
  components: {
    AsideToggler,
    AppHeader,
    AppHeaderDropdown,
    DefaultHeaderDropdownAccnt,
    SidebarToggler
  },
  data: () => {
    return {
      lang: 'CN'
    }
  },
  mounted () {
    this.$ml.change(localStorage.getItem('lang'))
    this.changeLang()
  },
  methods: {
    switchLang (lang) {
      this.$ml.change(lang)
      localStorage.setItem('lang', lang)
      this.$router.go()
    },
    changeLang() {
      if( this.$ml.get('lang') === 'cn') {
        this.lang = '中文'
      } else {
        this.lang = 'English'
      }
    }
  }
}
</script>

<style>
.btn-light {
  background-color: #ffffff;
  border-color: #ffffff;
}
</style>
