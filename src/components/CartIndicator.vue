<template>
  <PreloaderSmall v-if="cartLoadingState"/>
  <router-link class="header__cart" :to="{name:'cart'}" aria-label="Корзина с товарами" v-else>        
      <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>    
  </router-link>
</template>

<script>
import PreloaderSmall from "@/components/PreloaderSmall.vue"
import { mapGetters } from "vuex";

export default {
  components: {PreloaderSmall},
  computed: {
    ...mapGetters(['cartLoadingState'])
  }
}
</script>