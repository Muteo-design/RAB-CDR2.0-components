import BankSelect from './BankSelect.vue';
import * as BankSelectorStories from '../organisms/BankSelector.stories.js';

export default {
  title: 'CDR 2.0/Pages/BankSelect',
  component: BankSelect,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BankSelect },
  template:
    '<bank-select v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  bankSelectorEntered: BankSelectorStories.Default.args.entered,
};

