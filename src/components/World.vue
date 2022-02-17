<template>
  <div>
    <TownSelector :townsList="townsList" @selectTown="selectTown($event)"></TownSelector>
    <br>
    <StreetSelector :streetsList="streetsList" @selectStreet="selectStreet($event)"  v-if="currentTown!=null"></StreetSelector>
    <br>
    <ShopSelector :shopsList="shopsList" @selectShop="selectShop($event)" v-if="currentStreet!=null"></ShopSelector>
    <br>
    <Shop :current-shop="currentShop" v-if="currentShop!=null"></Shop>
  </div>
</template>

<script>
import TownSelector from "./TownSelector";
import StreetSelector from "./StreetSelector";
import ShopSelector from "./ShopSelector";
import Shop from "./Shop";

export default {
  name: "World",
  components:{
    TownSelector,
    StreetSelector,
    ShopSelector,
    Shop,
  },
  computed:{
    townsList(){
      let result=[];
      this.towns.forEach(town => result.push(town.name));
      return result;
    },
    streetsList(){
      let result=[];
      this.currentTown.streets.forEach(street => result.push(street.name));
      return result;
    },
    shopsList(){
      let result=[];
      this.currentStreet.shops.forEach(shop => result.push(shop.name));
      return result;
    },

  },
  props:{
      currentTown: Object, // la ville courante
      currentStreet: Object, // la rue courante
      currentShop: Object, // la boutique courante
      towns:Array
  },
  methods:{
    selectTown(id) {
      this.$emit('selectTown',id)
    },
    selectStreet(id) {
      this.$emit('selectStreet',id)
    },
    selectShop(id) {
      this.$emit('selectShop',id)
    },
  }
}
</script>

<style scoped>

</style>