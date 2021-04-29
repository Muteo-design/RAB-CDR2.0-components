import DataholderSelect from '@/components/atoms/DataholderSelect.vue';

export default {
  title: 'CDR 2.0/Atoms/DataholderSelect',
  component: DataholderSelect,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DataholderSelect },
  template:
    '<dataholder-select :dataholder="dataholder"/>',
});

const commBank = {
  name: 'Commonwealth Bank With an Excessively Long Name for Demonstration Purposes',
  image: 'https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg',
};

export const Default = Template.bind({});
Default.args = { dataholder: commBank };

export const Selected = Template.bind({});
Selected.args = {
  dataholder: {
    ...commBank,
    selected: true,
  },
};
