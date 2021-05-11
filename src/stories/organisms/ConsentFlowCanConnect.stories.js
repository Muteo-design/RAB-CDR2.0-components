import ConsentFlowCanConnect from './ConsentFlowCanConnect';

export default {
  title: 'CDR 2.0/Organisms/ConsentFlowCanConnect',
  component: ConsentFlowCanConnect,
  decorators: [() => ({ template: '<div id="cloudcase-form" class="p-4 bg-white"><story/></div>' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConsentFlowCanConnect },
  template:
    '<consent-flow-can-connect :entered-data="entered"/>',
});

export const Default = Template.bind({});
Default.args = {
  entered: JSON.stringify({
    dataholders: [{
      "name": "CommBank",
      "image": "https://www.commbank.com.au/content/dam/commbank-assets/cba-stacked.jpg",
    }, {
      "name": "Westpac",
      "image": "https://www.finder.com.au/niche-builder/5eccc248b8fcb.png",
    }]
  })
};