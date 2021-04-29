<template>
  <div class="dataholder-pill">
    <div class="dataholder-pill-details-wrapper">
      <div class="dataholder-pill-image-wrapper">
        <div>
          <img width="44" :src="dataholder.image" class="">
        </div>
      </div>
      <p class="dataholder-pill-name">{{ dataholder.name }}</p>
    </div>
    <div class="dataholder-pill-deselect" @click="deselect">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.25 1.25L8.75 8.75" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.75 1.25L1.25 8.75" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataholder'],
  methods: {
    deselect: function() {
      this.$emit('deselect');
    },
  },
};
</script>

<style>
.dataholder-selected-heading {
    font-family: Karbon;
    font-style: normal;
    margin-top: 16px;
    font-size: 16px;
    font-weight: 800;
    color: #00424D;
    line-height: 20px !important;
    padding-bottom: 8px !important;
}
.dataholder-selected-wrapper {
    display: flex;
    flex-direction: row;
    overflow-y: scroll;
    overflow-x: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin-right: -1.5rem;
    -webkit-overflow-scrolling: touch;
}
@media (min-width: 768px) {
    .dataholder-selected-wrapper {
        display: flex;
        flex-direction: row;
        overflow-y: none;
        overflow-x: none;
        margin-right: -0;
        flex-wrap: wrap;
    }
}
.dataholder-selected-wrapper::-webkit-scrollbar {
    display: none;
}
.dataholder-pill {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 9px;
    background: #FFFFFF;
    border: 1px solid #00424D;
    box-sizing: border-box;
    border-radius: 25px;
    margin-right: 10px;
    flex-shrink: 0;
    margin-bottom: 10px;
}
.dataholder-pill-details-wrapper {
    display: flex;
    align-items: center;
}
.dataholder-pill-image-wrapper {
    width: 32px;
    height: 32px;
    border: 3px solid #d2d2d2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.dataholder-pill-image-wrapper > div {
    min-width: 0;
    overflow: hidden;
}
.dataholder-pill-image-wrapper > div > img {
    max-width: 100%;
    height: auto;
}
.dataholder-pill-name {
    font-size: 10px;
    line-height: 20px !important;
    margin-bottom: 0 !important;
    padding: 0 12px;
}
.dataholder-pill-deselect {
    width: 24px;
    height: 24px;
    background: #015060;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>