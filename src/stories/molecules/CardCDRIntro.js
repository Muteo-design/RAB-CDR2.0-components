/*
ComponentVue_CardCDRIntro
	[[
		vueJSWidget.registerComponent('card-cdr-intro', {
*/
export default {
	// v0.1.0
	name: 'CardCDRIntro',
	template: `
		<div class="rounded-lg border p-4">
			<i class="icon-rab-logo-cdr float-right d-none d-sm-block mt-n2" :style="{ width: '90px' }"></i>
			<slot></slot>
			<i class="icon-rab-logo-cdr d-block d-sm-none mt-3" :style="{ width: '90px' }"></i>
		</div>
	`,
};
