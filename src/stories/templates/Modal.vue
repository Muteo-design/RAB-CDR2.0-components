<template>
	<div>
		<div v-if="show" class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons" tabindex="-1" role="dialog"
			style="top: 50%; left: 50%; transform: translateX(-50%)  translateY(-50%); z-index: 101; rgba(0, 0, 0, 0.5) 0px 5px 15px;"
			aria-describedby="showConfirm" aria-labelledby="ui-id-7">
			<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
				<span id="ui-id-7" class="ui-dialog-title">{{ modalData.title }}</span>
				<button type="button" class="ui-dialog-titlebar-close ui-button ui-corner-all ui-widget ui-button-icon-only" @click="$emit('close')">
					<span class="ui-button-icon ui-icon ui-icon-closethick"></span>
					<span class="ui-button-icon-space"></span>
				</button>
			</div>
			<div id="showConfirm" class="ui-dialog-content ui-widget-content" style="width: auto; max-height: none; height: auto;">
				<table class="dialogErrorContainer" style="display:none;"></table>
				<table class="dialogWarningContainer" style="display:none;"></table>
				<div v-html="modalData.template"></div>
			</div>
			<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
				<div class="ui-dialog-buttonset">
					<button v-for="button in modalData.actions" type="button" :id="button.id"
						class="btn btn-primary" :class="'btn-' + button.type" @click="button.callback()">
						{{ button.label }}
					</button>
				</div>
			</div>
		</div>
		<div v-if="show" class="ui-widget-overlay ui-front" style="z-index: 100;"></div>
	</div>
</template>

<script>
export default {
	name: 'Modal',
	props: {
		modalData: Object,
	},
	data() {
		return {
			show: true
		}
	},
	mounted() {
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Esc' || event.key === 'Escape') {
				this.$emit('close');
			}
		})
	},
};
</script>
