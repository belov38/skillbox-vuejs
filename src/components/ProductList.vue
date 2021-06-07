<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="(p, index) in products"
      :key="index"
      :item="p"
      :index="index"
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
