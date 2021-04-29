/* Register components globally that will be integrated into Cloudcase */
import Vue from 'vue';
/* Organisms (top level)*/
import BankSelector from '@/stories/organisms/BankSelector';
/* Molecules */
import BankSearch from '@/stories/molecules/BankSearch';
import DataholderSelect from '@/stories/molecules/DataholderSelect';
import DataholderSelectedPill from '@/stories/molecules/DataholderSelectedPill';
/* Atoms */
import Tickbox from '@/stories/atoms/Tickbox';
/* Mixin that mimics Cloudcase passing data from server to component state */
import cloudcaseStateMixin from '@/mixins/cloudcase-state';

/* Add mixin to top level components only */
BankSelector.mixins = [cloudcaseStateMixin];
Vue.component('bank-selector', BankSelector);
Vue.component('bank-search', BankSearch);
Vue.component('dataholder-select', DataholderSelect);
Vue.component('dataholder-selected-pill', DataholderSelectedPill);
Vue.component('tickbox', Tickbox);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};