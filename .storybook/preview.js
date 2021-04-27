/* Register components globally */
import Vue from 'vue'
import BankSelector from '../src/components/BankSelector.vue';
import BankSearch from '../src/components/BankSearch.vue';
import DataholderSelect from '../src/components/DataholderSelect.vue';
import DataholderSelectedPill from '../src/components/DataholderSelectedPill.vue';
Vue.component('bank-selector', BankSelector);
Vue.component('bank-search', BankSearch);
Vue.component('dataholder-select', DataholderSelect);
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