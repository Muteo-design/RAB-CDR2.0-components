import Accordion from './Accordion';
import IncludedList from '../molecules/IncludedList';

export default {
	// title: 'CDR 2.0/Molecules/Accordion',
	title: 'WIP/Accordion',
	component: Accordion,
	decorators: [() => ({ template: '<div class="clearfix"><div class="col-sm-4"><story/></div></div>' })],
};

const Template = (args) => ({
	components: { Accordion, IncludedList },
	setup() {
		return { args };
	},
	template: `
		<accordion v-bind="args">
			<included-list title="What's included" :list="args.included"/>
		</accordion>
	`,
});

export const Default = Template.bind({});
Default.args = {
	title: 'Title goes here',
	icon: 'icon-rab-coins',
	included: [
		'Name of account',
		'Account balance',
		'Interest rates',
		'Fees',
		'Discounts',
		'Account mail address',
		'Type of account',
		'Fees',
		'Discounts',
		'Account terms',
	],
};
