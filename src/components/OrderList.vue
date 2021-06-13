<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order" v-for="i in cartProducts" :key=i.id>
        <h3>{{ i.product.title }}</h3>
        <b>{{ i.price | numberFormat}} ₽</b>
        <span>Артикул: {{ i.product.id  }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ cartProducts.length }}</b> товара на сумму <b>{{ totalPrice+500 | numberFormat }} ₽</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";


export default {
    filters: { numberFormat },
    props:['cartProducts','totalPrice'] 
};
</script>