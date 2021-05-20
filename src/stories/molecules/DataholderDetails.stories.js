import DataholderDetails from './DataholderDetails';

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

const shortName = {
	name: 'ANZ',
	imageUrl: 'https://www.anz.com.au/content/dam/anzcomau/logos/anz/ANZ-MB-Logo-3rd-Party-RGB.png',
};

const longName = {
	name: 'Commonwealth Bank With an Excessively Long Name for Demonstration Purposes',
	imageUrl: 'https://www.commbank.com.au/content/dam/commbank-assets/cba-stacked.jpg',
};

export const ShortName = Template.bind({});
ShortName.args = {
	dataholder: shortName,
};

export const LongName = Template.bind({});
LongName.args = {
	dataholder: longName,
};
