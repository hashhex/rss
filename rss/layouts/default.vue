<template>
  <v-app dark>
    <Header />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      fixed: false,
      title: 'Vuetify.js'
    }
  },
  components: {
    Header
  }
}
</script>
