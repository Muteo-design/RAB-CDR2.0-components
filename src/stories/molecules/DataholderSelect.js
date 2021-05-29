
/*
ComponentVue_DataholderSelect
	[[
		vueJSWidget.registerComponent('dataholder-select', {
*/
export default {
	// v0.3.0
	name: 'DataholderSelect',
	template: `
		<div class="pb-sm-1">
			<label :tabindex="editing ? -1 : 0"
				class="dataholder-select-wrapper d-flex align-items-center w-100 rounded-lg border hover-border-brand-primary-3 bg-white hover-shadow-2 cursor-pointer p-1 px-2 py-sm-2 mb-2">
				<div class="pl-sm-1 w-100 pr-4 mr-n5">
					<dataholder-details :dataholder="dataholder" class="overflow-text font-brand h4 ml-sm-2 pr-3"></dataholder-details>
				</div>
				<i v-if="editing && dataholder.selected" class="icon-rab-tickbox-close icon-24 m-2"></i>
				<tickbox v-else :checked="dataholder.selected" @update:checked="$emit('update:selected', $event)" class="ml-auto flex-none"></tickbox>
			</label>
		</div>
	`,
	props: {
		dataholder: Object,
		editing: Boolean,
	},
};
