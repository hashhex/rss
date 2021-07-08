<template>
    <article>
        
        <v-row>
            <template v-if="NEW_ITEM">
                <Meta 
                    :meta="{
                        title: NEW_ITEM.title._cdata,
                        description: NEW_ITEM.description._cdata
                    }"
                />
                <v-col>
                    <div class="article__control">
                        <div class="date">{{ $moment(NEW_ITEM.pubDate._text).format('MM.DD.YYYY, h:mm') }}</div>
                        <div v-if="Object.keys(NEW_ITEM).includes('author')" class="autor">{{ NEW_ITEM.author._text }}</div>
                    </div>
                    
                    <div class="article__anons">
                        <p v-html="NEW_ITEM.description._cdata"></p>
                    </div>
                    <template v-if="isArray">
                        <div v-swiper:mySwiper="swiperOption" class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" :key="i" v-for="(item, i) of NEW_ITEM.enclosure">
                                    <div class="article-slide">
                                        <template v-if="item._attributes.type === 'video/mp4'">
                                            <video :src="item._attributes.url" controls="controls"></video>
                                        </template>
                                        <template v-else>
                                            <img :src="item._attributes.url" @click.prevent="zoomImage(item._attributes.url)" alt="">
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
                    </template>
                    <template v-else>
                        <v-img
                            :lazy-src="NEW_ITEM.enclosure._attributes.url"
                            max-height="229"
                            max-width="250"
                            :src="NEW_ITEM.enclosure._attributes.url"
                            @click.prevent="zoomImage(NEW_ITEM.enclosure._attributes.url)"
                        ></v-img>
                    </template>
                    
                    <div class="source">
                        <a target="_blank" :href="NEW_ITEM.link._text">Источник</a>
                    </div>
                </v-col>
            </template>
        </v-row >
        <v-dialog v-model="dialog" max-width="60%" @keydown.esc="cancel">
            <v-card>
                <v-img :src="zoom_item" alt="" contain/>
            </v-card>
        </v-dialog>
    </article>
</template>

<script>
import _ from 'lodash'
import Meta from '@/components/Meta'

export default {
    name: 'NewsItemPage',
    data () {
        return {
            NEW_ITEM: null,
            model: 0,
            dialog: false,
            zoom_item: null,
            swiperOption: {
                spaceBetween: 30,
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    600 :{
                        slidesPerView: 2,
                    },
                    1199 :{
                        slidesPerView: 3,
                    },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            }
        }
    },
    async fetch () {
        const item = this.$store.getters['NEWS_ITEM'](this.$route.params.id)
        if (Array.isArray(item) && item.length) {
            [ this.NEW_ITEM ] = item
        }
    },
    computed: {
        isArray () {
            if (!Object.keys(this.NEW_ITEM).includes('enclosure')) return false

            if (_.isArray(this.NEW_ITEM.enclosure)) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        cancel () {
            this.dialog = false
            this.zoom_item = null
        },
        zoomImage (url) {
            this.dialog = true
            this.zoom_item = url
        }
    },
    components: {
        Meta
    }
}
</script>

<style lang="scss">
article{
    padding: 40px 0;
}
.article {
    &__control{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
        .date{
            font-size: 12px;
            opacity: 0.5;
        }
        .autor{
            font-size: 12px;
            opacity: 0.5;
        }
    }
    &__anons {
        margin-bottom: 30px;
        p{
            font-size: 16px;
            line-height: 18px;
            margin-bottom: 15px;
        }
        & > * {
            margin-bottom: 0;
        }
    }
}
.article-slide{
    video,
    img{
        max-width: 100%;
        width: 100%;
        display: block;
    }
}
.source{
    margin-top: 30px;
}
</style>