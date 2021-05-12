import Icons from './_Icons';

export default {
  title: 'CDR 2.0/Atoms/Icons',
  component: Icons,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icons },
  template:
    '<icons/>',
});

export const Default = Template.bind({});
Default.args = null;
