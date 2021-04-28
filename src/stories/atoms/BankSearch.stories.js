import BankSearch from '@/components/atoms/BankSearch';

export default {
  title: 'CDR 2.0/Atoms/BankSearch',
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
