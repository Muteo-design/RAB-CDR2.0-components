import ConsentFlow1 from './ConsentFlow1';
import * as ConsentFlowIntro from '../organisms/ConsentFlowIntro.stories';
import * as ConsentFlowCanConnect from '../organisms/ConsentFlowCanConnect.stories';
import * as ConsentFlowNeedHelp from '../organisms/ConsentFlowNeedHelp.stories';

export default {
  title: 'CDR 2.0/Pages/ConsentFlow1',
  component: ConsentFlow1,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConsentFlow1 },
  template:
    '<consent-flow1 v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  consentFlowIntroEntered: ConsentFlowIntro.Default.args.entered,
  consentFlowCanConnectEntered: ConsentFlowCanConnect.Default.args.entered,
  consentFlowNeedHelpEntered: ConsentFlowNeedHelp.Default.args.entered,
};

Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
