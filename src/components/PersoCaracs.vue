<template>
  <div>
    <p>{{currentPlayer.name}} - lvl {{currentPlayer.level}}</p>
    <img :src="srcLife" alt="100% hp">
    <p>Vitality : {{vitality}} - armor {{armor}} -  Strength {{strength}}</p>
    <label>Gold</label>
    <input readonly :value="currentPlayer.gold">
  </div>
</template>

<script>

export default {
  name: "PersoCaracs",
  props:{
    currentPlayer:Object
  },
  computed:{
    armor(){
      let result = this.currentPlayer.armor
      for(let i=0;i<5;i++){
        this.currentPlayer.slots[i].items.forEach(item => {
          if (item.effect[0] === 'a' || item.effect[0] === 'A'){
              result+=parseInt(item.effect.slice(1))
          }
        })
      }
      return result
    },
    healthPoint(){
      let result = this.currentPlayer.life
      for(let i=0;i<5;i++){
        this.currentPlayer.slots[i].items.forEach(item => {
          if (item.effect[0] === 'l'){
            result+=parseInt(item.effect.slice(1))
          }
        })
      }
      return result
    },
    vitality(){
      let result = this.currentPlayer.vitality
      for(let i=0;i<5;i++){
        this.currentPlayer.slots[i].items.forEach(item => {
          if (item.effect[0] === 'L'){
            result+=parseInt(item.effect.slice(1))
          }
        })
      }
      return result
    },
    strength(){
      let result = this.currentPlayer.strength
      for(let i=0;i<5;i++){
        this.currentPlayer.slots[i].items.forEach(item => {
          if (item.effect[0] === 's' || item.effect[0] === 'S'){
            result+=parseInt(item.effect.slice(1))
          }
        })
      }
      return result
    },
    srcLife(){
      let int = Math.round((this.currentPlayer.life/this.currentPlayer.vitality)*10)
      let images = require.context('../image')
      return images('./' + int.toString()+"_hp.png")
    },
  }
}
</script>

<style scoped>

</style>