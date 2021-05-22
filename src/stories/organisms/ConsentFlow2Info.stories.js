import ConsentFlow2Info from './ConsentFlow2Info';

export default {
	// title: 'CDR 2.0/Organisms/ConsentFlow2Info',
	title: 'WIP/ConsentFlow2Info',
	component: ConsentFlow2Info,
	decorators: [() => ({ template: '<div class="clearfix"><div class="col-sm-4"><story/></div></div>' })],
};

const Template = (args) => ({
	components: { ConsentFlow2Info },
	setup() {
		return { args };
	},
	template: '<consent-flow-2-info/>',
});

export const Default = Template.bind({});
