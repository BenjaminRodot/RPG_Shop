<template>
  <div style="text-align: center; width: 20%">
    <select @change="selectPlayer($event.target.selectedIndex)">
      <option v-for="(player,index) in listPlayer" :key="index">{{player}}</option>
    </select>
  </div>
</template>

<script>

export default {
  name: "PersoSelector",
  props:{
    listPlayer:Array
  },
  methods: {
    selectPlayer(id)
    {
      this.$emit('selectPlayer',id)
    }
  }
}
</script>

<style scoped>

</style>