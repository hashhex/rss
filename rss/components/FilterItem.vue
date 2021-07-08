<template>
    <v-row>
        <v-col sm="4">
            <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="dateFrom"
                        label="От"
                        readonly
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="dateFrom" @input="menu = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-col sm="4">
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="dateEre"
                    label="До"
                    readonly
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker v-model="dateEre" @input="menu2 = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-col sm="4">
            <Search />
        </v-col>
    </v-row>
</template>

<script>
import Search from '@/components/Search'

export default {
    name: 'FilterItem',
    data () {
        return {
            dateFrom: '',
            dateEre: '',
            menu: false,
            menu2: false
        }
    },
    watch: {
        dateFrom (newVal) {
            this.$store.commit('FILTER_DATE_RSS', {
                from: newVal,
                ere: this.dateEre
            })
            this.$router.push('/?page=1')
        },
        dateEre (newVal) {
            this.$store.commit('FILTER_DATE_RSS', {
                from: this.dateFrom,
                ere: newVal
            })
            this.$router.push('/?page=1')
        }
    },
    components: {
        Search
    }
}
</script>