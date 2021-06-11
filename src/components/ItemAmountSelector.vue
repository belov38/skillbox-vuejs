<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" />

    <button type="button" aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {  
    props:['itemAmount'],
    computed: {    
        amount: {
            get(){                
                return this.itemAmount;
            },
            set(value){                  
                this.$emit('update:itemAmount',value);                
            }
        }
    },       
};
</script>
