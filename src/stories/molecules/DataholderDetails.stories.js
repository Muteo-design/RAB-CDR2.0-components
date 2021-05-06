import DataholderDetails from './DataholderDetails';

export default {
  title: 'CDR 2.0/Molecules/DataholderDetails',
  component: DataholderDetails,
  decorators: [() => ({ template: '<div class="rab-cdr p-4 bg-white"><story/></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataholderDetails },
  template:
    '<dataholder-details :dataholder="dataholder"/>',
});


const shortName = {
  "name": "ANZ",
  "image": "https://www.anz.com.au/content/dam/anzcomau/logos/anz/ANZ-MB-Logo-3rd-Party-RGB.png",
}

const longName = {
  name: 'Commonwealth Bank With an Excessively Long Name for Demonstration Purposes',
  image: 'https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg',
};

export const ShortName = Template.bind({});
ShortName.args = {
  dataholder: { ...shortName },
};

export const LongName = Template.bind({});
LongName.args = {
  dataholder: { ...longName },
};
