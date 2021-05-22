/*
ComponentVue_DataholderSelect
	[[
		vueJSWidget.registerComponent('dataholder-select', {
*/
export default {
	// v0.1.1
	template: `
		<div class="pb-sm-1">
			<label :tabindex="editing ? -1 : 0"
				class="dataholder-select-wrapper d-flex align-items-center justify-content-between w-100 rounded-lg border hover-border-brand-primary-3 bg-white hover-shadow-2 cursor-pointer p-1 p-sm-2 mb-2">
				<dataholder-details :dataholder="dataholder" name-class="font-brand h5" class="px-1"></dataholder-details>
				<i v-if="editing && dataholder.selected" class="icon-rab-tickbox-close icon-24 m-2"></i>
				<tickbox v-else :checked="dataholder.selected" @update:checked="$emit('update:selected', $event)" class="flex-none"></tickbox>
			</label>
		</div>
	`,
	props: {
		dataholder: Object,
		editing: Boolean,
	},
};
