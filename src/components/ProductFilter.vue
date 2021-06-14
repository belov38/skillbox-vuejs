<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="c in colors" :key="c.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                :value="c.id" 
                v-model="currentColorId"               
              />
              <span class="colors__value" :style="'background-color: '+c.code">
              </span>
            </label>
          </li>         
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объем в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="8"
                checked=""
                v-model="currentMemory8"
              />
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="16"
                v-model="currentMemory16"
              />
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="32"
                v-model="currentMemory32"
              />
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="64"
                v-model="currentMemory64"
              />
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="128"
                v-model="currentMemory128"
              />
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="264"
                v-model="currentMemory264"
              />
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config.js'

export default {
  props: ["priceFrom", "priceTo", "categoryId","colorId"],
  data(){
    return {
      currentPriceFrom:0,
      currentPriceTo:0,
      currentCategoryId:0,
      currentColorId:0,
      currentMemory8:false,
      currentMemory16:false,
      currentMemory32:false,
      currentMemory64:false,
      currentMemory128:false,
      currentMemory264:false,
      categoriesDate: null,   
      colorsData: null,
    }
  },
  computed: {
    categories() {
      return this.categoriesDate ? this.categoriesDate.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    }
  },
  watch:{
      priceFrom(value){
        this.currentPriceFrom=value;
      },
      priceTo(value){
        this.currentPriceTo=value;
      },
      categoryId(value){        
        this.currentCategoryId=value;
      },
      colorId(value){
        console.log('w color')
        this.currentColorId=value;
      },
  },
  created(){
    this.loadCategories();
    this.loadColors();
  },
  methods: {
    loadCategories(){
      axios
        .get(API_BASE_URL + 'api/productCategories').then(response => this.categoriesDate = response.data);      
    },
    loadColors(){
      axios
        .get(API_BASE_URL + 'api/colors').then(response => this.colorsData = response.data);      
    },
    submit(){
      this.$emit('update:priceFrom',this.currentPriceFrom);
      this.$emit('update:priceTo',this.currentPriceTo);
      this.$emit('update:categoryId',this.currentCategoryId);      
      this.$emit('update:colorId',this.currentColorId);
    },
    reset(){
      this.$emit('update:priceFrom',0);
      this.$emit('update:priceTo',0);
      this.$emit('update:categoryId',0);
      this.$emit('update:colorId',0);           
      this.currentMemory8 = false;
      this.currentMemory16 = false;
      this.currentMemory32 = false;
      this.currentMemory64 = false;
      this.currentMemory128 = false;
      this.currentMemory264 = false;
    },
  }
};
</script>
