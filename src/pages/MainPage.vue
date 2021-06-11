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
        <div class="container-preloader" v-if="productLoading">
          <div class="item-1"></div>
          <div class="item-2"></div>
          <div class="item-3"></div>
          <div class="item-4"></div>
          <div class="item-5"></div>
        </div>
        
        <div v-if="productLoadingFailed">
          Ошибка загрузки товаров
          <button @click.prevent="loadProducts">Повтор</button>
        </div>
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
import axios from "axios";
import { API_BASE_URL } from "@/config.js";

export default {
  components: { ProductList, BasePagination, ProductFilter },
  methods: {
    loadProducts() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductTimer);

      this.loadProductTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + `api/products`, {
            params: {
              page: this.page,
              limit: this.productPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorId,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productLoadingFailed = true))
          .then(() => (this.productLoading = false));
      }, 500);
    },
  },
  created() {
    this.loadProducts();
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productPerPage: 3,

      productsData: null,
      loadProductTimer: 0,

      productLoading: false,
      productLoadingFailed: false,
    };
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url,
            };
          })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
};
</script>

<style>
.container-preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  animation-delay: 1s;
}

.item-1 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #eed968;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
  75% {
    transform: scale(2.5);
  }
  78%,
  100% {
    opacity: 0;
  }
}
.item-1:before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eed968;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 200ms;
  transition: 0.5s all ease;
  transform: scale(1);
}

.item-2 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #eece68;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
  75% {
    transform: scale(2.5);
  }
  78%,
  100% {
    opacity: 0;
  }
}
.item-2:before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eece68;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 400ms;
  transition: 0.5s all ease;
  transform: scale(1);
}

.item-3 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #eec368;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
  75% {
    transform: scale(2.5);
  }
  78%,
  100% {
    opacity: 0;
  }
}
.item-3:before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eec368;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 600ms;
  transition: 0.5s all ease;
  transform: scale(1);
}

.item-4 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #eead68;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
  75% {
    transform: scale(2.5);
  }
  78%,
  100% {
    opacity: 0;
  }
}
.item-4:before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eead68;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 800ms;
  transition: 0.5s all ease;
  transform: scale(1);
}

.item-5 {
  width: 20px;
  height: 20px;
  background: #f583a1;
  border-radius: 50%;
  background-color: #ee8c68;
  margin: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50%,
  75% {
    transform: scale(2.5);
  }
  78%,
  100% {
    opacity: 0;
  }
}
.item-5:before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ee8c68;
  opacity: 0.7;
  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
  animation-delay: 1000ms;
  transition: 0.5s all ease;
  transform: scale(1);
}
</style>