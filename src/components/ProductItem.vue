<template>
    <li class="catalog__item">
        <a class="catalog__pic" href="#">
          <img
            :src="item.image"            
            :alt="item.title"
          />
        </a>

        <h3 class="catalog__title">
          <a href="#">{{ item.title }}</a>
        </h3>

        <span class="catalog__price"> {{ item.price }} ₽ </span>

        <ul class="colors colors--black">
          <li class="colors__item" v-for="c in item.colors" :key="c.name">
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

export default {
  methods: {
    resolveColor(colorName){ 
      console.log('ProductItem.vue/resolveColor()',colorName);
      return colors.filter(colors => colors.name==colorName)[0]["value"];
    }
  },
  // TODO: Так не работает :(
  // computed: {
  //   resolveColor(colorName){ 
  //     console.log('resolveColor',colorName);
  //     return colors.filter(colors => colors.name==colorName)[0]["value"];
  //   }
  // },
  data() {
    return {
      color: '#73B6EA',
    }
  },
  props:['item','index']
}
</script>
