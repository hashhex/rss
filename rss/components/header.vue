<template>
    <v-app-bar :clipped-left="false" fixed app>
        <v-toolbar-title :text="RSS_HEADER.title._cdata" >
            <nuxt-link class="white--text text-decoration-none" to="/">{{ RSS_HEADER.title._cdata }}</nuxt-link>
        </v-toolbar-title>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Header',
    computed: {
        ...mapState({
            RSS_HEADER: state => state.rss_header
        })
    }
}
</script>