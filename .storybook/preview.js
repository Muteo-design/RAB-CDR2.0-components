/* Register components globally that will be integrated into Cloudcase */
import Vue from 'vue';
/* Organisms (top level)*/
import BankSelector from '@/stories/organisms/BankSelector';
import ConsentFlow1Intro from '@/stories/organisms/ConsentFlow1Intro';
import ConsentFlow1Dataholders from '@/stories/organisms/ConsentFlow1Dataholders';
/* Molecules */
import DataholderDetails from '@/stories/molecules/DataholderDetails';
import CardDataholderConnect from '@/stories/molecules/CardDataholderConnect';
import CardBadge from '@/stories/molecules/CardBadge';
import CardCDR from '@/stories/molecules/CardCDR';
/* Atoms */
import Tickbox from '@/stories/atoms/Tickbox';
import Chevron from '@/stories/atoms/Chevron';
/* Mixin that mimics Cloudcase passing data from server to component state */
import mixinCloudcaseState from '@/mixins/cloudcase-state';

/* Organisms (top level)*/
/* Add mixin to top level components only */
const topLevelComponents = [
  BankSelector,
  ConsentFlow1Intro,
  ConsentFlow1Dataholders,
];
for (const component of topLevelComponents) {
  component.mixins = [mixinCloudcaseState];
}
Vue.component('bank-selector', BankSelector);
Vue.component('consent-flow-1-intro', ConsentFlow1Intro);
Vue.component('consent-flow-1-dataholders', ConsentFlow1Dataholders);
/* Molecules */
Vue.component('dataholder-details', DataholderDetails);
Vue.component('card-badge', CardBadge);
Vue.component('card-cdr', CardCDR);
Vue.component('card-dataholder-connect', CardDataholderConnect);
/* Atoms */
Vue.component('tickbox', Tickbox);
Vue.component('chevron', Chevron);

import '@/assets/css/app.css';

/* Add decorator templates based on context */
export const decorators = [
  (story, { kind }) => {
    const paths = kind.split('/');
    if (!paths.includes('Pages')) {
      const nested = !paths.includes('Organisms');
      return {
        template: `<div id="cloudcase-form"><div class="${nested ? 'rab-cdr ' : ''}p-4 bg-white"><story/></div></div>`
      }
    } else {
      return { template: '<story/>' }
    }
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};