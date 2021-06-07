<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="p in products"
      :key="p.id"
      :item="p"      
    />
  </ul>
</template>

<script>
import ProductItem from "./ProductItem.vue";
export default {
  components: { ProductItem },
  props: ["products"],
};
</script>
