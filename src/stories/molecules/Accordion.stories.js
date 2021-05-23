import Accordion from './Accordion';

export default {
	title: 'CDR 2.0/Molecules/Accordion',
	component: Accordion,
};

const Template = (args) => ({
	components: { Accordion },
	setup() {
		return { args };
	},
	template: `
		<accordion v-bind="args">
			<ul class="pl-0 list-unstyled bullet-check-invert text-brand-copy-2 h7 columns-sm-2">
				<li v-for="listItem in args.accountBalanceList" :key="listItem">{{ listItem }}</li>
			</ul>
		</accordion>
	`,
});

const props = {
	title: 'Account balance and details',
	icon: 'coins',
	accountBalanceList: [
		'Name of account',
		'Type of account',
		'Account balance',
		'Account number',
		'Interest rates',
		'Fees',
		'Discounts',
		'Account terms',
		'Account mail address',
	],
};

export const Default = Template.bind({});
Default.args = { ...props };

export const Open = Template.bind({});
Open.args = {
	...props,
	open: true,
};

export const Checked = Template.bind({});
Checked.args = {
	...props,
	checked: true,
};

export const OpenChecked = Template.bind({});
OpenChecked.args = {
	...props,
	open: true,
	checked: true,
};
