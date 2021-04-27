import BankSearch from '../components/BankSearch.vue';

export default {
  title: 'CDR 2.0/BankSearch',
  component: BankSearch,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BankSearch },
  template:
    '<bank-search/>',
});

export const Default = Template.bind({});
Default.args = null;
