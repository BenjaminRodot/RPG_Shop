<template>
  <div>

    <div style="height:20px"></div>

    <div>
      <label>Items Index</label>
      <input v-model="idxItemBuy">
      <br>
      <img src="../image/coin.png" @click="buy(idxItemBuy)">
    </div>

    <div style="height:20px"></div>

    <div>
      <label>Items Index</label>
      <input v-model="idxItemOrder">
      <br>
      <button @click="order(idxItemOrder)">Order</button>
    </div>

    <div style="height:20px"></div>

    <div>
      <label>Sell Items Index</label>
      <input v-model="idxItemSell">
      <br>
      <label>Sell Slot Index</label>
      <input v-model="idxSlotSell">
      <br>
      <button @click="sell(idxItemSell,idxSlotSell)">Sell</button>

    </div>
  </div>
</template>

<script>

export default {
  name: "PersoOps",
  data: () => {
    return {
      idxItemBuy:1, // la valeur du champ de saisie pour acheter un item
      idxItemOrder:1, // la valeur du champ de saisie pour commander un item
      idxItemBought:1, // la valeur du champ de saisie "index item" pour assigner un item
      idxSlotAssign:1, // la valeur du champ de saisie "index slot" pour assigner un item
      idxItemSell:1, // la valeur du champ de saisie "index item" pour vendre un item
      idxSlotSell:1, // la valeur du champ de saisie "index slot" pour vendre un item
    }
  },
  methods: {
    buy(idxItemBuy) {
      console.log(this.currentShop)
      idxItemBuy-=1;
      if ((isNaN(idxItemBuy)) || (idxItemBuy <0)||(idxItemBuy >= this.currentShop.itemStock)) {
        alert("Invalid item number");
        return;
      }
      let item = this.currentShop.itemStock[idxItemBuy];
      console.log(item.name)
      let ret = this.currentPlayer.buy(item);
      if (ret !== "") {
        alert(ret);
      }
    },
    async order(idxItemOrder) {

      idxItemOrder -= 1;
      if ((isNaN(idxItemOrder)) || (idxItemOrder < 0) || (idxItemOrder >= this.currentShop.itemOrder.length)) {
        alert("invalid item index");
        return;
      }

      setTimeout(() => { this.currentShop.order(idxItemOrder)}, 1000);
    },
    sell(idxItemSell,idxSlotSell) {

      if ((isNaN(idxSlotSell)) || (idxSlotSell < 0) || (idxSlotSell >= this.currentPlayer.slots.length)) {
        alert("invalid slot index");
        return;
      }
      if (this.currentPlayer.slots[idxSlotSell].items.length === 0) {
        alert("no item to sell for the slot");
        return;
      }
      if ((isNaN(idxItemSell)) || (idxItemSell < 0) || (idxItemSell >= this.currentPlayer.slots[idxSlotSell].items.length)) {
        alert("invalid item index");
        return;
      }
      let item = this.currentPlayer.slots[idxSlotSell].items[idxItemSell];
      let amount = this.currentShop.estimate(item);
      if (amount === -1) {
        alert("cannot sell this type of item in this shop");
        return
      }
      let ans = confirm("sell "+item.name+" for "+amount+"po ?");
      if (ans) {
        this.currentShop.buy(item);
        this.currentPlayer.sell(idxSlotSell,idxItemSell,amount);
      }
    },
  },
  props:{
    currentPlayer:Object,
    currentShop:Object,
    currentTown : Object,
  }
}
</script>

<style scoped>

</style>