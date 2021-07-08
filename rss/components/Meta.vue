<template>
    <span v-if="!false"></span>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'MetaData',
    props: {
        meta: {
            type: Object
        }
    },
    head () {
        return {
            title: !this.meta.title || !this.meta.title.length ? this.RSS_HEADER.title._cdata : this.meta.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: !this.meta.description || !this.meta.description.length ? this.RSS_HEADER.description._text : this.meta.description
                }
            ]   
        }
    },
    computed: {
        ...mapState({
            RSS_HEADER: state => state.rss_header
        })
    }
}
</script>