<template>
  <div>
    <h1>Test</h1>
    <div style="display: flex">
      <div style="text-align: center; width: 20%">
        <select @change="selectPlayer($event.target.selectedIndex)">
          <option v-for="(player,index) in players" :key="index">{{player.name}}</option>
        </select>
      </div>
      <div style="text-align: center; width: 80%">

        <h1>{{currentTown.name}}</h1>

      </div>
    </div>

    <div style="display: flex">
      <div style="width: 50%">

        <!-- EXO 2.1 : liste à puce des rues pour sélectionner la rue courante -->
        <div v-for="(street,index) in currentTown.streets" :key="index" @change="selectStreet(index)">
          <input type="radio" :id="index" name="street" :value="street.name">
          <label :for="index">{{street.name}}</label>
        </div>

      </div>
      <div v-if="currentStreet !==null" style="width: 50%">

        <!-- EXO 2.2 : liste à puce des boutiques pour sélectionner la boutique courante  -->
        <div v-for="(shop,index) in currentStreet.shops" :key="index" @change="selectShop($event.target.id)">
          <input type="radio" :id="shop.id" name="shop" :value="shop.name">
          <label :for="shop.id">{{shop.name}}</label>
        </div>

      </div>
    </div>

    <div style="display: flex">

      <div v-if="currentPlayer !== null" style="width: 50%">

        <!-- EXO 1.3 : affiche nom du perso courant - niveau - points de vie  -->
        <p>{{currentPlayer.name}} - lvl {{currentPlayer.level}} -  {{currentPlayer.life}} hp</p>

        <table border="1">
          <!-- EXO 4.1 : affiche les slots avec les items qu'ils contiennent -->
          <tr v-for="(slot,index) in currentPlayer.slots" v-bind:key="index">
            <td>{{slot.name}}</td>
            <td v-for="(item,index) in slot.items" v-bind:key="index">
              {{index}} - {{item.name}}
            </td>
          </tr>

        </table>

        <div style="height:20px"></div>

        <div>

          <!-- EXO 4.2 : affiche un label+champ de saisie avec l'or du perso courant -->
          <label>Gold</label>
          <input readonly :value="currentPlayer.gold">

        </div>

        <div style="height:20px"></div>

        <div>

          <!-- EXO 4.3 : affiche label+champ de saisie avec la liste des items achetés -->
          <label>Bought Items</label>
          <input readonly :value="boughtItems">
        </div>

        <div>

          <!-- EXO 4.5 : affiche 2 x [label+champ de saisies] + bouton pour pouvoir assigner les items achetés -->

          <label>Bought Items Index</label>
          <input v-model="idxItemBought">
          <br>
          <label>Slot Items Index</label>
          <input v-model="idxSlotAssign">
          <br>
          <button @click="assign(idxItemBought,idxSlotAssign)">Assign</button>

        </div>

        <div style="height:20px"></div>

        <div>

          <!-- EXO 4.7 : affiche label+champ de saisie + bouton pour pouvoir acheter un item de la boutique -->
          <label>Items Index</label>
          <input v-model="idxItemBuy">
          <br>
          <button @click="buy(idxItemBuy)">Buy</button>
        </div>

        <div style="height:20px"></div>

        <div>

          <!-- EXO 4.9 : affiche label+champ de saisie + bouton pour pouvoir commander un item de la boutique -->

          <label>Items Index</label>
          <input v-model="idxItemOrder">
          <br>
          <button @click="order(idxItemOrder)">Order</button>
        </div>

        <div style="height:20px"></div>

        <div>

          <!-- EXO 4.11 : affiche 2 x [label+champ de saisies] + bouton pour pouvoir vendre un item assigné à un slot -->

          <label>Sell Items Index</label>
          <input v-model="idxItemSell">
          <br>
          <label>Sell Slot Index</label>
          <input v-model="idxSlotSell">
          <br>
          <button @click="sell(idxItemSell,idxSlotSell)">Sell</button>

        </div>
      </div>

      <div v-if="currentShop !== null" style="width: 50%">

        <!-- EXO 3.1 : nom de la boutique courante -->
        <h2 v-if="currentShop!==null">{{currentShop.name}}</h2>


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

  </div>
</template>

<script>
import {town1, players} from '../model.js'

export default {
  name: 'Town',
  data: () => {
    return {
      players, // la liste des persos (permet d'observer la variable externe players, importée depuis model.js)
      currentTown: town1, // la ville courante
      currentPlayer: players[0], // le perso courant
      currentStreet: null, // la rue courante
      currentShop: null, // la boutique courante
      idxItemBuy:1, // la valeur du champ de saisie pour acheter un item
      idxItemOrder:1, // la valeur du champ de saisie pour commander un item
      idxItemBought:1, // la valeur du champ de saisie "index item" pour assigner un item
      idxSlotAssign:1, // la valeur du champ de saisie "index slot" pour assigner un item
      idxItemSell:1, // la valeur du champ de saisie "index item" pour vendre un item
      idxSlotSell:1, // la valeur du champ de saisie "index slot" pour vendre un item
      selectedPlayer: null,
    }
  },
  computed: {
    boughtItems() {
      let txt = ""
      /* EXO 4.4
         - construire txt le nom des items achetés+index
      */
      this.currentPlayer.boughtItems.forEach((item,index) =>{
        txt+="[ "+index+" ] - "+item.name
      })

      console.log(this.currentPlayer.boughtItems)
      console.log(txt)
      return txt;
    },
  },
  methods: {
    selectPlayer(id)  {
      /* EXO 1.4
         - met à jour le joueur courant grâce à id
      */
      if(id>=0 && id<=this.players.length)
        this.currentPlayer=players[id];
    },
    selectStreet(id) {
      /* EXO 2.3
         - met à jour la rue courante grâce à id
	 - met à jour la boutique courante, en prenant la première de la rue courante
      */
      if(id>=0 && id<=this.currentTown.streets.length){
        this.currentStreet=this.currentTown.streets[id];
        this.currentShop=this.currentStreet.shops[0];
      }
    },
    selectShop(id) {
      /* EXO 2.4
         - met à jour la boutique courante grâce à id
      */
      console.log(id%this.currentStreet.shops.length)
      this.currentShop=this.currentStreet.shops[id%this.currentStreet.shops.length];
    },
    assign(idxItemBought,idxSlotAssign) {
      /* EXO 4.6
         - comme dans le TP 2 mais en prenant l'id de l'item+slot à assigner dans idxItemBought+idxSlotAssign
      */
      if(this.currentPlayer.boughtItems.length===0){
        alert("You didn't buy any item, hurry up !!!");
        return;
      }
      
      if(idxItemBought<0 || idxItemBought>this.currentPlayer.boughtItems.length-1){
        alert("Le numero de l'objet achete doit être compris entre 0 et "+this.currentPlayer.boughtItems.length-1);
        return;
      }
      
      if(idxSlotAssign<0 || idxSlotAssign>4){
        alert("Le numero de l'objet achete doit être compris entre 0 et 4");
        return;
      }
      let message = this.currentPlayer.assign(idxItemBought,idxSlotAssign);
      
      if(message!=="")
        alert(message);
    },
    buy(idxItemBuy) {
      /* EXO 4.8
         - comme dans le TP 2 mais en prenant l'id de l'item à acheter dans idxItemBuy
      */
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
      /* EXO 4.10
         - comme dans le TP 2 mais en prenant l'id de l'item à acheter dans idxItemOrder
      */

      idxItemOrder -= 1;
      if ((isNaN(idxItemOrder)) || (idxItemOrder < 0) || (idxItemOrder >= this.currentShop.itemOrder.length)) {
        alert("invalid item index");
        return;
      }

      setTimeout(() => { this.currentShop.order(idxItemOrder)}, 1000);
    },
    sell(idxItemSell,idxSlotSell) {
      /* EXO 4.12
         - comme dans le TP 2 mais en prenant l'id de l'item+slot à assigner dans idxItemSell+idxSlotSell
      */

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
  }
}
</script>