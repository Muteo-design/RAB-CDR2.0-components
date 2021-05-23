/*
ComponentVue_DataholderDetails
	[[
		vueJSWidget.registerComponent('dataholder-details', {
*/
export default {
	// v0.4.0
	template: `
		<div class="dataholder-details d-flex align-items-center">
			<div class="flex-none rounded-circle bg-white mr-2" :class="[ small ? 'icon-24' : 'icon-32' ]">
				<div class="w-100 h-100 rounded-circle overflow-hidden position-relative">
					<img :src="dataholder.imageUrl" @load="setBrand($event)" class="center-xy"/>
				</div>
			</div>
			<div class="dataholder-name overflow-text" :class="{ 'h7': small, 'mw-100': !truncate }">{{ dataholder.name }}</div>
		</div>
	`,
	props: {
		dataholder: Object,
		small: Boolean,
		truncate: Boolean,
	},
	data: function() {
		return {
			getAvgRgb: null,
		};
	},
	mounted: function() {
		this.getAvgRgb = function(img) {
			var ctx = document.createElement('canvas').getContext('2d');
			if (typeof img == 'string') {
				var src = img;
				img = new Image;
				img.src = src;
			}
			ctx.imageSmoothingEnabled = true;
			ctx.drawImage(img, 0, 0, 1, 1);
			return ctx.getImageData(0, 0, 1, 1).data.slice(0, 3);
		};
	},
	methods: {
		setBrand: function(event) {
			var image = event.currentTarget;
			var rgb = this.getAvgRgb(image);
			// If colour is too light or too dark, use fallback colour: brand-tertiary-3
			if (((rgb[0] + rgb[1] + rgb[2]) > 715) || (rgb[0] + rgb[1] + rgb[2]) < 50) {
				rgb[0] = 2;
				rgb[1] = 145;
				rgb[2] = 173;
			}
			var rgbString = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
			var parent = image.parentNode.parentNode;
			parent.style.padding = '3px';
			parent.style.boxShadow = 'inset 0 0 0 1.7px ' + rgbString;
		},
	},
};