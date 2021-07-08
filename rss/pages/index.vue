<template>
  <v-row>
    <v-col>
      <Meta :meta="{
        title:'',
        description: ''
      }" />

      <FilterItem />

      <ListNews />
      
    </v-col>
  </v-row>
</template>

<script>
import Meta from '@/components/Meta'
import FilterItem from '@/components/FilterItem'
import ListNews from '@/components/ListNews'

export default {
  name: 'IndexPage',
  components: { 
    Meta ,
    FilterItem,
    ListNews
  },
}
</script>