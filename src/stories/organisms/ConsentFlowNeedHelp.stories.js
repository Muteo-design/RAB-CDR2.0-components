import ConsentFlowNeedHelp from './ConsentFlowNeedHelp';

export default {
  title: 'CDR 2.0/Organisms/ConsentFlowNeedHelp',
  component: ConsentFlowNeedHelp,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConsentFlowNeedHelp },
  template:
    '<consent-flow-need-help :entered-data="entered"/>',
});

export const Default = Template.bind({});
Default.args = {
  entered: JSON.stringify({
    dataholders: [{
      "name": "ANZ",
      "image": "https://upload.wikimedia.org/wikipedia/commons/c/c2/ANZ-Logo-2009.svg",
    }, {
      "name": "NATIONAL AUSTRALIA BANK",
      "image": "https://www.nab.com.au/etc/designs/nabrwd/clientlibs/images/logo.png",
    }, {
      "name": "Regional Australia Bank",
      "image": "https://www.finder.com.au/global/images/providers/regional-australia-bank-logo-140px.png?fit=1200",
    }],
  }),
};
