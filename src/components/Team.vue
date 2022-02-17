<template>
  <div>
    <PersoSelector :listPlayer="listPlayer" @selectPlayer="selectPlayer($event)"></PersoSelector>
    <Perso :currentPlayer="currentPlayer" :currentTown="currentTown" :currentShop="currentShop"></Perso>
  </div>
</template>

<script>
import PersoSelector from './PersoSelector'
import Perso from './Perso'
import {players} from "../model";

export default {
  name: "Team",
  components: {
    PersoSelector,
    Perso
  },
  props:{
    currentShop : Object,
    currentTown : Object,
  },
  computed:{
    listPlayer(){
      let result=[];
      this.players.forEach(street => result.push(street.name));
      return result
    }
  },
  data: () => {
    return {
      players:players,
      currentPlayer:players[0],
    }
  },
  methods:{
    selectPlayer(id)
    {
      if (id >= 0 && id <= this.players.length)
        this.currentPlayer = players[id];
    }
  }
}
</script>

<style scoped>

</style>
