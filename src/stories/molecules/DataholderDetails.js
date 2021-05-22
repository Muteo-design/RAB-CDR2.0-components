/*
ComponentVue_DataholderDetails
	[[
		vueJSWidget.registerComponent('dataholder-details', {
*/
export default {
	// v0.3.1
	template: `
		<div class="dataholder-details d-flex align-items-center">
			<div class="flex-none rounded-circle border mr-2" :class="[ smallLogo ? 'icon-24' : 'icon-32' ]">
				<div class="w-100 h-100 rounded-circle overflow-hidden position-relative bg-white border-white">
					<img :src="dataholder.imageUrl" @load="setBrand($event)" class="center-xy mw-75"/>
				</div>
			</div>
			<div class="dataholder-name overflow-text" :class="nameClass">{{ dataholder.name }}</div>
		</div>
	`,
	props: {
		dataholder: Object,
		smallLogo: Boolean,
		nameClass: String,
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
			var styleBorder = 'border-color: ' + rgbString + ' !important;';
			// Add box-shadow to emulate 0.5px
			var styleShadow = 'box-shadow: 0 0 1px ' + rgbString +
				',0.25px 0.25px 0 ' + rgbString +
				',-0.25px 0.25px 0 ' + rgbString +
				',-0.25px -0.25px 0 ' + rgbString +
				',0.25px -0.25px 0 ' + rgbString + ';'
			image.parentNode.parentNode.setAttribute('style', styleBorder + styleShadow);
		},
	},
};