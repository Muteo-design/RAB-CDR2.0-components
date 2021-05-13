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
    `<card-dataholder-connect v-bind="$props">${args.slotTemplate || ''}</card-dataholder-connect>`,
});

const dataholder = {
  "name": "CommBank",
  "image": "https://www.commbank.com.au/content/dam/commbank-assets/cba-stacked.jpg",
};

export const NotDataholder = Template.bind({});
NotDataholder.args = {
  dataholder,
  slotTemplate: `<div>This means we will need you to upload statements for accounts held at this bank instead.</div>`
}

export const IsDataholder = Template.bind({});
IsDataholder.args = {
  dataholder,
  hasCdr: true,
};
