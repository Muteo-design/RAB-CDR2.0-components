// Register components globally that will be integrated into Cloudcase
import { app } from '@storybook/vue3';
// Organisms (top level)
import BankSelector from '@/stories/organisms/BankSelector';
import ConsentFlow1Intro from '@/stories/organisms/ConsentFlow1Intro';
import ConsentFlow1Dataholders from '@/stories/organisms/ConsentFlow1Dataholders';
import ConsentFlow2Intro from '@/stories/organisms/ConsentFlow2Intro';
import ConsentFlow2Clusters from '@/stories/organisms/ConsentFlow2Clusters';
import ConsentFlow3Intro from '@/stories/organisms/ConsentFlow3Intro';
import ConsentFlow3Confirm from '@/stories/organisms/ConsentFlow3Confirm';
import ConsentFlow3Actions from '@/stories/organisms/ConsentFlow3Actions';
import ConnectBanksChecklist from '@/stories/organisms/ConnectBanksChecklist';
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
import BankConnect from '@/stories/molecules/BankConnect';
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
  ConnectBanksChecklist
];
for (const component of topLevelComponents) {
  component.mixins = [mixinCloudcaseState];
}
app.component('bank-selector', BankSelector);
app.component('consent-flow-1-intro', ConsentFlow1Intro);
app.component('consent-flow-1-dataholders', ConsentFlow1Dataholders);
app.component('consent-flow-2-intro', ConsentFlow2Intro);
app.component('consent-flow-2-clusters', ConsentFlow2Clusters);
app.component('consent-flow-3-intro', ConsentFlow3Intro);
app.component('consent-flow-3-confirm', ConsentFlow3Confirm);
app.component('consent-flow-3-actions', ConsentFlow3Actions);
app.component('connect-banks-checklist', ConnectBanksChecklist);
// Molecules
app.component('bank-details', BankDetails);
app.component('bank-select', BankSelect);
app.component('bank-pill', BankPill);
app.component('card-badge', CardBadge);
app.component('card-cdr', CardCDR);
app.component('card-cdr-intro', CardCDRIntro);
app.component('card-bank-connect', CardBankConnect);
app.component('accordion', Accordion);
app.component('accordion-data-cluster', AccordionDataCluster);
app.component('bank-connect', BankConnect);
// Atoms
app.component('tickbox', Tickbox);
app.component('toggle-box', ToggleBox);
app.component('chevron', Chevron);

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