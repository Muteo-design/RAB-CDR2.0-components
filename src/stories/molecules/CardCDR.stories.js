import CardCDR from './CardCDR';

export default {
  title: 'CDR 2.0/Molecules/CardCDR',
  component: CardCDR,
  decorators: [() => ({ template: '<div class="text-center"><div class="d-inline-block mx-auto"><story/></div></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CardCDR },
  template:
    '<card-cdr v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  adrNumber: 'ADRBNK000001'
};
