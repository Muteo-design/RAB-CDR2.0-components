import Questions from './Questions';

export default {
  title: 'Cloudcase/Standard Questions',
  component: Questions,
};

const Template = (args) => ({
  components: { Questions },
  setup() {
    return { args };
  },
  template: '<questions v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = null;
