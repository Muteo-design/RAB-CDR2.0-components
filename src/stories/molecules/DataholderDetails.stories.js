import DataholderDetails from './DataholderDetails';
import { default as shortName } from '@/assets/dataholder-westpac.json';
import { default as longName } from '@/assets/dataholder-cba.json';

export default {
	title: 'CDR 2.0/Molecules/DataholderDetails',
	component: DataholderDetails,
};

const Template = (args) => ({
	components: { DataholderDetails },
	setup() {
		return { args }
	},
	template:
		'<dataholder-details :dataholder="args.dataholder"/>',
});

export const ShortName = Template.bind({});
ShortName.args = {
	dataholder: shortName,
};

export const LongName = Template.bind({});
LongName.args = {
	dataholder: longName,
};
