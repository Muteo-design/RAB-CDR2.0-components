import ConsentFlow1Intro from './ConsentFlow1Intro';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow1Intro',
	component: ConsentFlow1Intro,
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { ConsentFlow1Intro },
	template: '<consent-flow-1-intro :entered-data="entered"/>',
});

export const Default = Template.bind({});
Default.args = {
	entered: JSON.stringify({ adrNumber: 'ADRBNK000001' }),
};
