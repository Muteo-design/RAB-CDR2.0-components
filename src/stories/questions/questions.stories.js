import Questions from './Questions';

export default {
  title: 'Cloudcase/Standard Questions',
  component: Questions,
};

const Template = (args, { argTypes }) => ({
  components: { Questions },
  props: Object.keys(argTypes),
  template: '<questions v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = null;
