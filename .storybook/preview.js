// Register components globally that will be integrated into Cloudcase
import Vue from 'vue';
// Organisms (top level)
import BankSelector from '@/stories/organisms/BankSelector';
import ConsentFlow1Intro from '@/stories/organisms/ConsentFlow1Intro';
import ConsentFlow1Dataholders from '@/stories/organisms/ConsentFlow1Dataholders';
import ConsentFlow2Intro from '@/stories/organisms/ConsentFlow2Intro';
import ConsentFlow2Clusters from '@/stories/organisms/ConsentFlow2Clusters';
import ConsentFlow3Intro from '@/stories/organisms/ConsentFlow3Intro';
import ConsentFlow3Confirm from '@/stories/organisms/ConsentFlow3Confirm';
import ConsentFlow3Actions from '@/stories/organisms/ConsentFlow3Actions';
import DataholderConnector from '@/stories/organisms/DataholderConnector';
// Molecules
import BankDetails from '@/stories/molecules/BankDetails';
import BankSelect from '@/stories/molecules/BankSelect';
import BankPill from '@/stories/molecules/BankPill';
import CardBankConnect from '@/stories/molecules/CardBankConnect';
import CardBadge from '@/stories/molecules/CardBadge';
import CardCDR from '@/stories/molecules/CardCDR';
import CardCDRIntro from '@/stories/molecules/CardCDRIntro';
import Accordion from '@/stories/molecules/Accordion';
import AccordionDataCluster from '@/stories/molecules/AccordionDataCluster';
import DataholderConnect from '@/stories/molecules/DataholderConnect';
// Atoms
import Tickbox from '@/stories/atoms/Tickbox';
import ToggleBox from '@/stories/atoms/ToggleBox';
import Chevron from '@/stories/atoms/Chevron';
// Mixin that mimics Cloudcase passing data from server to component state
import mixinCloudcaseState from '@/mixins/cloudcase-state';

// Organisms (top level)
// Add mixin to top level components only
const topLevelComponents = [
  BankSelector,
  ConsentFlow1Intro,
  ConsentFlow1Dataholders,
  ConsentFlow2Intro,
  ConsentFlow2Clusters,
  ConsentFlow3Intro,
  ConsentFlow3Confirm,
  ConsentFlow3Actions,
  DataholderConnector
];
for (const component of topLevelComponents) {
  component.mixins = [mixinCloudcaseState];
}
Vue.component('bank-selector', BankSelector);
Vue.component('consent-flow-1-intro', ConsentFlow1Intro);
Vue.component('consent-flow-1-dataholders', ConsentFlow1Dataholders);
Vue.component('consent-flow-2-intro', ConsentFlow2Intro);
Vue.component('consent-flow-2-clusters', ConsentFlow2Clusters);
Vue.component('consent-flow-3-intro', ConsentFlow3Intro);
Vue.component('consent-flow-3-confirm', ConsentFlow3Confirm);
Vue.component('consent-flow-3-actions', ConsentFlow3Actions);
Vue.component('dataholder-connector', DataholderConnector);
// Molecules
Vue.component('bank-details', BankDetails);
Vue.component('bank-select', BankSelect);
Vue.component('bank-pill', BankPill);
Vue.component('card-badge', CardBadge);
Vue.component('card-cdr', CardCDR);
Vue.component('card-cdr-intro', CardCDRIntro);
Vue.component('card-bank-connect', CardBankConnect);
Vue.component('accordion', Accordion);
Vue.component('accordion-data-cluster', AccordionDataCluster);
Vue.component('dataholder-connect', DataholderConnect);
// Atoms
Vue.component('tickbox', Tickbox);
Vue.component('toggle-box', ToggleBox);
Vue.component('chevron', Chevron);

import '@/assets/css/app.css';

// Add decorator templates based on context
export const decorators = [
  (story, { kind }) => {
    const paths = kind.split('/');
    if (!paths.includes('Pages') && !paths.includes('Standard Questions')) {
      const nested = !paths.includes('Organisms');
      return {
        template: `<div id="cloudcase-form"><div class="${nested ? 'rab-cdr ' : ''}p-4 bg-white"><story/></div></div>`,
      };
    } else {
      return { template: '<story/>' };
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
  options: {
    storySort: {
      order: [
        'CDR 2.0', [
          'Pages', [
            'BankSelect',
            'ConsentFlow1',
            'ConsentFlow2',
            'ConsentFlow3',
            'ConnectBanks',
          ],
          'Organisms', [
            'BankSelector',
            'ConsentFlow1Intro',
            'ConsentFlow1Dataholders',
            'ConsentFlow2Intro',
            'ConsentFlow2Clusters',
            'ConsentFlow3Intro',
            'ConsentFlow3Confirm',
            'ConsentFlow3Actions',
          ],
          'Molecules',
          'Atoms',
        ],
        'Cloudcase',
      ],
    },
  },
};