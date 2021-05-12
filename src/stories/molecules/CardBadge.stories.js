import CardBadge from './CardBadge';

export default {
  title: 'CDR 2.0/Molecules/CardBadge',
  component: CardBadge,
  argTypes: {
    slotTemplate: {
      table: {
        disable: true
      }
    }
  },
  decorators: [() => ({ template: '<div class="rab-cdr p-4 bg-white col-sm-3"><story/></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CardBadge },
  template: `
    <card-badge v-bind="$props">
      <i class="icon-3 icon-rab-${args.icon}"/>
    </card-badge>
  `
});

export const Convenient = Template.bind({});
Convenient.args = {
  heading: 'Convenient',
  text: 'Say goodbye to manually collecting bank statements. With CDR, we can do it for you',
  icon: 'shield'
};

export const Accurate = Template.bind({});
Accurate.args = {
  heading: 'Accurate',
  text: 'CDR allows us to precisely get the data we need to generate accurate results',
  icon: 'calendar'
};

export const Secure = Template.bind({});
Secure.args = {
  heading: 'Secure',
  text: 'The safety of your data matters most to us. That\'s why we\'re CDR accredited',
  icon: 'clock'
};