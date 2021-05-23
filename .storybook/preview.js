// Register components globally that will be integrated into Cloudcase
import { app } from '@storybook/vue3';
// Organisms (top level)
import BankSelector from '@/stories/organisms/BankSelector';
import ConsentFlow1Intro from '@/stories/organisms/ConsentFlow1Intro';
import ConsentFlow1Dataholders from '@/stories/organisms/ConsentFlow1Dataholders';
import ConsentFlow2Intro from '@/stories/organisms/ConsentFlow2Intro';
import ConsentFlow2Consent from '@/stories/organisms/ConsentFlow2Consent';
// Molecules
import DataholderDetails from '@/stories/molecules/DataholderDetails';
import DataholderSelect from '@/stories/molecules/DataholderSelect';
import DataholderPill from '@/stories/molecules/DataholderPill';
import CardDataholderConnect from '@/stories/molecules/CardDataholderConnect';
import CardBadge from '@/stories/molecules/CardBadge';
import CardCDR from '@/stories/molecules/CardCDR';
import Accordion from '@/stories/molecules/Accordion';
// Atoms
import Tickbox from '@/stories/atoms/Tickbox';
import Chevron from '@/stories/atoms/Chevron';
// Mixin that mimics Cloudcase passing data from server to component state
import mixinCloudcaseState from '@/mixins/cloudcase-state';

// Organisms (top level)
// Add mixin to top level components only
const topLevelComponents = [
	BankSelector,
	ConsentFlow1Intro,
	ConsentFlow1Dataholders,
];
for (const component of topLevelComponents) {
	component.mixins = [mixinCloudcaseState];
}
app.component('bank-selector', BankSelector);
app.component('consent-flow-1-intro', ConsentFlow1Intro);
app.component('consent-flow-1-dataholders', ConsentFlow1Dataholders);
app.component('consent-flow-2-intro', ConsentFlow2Intro);
app.component('consent-flow-2-consent', ConsentFlow2Consent);
// Molecules
app.component('dataholder-details', DataholderDetails);
app.component('dataholder-select', DataholderSelect);
app.component('dataholder-pill', DataholderPill);
app.component('card-badge', CardBadge);
app.component('card-cdr', CardCDR);
app.component('card-dataholder-connect', CardDataholderConnect);
app.component('accordion', Accordion);
// Atoms
app.component('tickbox', Tickbox);
app.component('chevron', Chevron);

import '@/assets/css/app.css';

// Add decorator templates based on context
export const decorators = [
	(story, { kind }) => {
		const paths = kind.split('/');
		if (!paths.includes('Pages')) {
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
			order: ['CDR 2.0', [
				'Pages', [
					'BankSelect',
					'ConsentFlow1',
					'ConsentFlow2',
				],
				'Organisms', [
					'BankSelector',
					'ConsentFlow1Intro',
					'ConsentFlow1Dataholders',
					'ConsentFlow2Intro',
					'ConsentFlow2Consent',
				],
				'Molecules',
				'Atoms',
			]],
		},
	},
};