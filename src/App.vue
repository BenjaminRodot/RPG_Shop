<template>
  <div>
    <World @selectTown="selectTown($event)" @selectStreet="selectStreet($event)" @selectShop="selectShop($event)"
           :currentTown="currentTown" :currentStreet="currentStreet" :currentShop="currentShop" :towns="towns"></World>
    <Team :currentShop="currentShop" :currentTown="currentTown" />
  </div>
</template>

<script>
import World from './components/World'
import Team from './components/Team'
import {towns} from "./model";

export default {
  name: 'App',
  components: {
    World,
    Team,
  },
  data: () => {
    return {
      currentTown: null, // la ville courante
      currentStreet: null, // la rue courante
      currentShop: null, // la boutique courante
      towns:towns,
    }
  },
  methods:{
    selectTown(id) {
      if(id>=0 && id<=this.towns.length){
        this.currentTown=this.towns[id];
        this.currentStreet=null;
        this.currentShop=null;
      }
      console.log(this.currentTown.name)
    },
    selectStreet(id) {
      if(id>=0 && id<=this.currentTown.streets.length){
        this.currentStreet=this.currentTown.streets[id];
      }
      console.log(this.currentStreet.name)
    },
    selectShop(id) {
      this.currentShop=this.currentStreet.shops[id%this.currentStreet.shops.length];
      console.log(this.currentShop.name)
    },
  }
}
</script>