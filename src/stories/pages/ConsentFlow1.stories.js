import ConsentFlow1 from './ConsentFlow1';
// import * as BankSelectorStories from '../organisms/BankSelector.stories';

export default {
  title: 'CDR 2.0/Pages/ConsentFlow1of3',
  component: ConsentFlow1,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConsentFlow1 },
  template:
    '<consent-flow1 v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  // bankSelectorEntered: BankSelectorStories.Default.args.entered,
};

