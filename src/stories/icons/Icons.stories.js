import Icons from './Icons';

export default {
  title: 'CDR 2.0/IconLibrary',
  component: Icons,
};

const Template = (args, { argTypes }) => ({
  components: { Icons },
  props: Object.keys(argTypes),
  template: '<icons/>',
});

export const Default = Template.bind({});
Default.args = null;
