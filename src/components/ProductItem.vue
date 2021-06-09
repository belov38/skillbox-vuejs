<template>
    <li class="catalog__item">
        <a class="catalog__pic" href="#" @click.prevent="gotoPage('product',{id:item.id})">
          <img
            :src="item.image"            
            :alt="item.title"
          />
        </a>

        <h3 class="catalog__title">
          <a href="#">{{ item.title }}</a>
        </h3>

        <span class="catalog__price"> {{ item.price | numberFormat }} ₽ </span>

        <ul class="colors colors--black">
          <li class="colors__item" v-for="c in item.colors" :key="c.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                :value="resolveColor(c)" 
                v-model="color"                
              />
              <span class="colors__value" :style="'background-color: '+resolveColor(c)">
              </span>
            </label>
          </li>          
        </ul>
      </li>
</template>

<script>
import colors from "../data/colors.js"
import gotoPage from "@/helpers/gotoPage.js"
import numberFormat from "@/helpers/numberFormat.js"

export default {
  filters:{
    numberFormat
  },
  methods: {
    resolveColor(colorName){ 
      return colors.filter(colors => colors.id==colorName)[0]["value"];
    },
    gotoPage
  },
  
  data() {
    return {
      color: '#73B6EA',
    }
  },
  props:['item','index']
}
</script>
