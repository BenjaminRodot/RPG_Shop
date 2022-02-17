<template>
  <div>
    <h1>I am TD5Demo5B</h1>

    <span> Here is the list of bought items</span>
    <ul>
      <li v-for="(item,index) in boughtList" :key="index">
        {{ item.name }}&nbsp;
        <button @click="sell(item)">Sell for {{item.price}}po</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TD5Demo4B',
  props: {
    boughtList: Array
  },
  methods: {
    // NB : the parameter could also be the index, but it is just
    // to change the principle compared to buy() in TD5Demo4A
    sell(item) {
      this.$emit('sell', item)
    }
  }
}
</script>