/*
ComponentVue_BankSelect
	[[
		vueJSWidget.registerComponent('bank-select', {
*/
export default {
	// v0.4.1
	template: `
		<div class="pb-sm-1">
			<label :tabindex="editing ? -1 : 0"
				class="bank-select-wrapper d-flex align-items-center w-100 rounded-lg border hover-border-brand-primary-3 bg-white hover-shadow-2 cursor-pointer p-1 px-2 py-sm-2 mb-2">
				<div class="pl-sm-1 w-100 mw-0 border-white border-heavy">
					<bank-details :bank="bank" class="overflow-text font-brand h5 ml-sm-2"></bank-details>
				</div>
				<i v-if="editing && bank.selected" class="icon-rab-tickbox-close icon-24 m-2 ml-auto"></i>
				<tickbox v-else :checked="bank.selected" @update:checked="$emit('update:selected', $event)" class="ml-auto"></tickbox>
			</label>
		</div>
	`,
	props: {
		bank: Object,
		editing: Boolean,
	},
};
