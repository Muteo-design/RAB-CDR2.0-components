import ConsentFlow2Intro from './ConsentFlow2Intro';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow2Intro',
	component: ConsentFlow2Intro,
};

const Template = (args, { argTypes }) => ({
	components: { ConsentFlow2Intro },
	props: Object.keys(argTypes),
	template:
		'<consent-flow-2-intro/>',
});

export const Default = Template.bind({});
