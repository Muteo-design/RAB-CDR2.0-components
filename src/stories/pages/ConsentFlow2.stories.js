import ConsentFlow2 from './ConsentFlow2';

export default {
	title: 'CDR 2.0/Pages/ConsentFlow2',
	component: ConsentFlow2,
};

const Template = (args, { argTypes }) => ({
	components: { ConsentFlow2 },
	props: Object.keys(argTypes),
	template: '<consent-flow-2 v-bind="$props"/>',
});

export const Default = Template.bind({});
