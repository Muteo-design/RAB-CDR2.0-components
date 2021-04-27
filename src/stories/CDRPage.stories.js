import Page from '../layout/Page.vue';

export default {
  title: 'CDR 2.0/Page',
  component: Page,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Page },
  template:
    '<page/>'
});

export const Default = Template.bind({});
Default.args = null;
