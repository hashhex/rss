<template>
    <div class="text-center pt-10 pb-10">
        <v-pagination
        v-model="page"
        :length="Math.ceil(NEWS.length / 5)"
        @input="pageHandler"
        ></v-pagination>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        NEWS: {
            type: Array
        }
    },
    data () {
        return {
            page: 1,
        }
    },
    computed: {
        PAGE () {
            
            return !this.$route.query || !this.$route.query.page ? 1 : Number(this.$route.query.page)
        }
    },
    watch: {
        PAGE (newVal) {
            this.page = newVal
        }
    },
    mounted () {
        this.page = this.PAGE
    },
    methods: {
        pageHandler () {
            this.$router.push('?page=' + this.page)
            this.$nuxt.$emit('pagination', this.page)
        }
    }
}
</script>