/*
ComponentVue_CardBadge
	[[
		vueJSWidget.registerComponent('card-badge', {
*/
export default {
	// v0.2.0
	template: `
		<div class="rounded-lg border px-3 pt-4 pb-3 my-4 text-center shadow-1">
			<div class="mx-auto rounded-circle border-brand-primary-2 border-heavy bg-white content-box icon-48 p-2 mt-n5 mb-2">
				<slot></slot>
			</div>
			<h4 class="mb-1">{{ heading }}</h4>
			<p class="h6">{{ text }}</p>
		</div>
	`,
	props: {
		heading: String,
		text: String,
	},
};