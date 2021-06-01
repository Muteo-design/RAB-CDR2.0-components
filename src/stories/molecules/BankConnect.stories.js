import BankConnect from './BankConnect';
import { default as bank } from '@/assets/dataholder-cba.json';

export default {
	title: 'CDR 2.0/Molecules/BankConnect',
	component: BankConnect,
};

const Template = (args) => ({
	components: { BankConnect },
	setup() {
		return { args };
	},
	template: '<bank-connect :bank="args.bank"/>',
});

export const NotStarted = Template.bind({});
NotStarted.args = {
	bank: bank,
};

export const Pending = Template.bind({});
Pending.args = {
	bank: {
		...bank,
		status: 'pending',
	},
};

export const Complete = Template.bind({});
Complete.args = {
	bank: {
		...bank,
		status: 'complete',
	},
};

export const Failed = Template.bind({});
Failed.args = {
	bank: {
		...bank,
		status: 'failed',
	},
};
