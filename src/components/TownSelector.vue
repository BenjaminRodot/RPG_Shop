<template>
  <div>
    <img src="../image/map-world.png" alt="World Map" usemap="#map-world">
    <map name="map-world">
      <area shape="rect" coords="15, 15, 200, 200"
            href="https://www.google.fr" alt="exemple de rectangle" />
    </map>
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