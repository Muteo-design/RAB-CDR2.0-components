import Page from '@/layout/Page.vue';
import * as BankSelectorStories from '../molecules/BankSelector.stories.js';

export default {
  title: 'CDR 2.0/Pages/Page',
  component: Page,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Page },
  template:
    '<page v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  bankSelectorEntered: BankSelectorStories.Default.args.entered,
};

