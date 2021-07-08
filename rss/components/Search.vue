<template>
    <v-text-field
        v-model="search"
        label="Поиск"
        @input="SEARCH"
    ></v-text-field>
</template>

<script>
export default {
    name: 'Search',
    data () {
        return {
            search: ''
        }
    },
    methods: {
        async SEARCH () {
            await this.$store.commit('SEARCH_RSS', this.search)
            this.$router.push('/?page=1')
        }
    }
}
</script>