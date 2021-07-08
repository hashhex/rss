<template>
    <v-list-item v-if="item">
        <v-list-item-content>
            <v-list-item-subtitle>{{ $moment(item.pubDate._text).format('DD.MM.YYYY, h:mm') }}</v-list-item-subtitle>
            <v-list-item-title><nuxt-link :to="`/news/${item.guid._text}`">{{ item.title._cdata }}</nuxt-link></v-list-item-title>
            <v-list-item-subtitle>{{ item.description._cdata }}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    name: 'ListItem',
    props: {
        item: {
            type: Object
        }
    }
}
</script>