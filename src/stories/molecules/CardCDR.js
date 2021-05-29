/*
ComponentVue_CardCDR
	[[
		vueJSWidget.registerComponent('card-cdr', {
*/
export default {
	// v0.4.1
	name: 'CardCDR',
	template: `
		<div class="component-card-cdr rounded border border-light px-2 pb-2 p-sm-3 text-left">
			<div class="d-flex align-items-center pb-1 pb-sm-0">
				<i class="icon-rab-logo-cdr d-sm-none" :style="{ width: '90px' }"></i>
				<i class="icon-rab-logo-cdr d-none d-sm-inline"></i>
				<div class="pt-1 mt-n3 ml-2 ml-sm-4">
					<h5 class="mb-0 mt-4 mt-sm-2 line-height-4 h7 text-sm-h6">Regional Australia Bank</h5>
					<p class="my-0 line-height-4 h9 text-black">Accredited Data Recipient:
						<br class="d-sm-none"/>{{ adrNumber }}
					</p>
				</div>
			</div>
		</div>
	`,
	props: {
		adrNumber: String,
	},
};

