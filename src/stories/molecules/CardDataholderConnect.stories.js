import CardDataholderConnect from './CardDataholderConnect';

export default {
  title: 'CDR 2.0/Molecules/CardDataholderConnect',
  component: CardDataholderConnect,
  // decorators: [() => ({ template: '<div class="text-center"><div class="d-inline-block mx-auto"><story/></div></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CardDataholderConnect },
  template:
    '<card-dataholder-connect v-bind="$props"/>',
});

const dataholder = {
  "name": "CommBank",
  "image": "https://www.commbank.com.au/content/dam/commbank-assets/cba-stacked.jpg",
};

export const NoCDR = Template.bind({});
NoCDR.args = { dataholder };

export const HasCDR = Template.bind({});
HasCDR.args = {
  dataholder,
  hasCdr: true,
};
