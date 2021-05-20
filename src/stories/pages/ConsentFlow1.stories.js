import ConsentFlow1 from './ConsentFlow1';
import * as ConsentFlow1Intro from '../organisms/ConsentFlow1Intro.stories';
import * as ConsentFlow1Dataholders from '../organisms/ConsentFlow1Dataholders.stories';

export default {
	title: 'CDR 2.0/Pages/ConsentFlow1',
	component: ConsentFlow1,
};

const Template = (args) => ({
	components: { ConsentFlow1 },
	setup() {
		return { args };
	},
	template:
		'<consent-flow-1 v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
	consentFlow1IntroEntered: ConsentFlow1Intro.Default.args.entered,
	ConsentFlow1DataholdersEntered: ConsentFlow1Dataholders.Default.args.entered,
};

Default.parameters = {
	controls: { hideNoControlsWarning: true },
};
