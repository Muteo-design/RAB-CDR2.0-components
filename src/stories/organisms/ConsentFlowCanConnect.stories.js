import ConsentFlowCanConnect from './ConsentFlowCanConnect';

export default {
  title: 'CDR 2.0/Organisms/ConsentFlowCanConnect',
  component: ConsentFlowCanConnect,
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
      "imageUrl": "https://www.commbank.com.au/content/dam/commbank-assets/cba-stacked.jpg",
    }, {
      "name": "Westpac",
      "imageUrl": "https://www.finder.com.au/niche-builder/5eccc248b8fcb.png",
    }]
  })
};
