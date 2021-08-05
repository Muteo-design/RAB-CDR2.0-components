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

const Template = (args, { argTypes }) => ({
	components: { BankSelect },
	props: Object.keys(argTypes),
	template:
		'<bank-select v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
	bankSelectorEntered: BankSelectorStories.Default.args.entered,
};

