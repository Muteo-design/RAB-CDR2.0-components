import ConsentFlow1Dataholders from './ConsentFlow1Dataholders';
import { default as banks } from '@/assets/dataholders-connect.json';

export default {
	title: 'CDR 2.0/Organisms/ConsentFlow1Dataholders',
	component: ConsentFlow1Dataholders,
};

const Template = (args, { argTypes }) => ({
	components: { ConsentFlow1Dataholders },
	props: Object.keys(argTypes),
	template: '<consent-flow-1-dataholders v-bind:entered-data="entered"/>',
});

const dataholders = banks.filter(x => x.CDREnabled);
const nonDataholders = banks.filter(x => !x.CDREnabled);

export const Default = Template.bind({});
Default.args = {
	entered: JSON.stringify({ dataholders, nonDataholders })
};
