<template>
  <div>
    <img src="../image/map-world.png" alt="World Map" usemap="#map-world">
    <map name="map-world">
      <area shape="rect" coords="130, 105, 315, 140"
            @click="selectTown(0)" :alt=townsList[0].name />
      <area shape="rect" coords="140, 165, 315, 210"
            @click="selectTown(1)" :alt=townsList[1].name />
      <area shape="rect" coords="400, 115, 480, 150"
            @click="selectTown(2)" :alt=townsList[2].name />
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