import Accordion from './Accordion';

export default {
	title: 'CDR 2.0/Molecules/Accordion',
	component: Accordion,
};

const Template = (args, { argTypes }) => ({
	components: { Accordion },
	props: Object.keys(argTypes),
	template: `
		<accordion v-bind="$props">
			<div class="h7 px-1">
				<p class="bullet-info text-brand-copy-2">We provide a secure dashboard for you to review and revoke the consent you’ve given. Access it via:</p>
				<p class="bullet-arrow-invert"><a href="#" class="font-weight-bold border-bottom-0">mycdr.regionalaustraliabank.com.au</a></p>
			</div>
		</accordion>
	`,
});

const props = {
	title: 'How to review your consent',
};

export const Default = Template.bind({});
Default.args = props;

export const Open = Template.bind({});
Open.args = {
	...props,
	open: true,
};
