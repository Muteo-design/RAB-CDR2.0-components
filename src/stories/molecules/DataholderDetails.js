// ComponentDataholderDetails
// [[
export default/*vueJSWidget.registerComponent('dataholder-details',*/ {
  // v0.1.0
  template: `
    <div class="dataholder-details d-flex align-items-center">
      <div class="dataholder-logo flex-none rounded-circle overflow-hidden position-relative mr-2"
           :class="[ smallLogo ? 'icon-24' : 'icon-32' ]">
        <canvas ref="canvas" width="1px" height="1px"></canvas>
        <div class="w-100 h-100 rounded-circle overflow-hidden position-relative bg-white border-white">
          <img :src="dataholder.image" @load="setBrand($event)" class="center-xy">
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
  methods: {
    setBrand: function(event) {
      var canvas = this.$refs['canvas'];
      var ctx = canvas.getContext('2d');
      var image = event.currentTarget;
      ctx.drawImage(image, 0, 0, 1, 1);
    },
  },
};