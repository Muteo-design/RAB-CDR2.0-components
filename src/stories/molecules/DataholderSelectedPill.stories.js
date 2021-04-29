import DataholderSelectedPill from './DataholderSelectedPill.vue';

export default {
  title: 'CDR 2.0/Molecules/DataholderSelectedPill',
  component: DataholderSelectedPill,
  decorators: [() => ({ template: '<div class="rab-cdr"><div class="dataholder-selected-wrapper"><story/></div></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataholderSelectedPill },
  template:
    '<dataholder-selected-pill :dataholder="dataholder"/>',
});

const commBank = {
  name: 'Commonwealth Bank With an Excessively Long Name for Demonstration Purposes',
  image: 'https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg',
};

export const Default = Template.bind({});
Default.args = { dataholder: commBank };
