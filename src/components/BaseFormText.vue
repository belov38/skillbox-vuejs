<template>
  <BaseFormField :title="title" :error="error">
    <input
      class="form__input"
      :type="type"     
      :placeholder="placeholder"
      v-model="dataValue"
    />
  </BaseFormField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin.js";

export default {
    props:{
        type:{
            default: 'text'
        }
    },
    mixins: [formFieldMixin],
};
</script>