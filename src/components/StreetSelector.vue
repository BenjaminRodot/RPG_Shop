<template>
  <div>
    <div style="width: 50%">
      <div v-for="(street,index) in streetsList" :key="index" @change="selectStreet(index)">
        <input type="radio" :id="index" name="street" :value="street">
        <label :for="index">{{street}}</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "StreetSelector",
  props:{
    streetsList: Array,
  },
  methods:{
    selectStreet(id) {
      this.$emit('selectStreet',id)
    }
  }
}
</script>

<style scoped>

</style>