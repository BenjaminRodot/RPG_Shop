<template>
  <div>
    <div v-for="(shop,index) in shopsList" :key="index" @change="selectShop($event.target.value)">
      <input type="radio" :id="index" name="shop" :value="index">
      <label :for="index">{{shop}}</label>
    </div>
  </div>
</template>

<script>

export default {
  name: "ShopSelector",
  props:{
    shopsList: Array,
  },
  methods:{
    selectShop(id) {
      this.$emit('selectShop',id)
    }
  }
}
</script>

<style scoped>

</style>