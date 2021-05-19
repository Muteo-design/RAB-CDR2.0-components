import ConsentFlow1Dataholders from './ConsentFlow1Dataholders';
import { default as dataholders } from '@/assets/dataholders-connect.json';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow1Dataholders',
	component: ConsentFlow1Dataholders,
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { ConsentFlow1Dataholders },
	template: '<consent-flow-1-dataholders :entered-data="entered"/>',
});

export const Default = Template.bind({});
Default.args = {
	entered: JSON.stringify({ dataholders }),
};
