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
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import axios from 'axios';
import { API_BASE_URL } from '@/config.js'

export default {  
  components: { ProductList, BasePagination, ProductFilter },
  methods:{
    loadProducts(){
      clearTimeout(this.loadProductTimer);
      
      this.loadProductTimer = setTimeout(()=> {
        axios
        .get(API_BASE_URL + `api/products`,{
          params:{
            page: this.page,
            limit: this.productPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo
          }
        }).then(response => this.productsData = response.data); 
      },0)           
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
      loadProductTimer:0,
    };
  },
  watch:{
      page(){        
        this.loadProducts();
      },
      filterCategoryId(){
        this.loadProducts();
      },
      filterPriceFrom(){
        this.loadProducts();
      },
      filterPriceTo(){
        this.loadProducts();
      },

    },
  computed: {    
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
