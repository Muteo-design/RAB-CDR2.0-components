/*
ComponentVue_DataholderPill
	[[
		vueJSWidget.registerComponent('dataholder-pill', {
*/
export default {
	// v0.1.2
	template: `
		<div class="dataholder-pill rounded-pill border-brand-primary-1 bg-white p-2 mr-2 mb-2 mw-100"
			:class="{ 'hover-shadow-2': editing && !disabled }">
			<div class="d-flex align-items-center justify-content-between">
				<dataholder-details :dataholder="dataholder" smallLogo :name-class="nameClass" class="font-body"></dataholder-details>
				<div class="flex-none pl-2">
					<i v-if="editing" @click="$emit('ask-deselect', dataholder)" class="icon-rab-close icon-24 cursor-pointer"></i>
					<i v-else class="icon-24" :class="[ disabled ? 'icon-rab-close-gray' : 'icon-rab-check' ]"></i>
				</div>
			</div>
		</div>
	`,
	props: {
		dataholder: Object,
		disabled: Boolean,
		editing: Boolean,
		dataholderNameClass: String
	},
	computed: {
		nameClass: function() {
			return this.dataholderNameClass + ((this.editing || this.disabled) ? ' mw-100' : '');
		}
	}
};
