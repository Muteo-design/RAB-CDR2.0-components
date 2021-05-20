import BankSelect from './BankSelect';
import * as BankSelectorStories from '../organisms/BankSelector.stories';

export default {
	title: 'CDR 2.0/Pages/BankSelect',
	component: BankSelect,
	argTypes: {
		bankSelectorEntered: {
			table: { disable: true },
		},
	},
};

const Template = (args) => ({
	components: { BankSelect },
	setup() {
		return { args };
	},
	template:
		'<bank-select v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
	bankSelectorEntered: BankSelectorStories.Default.args.entered,
};

