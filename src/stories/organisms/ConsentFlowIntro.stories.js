import ConsentFlowIntro from './ConsentFlowIntro';

export default {
  title: 'CDR 2.0/Organisms/ConsentFlowIntro',
  component: ConsentFlowIntro,
  decorators: [() => ({ template: '<div id="cloudcase-form" class="p-4 bg-white"><story/></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConsentFlowIntro },
  template:
    '<consent-flow-intro/>',
});

export const Default = Template.bind({});
Default.args = null;
