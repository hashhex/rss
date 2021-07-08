<template>
    <div>
        <v-card>
            <template v-if="LIST_NEWS && LIST_NEWS.length">
                <template v-for="(ITEM_NEW, i) of LIST_NEWS">
                    <ListItem v-if="i < 5" :item="ITEM_NEW" :key="ITEM_NEW.guid._text" />
                    <v-divider v-if="i < 5"></v-divider>
                </template>
            </template>
        </v-card>

        <Pagination v-if="LIST_NEWS && LIST_NEWS.length" :NEWS="LIST" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import ListItem from '@/components/ListItem'
import Pagination from '@/components/Pagination'

export default {
    name: 'ListNews',
    data () {
        return {
            LIST_NEWS: null
        }
    },
    async fetch () {
        this.LIST_NEWS = await _.slice(this.LIST, ((this.$route.query.page || 1) * 5) - 5, (this.$route.query.page || 1) * 5)
    },
    computed: {
        ...mapState({
            LIST: state => state.rss
        }),
        START_PAGINATION () {
            if (!this.$route.query) {
                return 5
            } else {
                return (this.$route.query.page || 1) * 5
            }
        },

    },
    watch: {
        LIST (newVal) {
            this.LIST_NEWS =  this.LIST
        }
    },
    mounted () {
        this.$nuxt.$on('pagination', (page) => {
           this.LIST_NEWS =  _.slice(this.LIST, (page * 5) - 5, page * 5)
        })
    },
    methods: {
        SortNewLast(data) {
            return data.sort((a, b) => {
                    if (Date.parse(a.pubDate._text) > Date.parse(b.pubDate._text)) {
                        return -1
                    }
                    return 1
                })
        }
    },
    components: {
        ListItem,
        Pagination
    }
}
</script>