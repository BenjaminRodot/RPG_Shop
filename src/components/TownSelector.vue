<template>
  <div>
    <div style="width: 50%">
      <div v-for="(town,index) in townsList" :key="index" @change="selectTown(index)">
        <input type="radio" :id="index" name="town" :value="town">
        <label :for="index">{{town}}</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TownSelector",
  props:{
    townsList: Array,
  },
  methods:{
    selectTown(id) {
      this.$emit('selectTown',id)
    },
  }
}
</script>

<style scoped>

</style>