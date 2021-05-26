import ConsentFlow2 from './ConsentFlow2';

export default {
	title: 'CDR 2.0/Pages/ConsentFlow2',
	component: ConsentFlow2,
};

const Template = (args) => ({
	components: { ConsentFlow2 },
	setup() {
		return { args };
	},
	template: '<consent-flow-2 v-bind="args"/>',
});

export const Default = Template.bind({});
