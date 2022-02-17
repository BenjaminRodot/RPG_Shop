<template>
  <div>
    <table border="1">
      <tr v-for="(slot,index1) in currentPlayer.slots" v-bind:key="index1">
        <td>{{slot.name}}</td>
        <td v-for="(item,index2) in slot.items" v-bind:key="index2">
          {{index2}} - {{item.name}}
          <input type="checkbox" :name="slot.id" @change="addUnassignList(index2,slot.id-1)">
        </td>
      </tr>
    </table>
    <div>
      <br>
      <label>Bought Items</label>
      <input readonly :value="boughtItems">
      <br>
      <label>Bought Items Index</label>
      <input v-model="idxItemBought">
      <br>
      <label>Slot Items Index</label>
      <input v-model="idxSlotAssign">
      <br>
      <button @click="assign(idxItemBought,idxSlotAssign)">Assign</button>
      <button @click="unassign()">Unassign</button>
    </div>
  </div>

</template>

<script>

export default {
  name: "PersoSlots",
  data: () =>{
    return{
      idxItemBought:1, // la valeur du champ de saisie "index item" pour assigner un item
      idxSlotAssign:1, // la valeur du champ de saisie "index slot" pour assigner un item
      listUnassignItem: [],
    }
  },
  computed: {
    boughtItems() {
      let txt = ""
      this.currentPlayer.boughtItems.forEach((item,index) =>{
        txt+="[ "+index+" ] - "+item.name
      })
      return txt;
    },
  },
  props:{
    currentPlayer:Object
  },
  methods:{
    assign(idxItemBought,idxSlotAssign) {
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

      if((this.currentPlayer.boughtItems[(idxItemBought)].effect[0]==='a' ||
          this.currentPlayer.boughtItems[(idxItemBought)].effect[0]==='s')
          && (idxSlotAssign!=="4")){
        alert("Un objet avec un effet temporaire ne peut etre affecte qu'au sac!")
        return;
      }
      let message = this.currentPlayer.assign(idxItemBought,idxSlotAssign);

      if(message!=="")
        alert(message);
    },
    unassign(){
      this.listUnassignItem.forEach(element => console.log(element[0],element[1]))
      console.log("================")
      this.listUnassignItem.sort(compareSecondColumn)

      this.listUnassignItem.forEach(element => console.log(element[0],element[1]))
      console.log("================")
      this.listUnassignItem.forEach(element => {
        this.currentPlayer.unassign(element[0],element[1])
      })
      this.listUnassignItem=[]
    },
    addUnassignList(idxItemBought,idxSlotAssign){

      let index = 0
      let verify = false
      while(index<this.listUnassignItem.length && !verify){
        if (this.listUnassignItem[index][0]===idxItemBought && this.listUnassignItem[index][1]===idxSlotAssign){
          verify=true
          this.listUnassignItem.splice(index,1)
        }
        index++
      }
      if(!verify){
        this.listUnassignItem.push([idxItemBought,idxSlotAssign])
      }
      return ""
    },
  }
}
function compareSecondColumn(a, b) {
  if (a[0] === b[0]) {
    return 0;
  }
  else {
    return (a[0] > b[0]) ? -1 : 1;
  }
}

</script>

<style scoped>

</style>