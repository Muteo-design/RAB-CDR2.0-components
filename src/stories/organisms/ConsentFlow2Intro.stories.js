import ConsentFlow2Intro from './ConsentFlow2Intro';

export default {
  title: 'CDR 2.0/Organisms/ConsentFlow2Intro',
  component: ConsentFlow2Intro,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConsentFlow2Intro },
  template:
    '<consent-flow2-intro />',
});

export const Default = Template.bind({});
