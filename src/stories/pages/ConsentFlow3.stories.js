import ConsentFlow3 from './ConsentFlow3';

export default {
	title: 'CDR 2.0/Pages/ConsentFlow3',
	component: ConsentFlow3,
};

const Template = (args, { argTypes }) => ({
	components: { ConsentFlow3 },
	props: Object.keys(argTypes),
	template:
		'<consent-flow-3 v-bind="$props"/>',
});

export const Default = Template.bind({});
