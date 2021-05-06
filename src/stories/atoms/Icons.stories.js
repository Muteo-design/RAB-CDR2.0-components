import Icons from './_Icons';

export default {
  title: 'CDR 2.0/Atoms/Icons',
  component: Icons,
  decorators: [() => ({ template: '<div class="rab-cdr p-4 bg-white"><story/></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icons },
  template:
    '<icons/>',
});

export const Default = Template.bind({});
Default.args = null;
