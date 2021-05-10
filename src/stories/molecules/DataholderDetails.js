export default {
  template: `
    <div class="dataholder-details d-flex align-items-center">
      <div class="dataholder-logo flex-none rounded-circle overflow-hidden position-relative mr-2">
        <canvas ref="canvas" width="1px" height="1px"></canvas>
        <div class="rounded-circle overflow-hidden d-flex align-items-center justify-content-center position-relative bg-white" :class="[ small ? 'icon-2' : 'icon-3' ]">
          <img :src="dataholder.image" @load="setBrand($event)" class="border-thick border-white">
        </div>
      </div>
      <div class="dataholder-name overflow-text">{{ dataholder.name }}</div>
    </div>
  `,
  props: {
    dataholder: Object,
    small: Boolean
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