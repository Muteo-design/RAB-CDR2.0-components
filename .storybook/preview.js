/* Register components globally that will be integrated into Cloudcase */
import Vue from 'vue';
/* Organisms (top level)*/
import BankSelector from '@/stories/organisms/BankSelector';
import ConsentFlowIntro from '@/stories/organisms/ConsentFlowIntro';
import ConsentFlowCanConnect from '@/stories/organisms/ConsentFlowCanConnect';
import ConsentFlowNeedHelp from '@/stories/organisms/ConsentFlowNeedHelp';
/* Molecules */
import DataholderDetails from '@/stories/molecules/DataholderDetails';
import DataholderConnectCard from '@/stories/molecules/DataholderConnectCard';
import DataholderSelectedPill from '@/stories/molecules/DataholderSelectedPill'; // NOTE: deprecated
import Badge from '@/stories/molecules/Badge';
import CDRBadge from '@/stories/molecules/CDRBadge';
/* Atoms */
import Tickbox from '@/stories/atoms/Tickbox';
/* Mixin that mimics Cloudcase passing data from server to component state */
import cloudcaseStateMixin from '@/mixins/cloudcase-state';

/* Organisms (top level)*/
/* Add mixin to top level components only */
const topLevelComponents = [
  BankSelector,
  ConsentFlowIntro,
  ConsentFlowCanConnect,
  ConsentFlowNeedHelp
];
for (const component of topLevelComponents) {
  component.mixins = [cloudcaseStateMixin]
}
Vue.component('bank-selector', BankSelector);
Vue.component('consent-flow-intro', ConsentFlowIntro);
Vue.component('consent-flow-can-connect', ConsentFlowCanConnect);
Vue.component('consent-flow-need-help', ConsentFlowNeedHelp);
/* Molecules */
Vue.component('dataholder-details', DataholderDetails);
Vue.component('dataholder-connect-card', DataholderConnectCard);
Vue.component('dataholder-selected-pill', DataholderSelectedPill); // NOTE: deprecated
Vue.component('badge', Badge);
Vue.component('cdr-badge', CDRBadge);
/* Atoms */
Vue.component('tickbox', Tickbox);

import '@/assets/css/app.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};