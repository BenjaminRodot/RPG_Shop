<template>
  <div>
    <div style="width: 50%">

      <!-- EXO 3.1 : nom de la boutique courante -->
      <h2>{{currentShop.name}}</h2>


      <div style="display: flex">
        <div style="width: 50%">
          <h4>In stock</h4>

          <!-- EXO 3.2 : liste d'items en stock de la boutique courante -->
          <ol v-if="currentShop!==null">
            <li v-for="(item,index) in currentShop.itemStock" :key="index">{{item.name}}  :  {{item.price}}</li>
          </ol>

        </div>
        <div style="width: 50%">
          <h4>To order</h4>

          <!-- EXO 3.3 : liste d'items sur commande de la boutique courante -->
          <ol v-if="currentShop!==null">
            <li v-for="(item,index) in currentShop.itemOrder" :key="index">{{item.name}}  :  {{item.price}}</li>
          </ol>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  props:{
    currentShop: Object,
  }
}
</script>

<style scoped>

</style>