<template>
  <div class="dataholder-details">
    <div class="dataholder-logo mr-2">
      <div>
        <img width="44" :src="dataholder.image" @load="setBrand($event)">
      </div>
      <canvas ref="canvas" class="dataholder-logo-canvas" width="1px" height="1px"></canvas>
    </div>
    <p class="dataholder-name mb-0">{{ dataholder.name }}</p>
  </div>
</template>

<script>
export default {
  props: ['dataholder'],
  methods: {
    setBrand: function(event) {
      var canvas = this.$refs['canvas'];
      var ctx = canvas.getContext('2d');
      var image = event.currentTarget;
      ctx.drawImage(image, 0, 0, 1, 1);
    },
  },
};
</script>

<style>
.dataholder-details {
  display: flex;
  align-items: center;
  width: 100%;
}
.dataholder-pill .dataholder-details {
  max-width: calc(100% - 2rem);
}
@media (min-width: 768px) {
  .dataholder-pill .dataholder-details {
    max-width: none;
  }
}
.dataholder-logo,
.dataholder-logo > div {
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.dataholder-logo {
  flex: none;
  padding: 1px;
}

.dataholder-logo > div {
  padding: 2px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: #fff;
}

.dataholder-logo > div > img {
  max-width: 100%;
  height: auto;
}

.dataholder-logo-canvas {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale(200);
}

.dataholder-name {
  font-size: 18px;
  font-family: Karbon;
}
.dataholder-pill .dataholder-name {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 2.8rem;
}
.editing-pills .dataholder-pill .dataholder-name {
  max-width: 100%;
}
@media (min-width: 768px) {
  .dataholder-pill .dataholder-name {
    max-width: 100%;
  }
}
</style>