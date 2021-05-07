import DataholderSelectedPill from './DataholderSelectedPill';

export default {
  title: 'CDR 2.0/Molecules/DataholderSelectedPill',
  component: DataholderSelectedPill,
  decorators: [() => ({ template: '<div class="rab-cdr"><div class="dataholder-selected-wrapper"><story/></div></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataholderSelectedPill },
  template:
    '<dataholder-selected-pill :dataholder="dataholder" :editing="editing"/>',
});

const commBank = {
  name: 'Commonwealth Bank With an Excessively Long Name for Demonstration Purposes',
  image: 'https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg',
};

export const Selected = Template.bind({});
Selected.args = { dataholder: commBank };

export const Editing = Template.bind({});
Editing.args = {
  dataholder: commBank,
  editing: true,
};
