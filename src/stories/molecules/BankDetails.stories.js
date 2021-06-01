import BankDetails from './BankDetails';
import { default as shortName } from '@/assets/dataholder-westpac.json';
import { default as longName } from '@/assets/dataholder-cba.json';

export default {
	title: 'CDR 2.0/Molecules/BankDetails',
	component: BankDetails,
};

const Template = (args) => ({
	components: { BankDetails },
	setup() {
		return { args }
	},
	template:
		'<bank-details :bank="args.bank"/>',
});

export const ShortName = Template.bind({});
ShortName.args = {
	bank: shortName,
};

export const LongName = Template.bind({});
LongName.args = {
	bank: longName,
};
