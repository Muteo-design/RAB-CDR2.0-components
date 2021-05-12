<template>
  <page>
    <widget legend="Add your banks">
      <bank-selector :entered-data="bankSelectorEntered"/>
    </widget>
  </page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';

export default {
  name: 'bank-select',
  components: { Page, Widget },
  props: {
    bankSelectorEntered: String
  }
};
</script>
