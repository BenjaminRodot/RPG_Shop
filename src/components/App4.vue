<template>
  <div>
    <h1>I am App.vue</h1>
    <hr>
    <span>I have {{gold}}po in my pocket</span>
    <hr>
    <TD5Demo4A :items="items" @buy="buy($event)">
      <template v-slot:list-item="{item, promotion}">
        <span><strong>{{ item.name }} :</strong></span><br>
        <span>normal price: {{ item.price}}</span>
        <span> special offer: {{ promotion(item.price)}}</span>
      </template>
    </TD5Demo4A>
    <hr>
    <TD5Demo4B :boughtList="bought" @sell="sell($event)">
    </TD5Demo4B>
  </div>
</template>

<script>
import TD5Demo4A from './TD5Demo4A.vue'
import TD5Demo4B from './TD5Demo4B.vue'

export default {
  name: 'App',
  components: {
    TD5Demo4A,TD5Demo4B
  },
  data: function() {
    return {
      // items in stock
      items: [
        {name:'sword', cat:'weapon', price:100},
        {name:'helmet', cat:'weapon', price:70},
        {name:'apple', cat:'food', price:2},
        {name:'bidule', cat:'thing', price:10000},
      ],
      // items bought
      bought: [],
      gold: 10000,
    }
  },
  methods: {
    buy(event) {
      let index = event.index
      let price = event.price
      this.gold -= price
      this.bought.push(this.items[index])
      this.items.splice(index,1)
    },
    sell(item) {
      // find in bought which item is sold.
      let itIdx = this.bought.findIndex(i => i.name === item.name)
      if (itIdx !== -1) {
        this.gold += this.bought[itIdx].price
        this.items.push(this.bought[itIdx])
        this.bought.splice(itIdx,1)
      }
    }
  }
}
</script>