<template>
  <div class="dataholder-pill">
    <div class="dataholder-pill-details-wrapper">
      <div class="dataholder-pill-image-wrapper">
        <div>
          <img width="44" :src="dataholder.image" class="">
        </div>
      </div>
      <p class="dataholder-pill-name">{{dataholder.name}}</p>
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
import './dataholder-selected-pill.css';

export default {
  props: ['dataholder'],
  methods: {
    deselect: function() {
      this.$emit('deselect');
    }
  }
};
</script>

