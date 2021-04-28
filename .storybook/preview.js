/* Register components globally */
import Vue from 'vue';

/* Top level components */
import BankSelector from '@/components/molecules/BankSelector.vue';
/* Add mixin to mimic Cloudcase passing data from server to component state */
import cloudcaseStateMixin from '@/mixins/cloudcase-state.js';
BankSelector.mixins = [cloudcaseStateMixin];
Vue.component('bank-selector', BankSelector);

/* Nested components */
import BankSearch from '@/components/atoms/BankSearch.vue';
Vue.component('bank-search', BankSearch);
import DataholderSelect from '@/components/atoms/DataholderSelect.vue';
Vue.component('dataholder-select', DataholderSelect);
import DataholderSelectedPill from '@/components/atoms/DataholderSelectedPill.vue';
Vue.component('dataholder-selected-pill', DataholderSelectedPill);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}