import BankSearch from './BankSearch.vue';

export default {
  title: 'CDR 2.0/Molecules/BankSearch',
  component: BankSearch,
  decorators: [() => ({ template: '<div class="rab-cdr"><story/></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BankSearch },
  template:
    '<bank-search/>',
});

export const Default = Template.bind({});
Default.args = null;
