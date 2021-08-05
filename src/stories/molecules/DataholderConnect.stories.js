import DataholderConnect from './DataholderConnect';
import { default as bankAuth } from '@/assets/dataholder-cba.json';

export default {
	title: 'CDR 2.0/Molecules/DataholderConnect',
	component: DataholderConnect,
};

const Template = (args, { argTypes }) => ({
	components: { DataholderConnect },
	props: Object.keys(argTypes),
	template: '<dataholder-connect :dataholder="bank"/>',
});

export const NotStarted = Template.bind({});
NotStarted.args = {
	bank: bankAuth,
};

export const Pending = Template.bind({});
Pending.args = {
	bank: {
		...bankAuth,
		status: 'pending',
	},
};

export const Complete = Template.bind({});
Complete.args = {
	bank: {
		...bankAuth,
		status: 'complete',
	},
};

export const Failed = Template.bind({});
Failed.args = {
	bank: {
		...bankAuth,
		status: 'failed',
	},
};

const bank = Object.assign({}, bankAuth);
bank.authorisation = null;

export const MissingAuth = Template.bind({});
MissingAuth.args = { bank };
