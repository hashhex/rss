import xmlTojs from 'xml-js'

function SortNewLast(data) {
    return data.sort((a, b) => {
        if (Date.parse(a.pubDate._text) > Date.parse(b.pubDate._text)) {
            return -1
        }
        return 1
    })
}

export const state = () => ({
    rss: null,
    rss_header: null,
    rss_lenten: null
})

export const mutations = {
    RSS (state, payload) {
        state.rss = SortNewLast(payload.item)
        state.rss_lenten = SortNewLast(payload.item)

        state.rss_header = {
            title: payload.title,
            link: payload.link,
            description: payload.description,
            puDate: payload.pubDate,
            image: payload.image
        }
    },
    SEARCH_RSS (state, search) {
        if (!search.length) {
            state.rss = state.rss_lenten
        }
        state.rss = state.rss_lenten.filter(item => item.title._cdata.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    },
    FILTER_DATE_RSS (state, date) {
        let rss_lenten = state.rss_lenten
        
        if (date.from.length) {
            rss_lenten = rss_lenten.filter(item => {
                if ( !this.$moment(date.from).isAfter(item.pubDate._text) ) {
                    return item
                }
            })
        }
        if (date.ere.length) {
            rss_lenten = rss_lenten.filter(item => {
                if (!this.$moment(date.ere).isBefore(item.pubDate._text)) {
                    return item
                }
            })
        }
        state.rss = rss_lenten
    }
}

export const actions = {
    async nuxtServerInit ({ dispatch }) {
        await dispatch('FetchRss')
    },
    async FetchRss ({ commit }) {
        try {
            const { status, data } = await this.$axios.get('http://static.feed.rbc.ru/rbc/logical/footer/news.rss')

            if (status !== 200) {
                return false
            }

            const data_json = JSON.parse(xmlTojs.xml2json(data, {
                compact: true, 
                spaces: 2
            }))

            commit('RSS', data_json.rss.channel)
            
        } catch (error) {
            console.error('Rss ' + error);
            return false
        }
    }
}

export const getters = {
    NEWS_ITEM: (state) => (guid) => state.rss.filter(item => item.guid._text === guid)
}