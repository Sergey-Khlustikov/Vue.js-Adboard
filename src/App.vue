<template>
  <v-app>

    <!--Drawer-->
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
          v-for="link of links"
          :to="link.url"
          :key="link.title"
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="userIsLoggedIn"
          @click="onLogout"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!--Drawer-->

    <!--Toolbar-->
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Ad application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          flat
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn
          v-if="userIsLoggedIn"
          @click="onLogout"
          flat
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--Toolbar-->

    <v-content>
        <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        color="error"
        :multi-line="true"
        :timeout="7000"
        @input="closeError"
        :value="true"
      >
        {{error}}
        <v-btn
          dark text flat
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    userIsLoggedIn () {
      return this.$store.getters.userIsLoggedIn
    },
    links () {
      if (this.userIsLoggedIn) {
        return [
          {title: 'Orders', icon: 'bookmark_border', url: '/orders'},
          {title: 'New ad', icon: 'note_add', url: '/new'},
          {title: 'My ads', icon: 'list', url: '/list'}
        ]
      }
      return [
        {title: 'Login', icon: 'lock', url: '/login'},
        {title: 'Registration', icon: 'face', url: '/registration'}
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
