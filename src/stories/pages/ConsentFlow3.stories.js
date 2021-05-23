import ConsentFlow3 from './ConsentFlow3';

export default {
	title: 'CDR 2.0/Pages/ConsentFlow3',
	component: ConsentFlow3,
};

const Template = (args) => ({
	components: { ConsentFlow3 },
	setup() {
		return { args };
	},
	template:
		'<consent-flow-3 v-bind="args"/>',
});

export const Default = Template.bind({});
