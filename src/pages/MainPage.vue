<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
      />
      <section class="catalog">
        <ProductList :products="products"></ProductList>
        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from "@/data/products.js";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import axios from 'axios';

export default {  
  components: { ProductList, BasePagination, ProductFilter },
  methods:{
    loadProducts(){
      axios.get(`https://vue-study.skillbox.cc/api/products?page=${this.page}&limit=${this.productPerPage}`).then(response => this.productsData = response.data);      
    }
  },
  created(){    
    this.loadProducts()
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId:0,
      page: 1,
      productPerPage: 3,

      productsData:null,
    };
  },
  watch:{
      page(){        
        this.loadProducts();
      }
    },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      
      if (this.filterColorId) {
        
        filteredProducts = filteredProducts.filter(          
          (product) => product.colors.includes(this.filterColorId)
        );      
      }

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom
        );
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo
        );
      }

      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId
        );
      }

      return filteredProducts;
    },
    products() {
      return this.productsData 
        ? this.productsData.items.map(product => {
          return {
            ...product,
            image:product.image.file.url
          }
        }) : [];
    },    
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
};
</script>
