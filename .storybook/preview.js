/* Register components globally that are used in Cloudcase */
import Vue from 'vue';
/* Mixin that mimics Cloudcase passing data from server to component state */
import cloudcaseStateMixin from '@/mixins/cloudcase-state.js';
/* Top level components */
import BankSelector from '@/components/molecules/BankSelector.vue';
/* Nested components */
import BankSearch from '@/components/atoms/BankSearch.vue';
import DataholderSelect from '@/components/atoms/DataholderSelect.vue';
import DataholderSelectedPill from '@/components/atoms/DataholderSelectedPill.vue';

/* Add mixin to top level components only */
BankSelector.mixins = [cloudcaseStateMixin];
Vue.component('bank-selector', BankSelector);
Vue.component('bank-search', BankSearch);
Vue.component('dataholder-select', DataholderSelect);
Vue.component('dataholder-selected-pill', DataholderSelectedPill);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};