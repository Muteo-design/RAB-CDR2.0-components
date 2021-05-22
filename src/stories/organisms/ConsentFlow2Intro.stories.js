import ConsentFlow2Intro from './ConsentFlow2Intro';

export default {
	// title: 'CDR 2.0/Organisms/ConsentFlow2Intro',
	title: 'WIP/ConsentFlow2Intro',
	component: ConsentFlow2Intro,
};

const Template = (args) => ({
	components: { ConsentFlow2Intro },
	setup() {
		return { args };
	},
	template:
		'<consent-flow-2-intro/>',
});

export const Default = Template.bind({});
