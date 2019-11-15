<template>
  <div class="app">
    <DefaultHeader/>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div id="main-container">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <DefaultFooter/>
  </div>
</template>

<script>
import nav from '@/_nav'
import nav_cn from '@/_nav_cn'
import { Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultContainer',
  components: {
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultAside,
    SidebarForm,
    SidebarFooter,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    DefaultFooter,
    DefaultHeader,
    DefaultHeaderDropdownAccnt,
  },
  data () {
    return {
      nav: [],
      isDesktop: true
    }
  },
  mounted () {

    const self = this
    self.resizeContainer()
    
    window.addEventListener('resize' ,function() {
      self.resizeContainer()
    })

    if(this.$ml.get('lang') === 'cn') {
      this.nav = nav_cn.items
    } else {
      this.nav = nav.items
    }

    self.$auth.sessionCheck()
    setInterval(function(){ 
      self.$auth.sessionCheck()
    }, 300000);
    // 1000 = 1 second
  },
  methods: {
    resizeContainer() {
      var windowWidth = document.documentElement.clientWidth

      if (windowWidth < 768) {
        $('#main-container').removeClass('container-fluid')
      } else {
        $('#main-container').addClass('container-fluid')
      }
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>
