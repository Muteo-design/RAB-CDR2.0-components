import ConsentFlow3Intro from './ConsentFlow3Intro';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow3Intro',
	component: ConsentFlow3Intro,
};

const Template = (args, { argTypes }) => ({
	components: { ConsentFlow3Intro },
	props: Object.keys(argTypes),
	template:
		'<consent-flow-3-intro/>',
});

export const Default = Template.bind({});
