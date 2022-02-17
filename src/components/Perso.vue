<template>
  <div>
    <PersoCaracs :currentPlayer="currentPlayer"></PersoCaracs>
    <PersoSlots :currentPlayer="currentPlayer"></PersoSlots>
    <PersoOps :currentPlayer="currentPlayer" :currentShop="currentShop" :currentTown="currentTown"></PersoOps>
  </div>
</template>

<script>
import PersoCaracs from '@/components/PersoCaracs'
import PersoSlots from '@/components/PersoSlots'
import PersoOps from '@/components/PersoOps'
export default {
  name: "Perso",
  components: {
    'PersoCaracs': PersoCaracs,
    'PersoSlots' : PersoSlots,
    'PersoOps' : PersoOps,
  },
  props:{
    currentPlayer:Object,
    currentShop:Object,
    currentTown:Object,
  },
}
</script>

<style scoped>

</style>
