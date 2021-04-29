<template>
  <page>
    <widget legend="Add your banks">
      <bank-selector :entered-data="bankSelectorEntered">
        <p class="text-feature mt-4">Michael, tell us about all the banks where you have accounts for transactions, savings, credit cards or loans.</p>
      </bank-selector>
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
