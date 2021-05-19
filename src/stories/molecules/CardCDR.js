/*
ComponentVue_CardCDR
	[[
		vueJSWidget.registerComponent('card-cdr', {
*/
export default {
	// v0.1.0
	template: `
		<div class="component-card-cdr rounded border-light px-2 pb-2 p-sm-3 text-left">
			<div class="d-flex align-items-center pb-1 pb-sm-0">
				<i class="icon-rab-logo-cdr"></i>
				<div class="mt-3 mt-sm-0 ml-2 ml-sm-4">
					<h5 class="my-0 line-height-3 h6 text-sm-h5">Regional Australia Bank</h5>
					<p class="my-0 line-height-3 h7 text-sm-h6"><small class="text-dark">Accredited Data Recipient:<br class="d-sm-none"/> {{ adrNumber }}</small></p>
				</div>
			</div>
		</div>
	`,
	props: {
		adrNumber: String,
	},
};

