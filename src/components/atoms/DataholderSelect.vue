<template>
  <label tabindex="0" class="dataholder-select-wrapper">
    <div class="dataholder-select-details-wrapper">
      <div class="dataholder-select-image-wrapper">
        <div>
          <img width="44" :src="dataholder.image" class="">
        </div>
      </div>
      <p class="dataholder-select-name">{{ dataholder.name }}</p>
    </div>
    <div class="dataholder-select-check">
      <span class="dataholder-select-check-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-bind:class="[selected ? 'd-none' : '']">
          <rect x="0.5" y="0.5" width="23" height="23" rx="4.5" fill="white" stroke="#015060"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" v-bind:class="[selected ? '' : 'd-none']">
          <rect width="24" height="24" rx="5" fill="#016E80"/>
          <path d="M8.42486 12.0186C8.08394 11.6752 7.54847 11.6938 7.22885 12.0601C6.90924 12.4263 6.92651 13.0016 7.26744 13.345L10.652 16.7541C11.0154 17.1201 11.5929 17.0714 11.8986 16.649L17.8217 8.46725C18.1086 8.07094 18.0421 7.49978 17.6732 7.19154C17.3044 6.8833 16.7728 6.95469 16.4859 7.351L11.1325 14.7458L8.42486 12.0186Z" fill="white"/>
        </svg>
        <input type="checkbox" class="d-none" v-model="dataholder.selected">
      </span>
    </div>
  </label>
</template>

<script>
export default {
  props: ['dataholder'],
  computed: {
    selected: function() {
      return this.dataholder.selected;
    },
  },
  watch: {
    selected: function(selection) {
      this.$emit('selected', selection);
    },
  },
};
</script>

<style>
  .d-none {
    display: none !important;
  }
  .dataholder-select-wrapper {
    padding: 8px 16px 8px 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #FDFDFD;
    border: 1px solid #BDBDBD;
    box-sizing: border-box;
    box-shadow: 0px 2px 8px rgba(117, 117, 117, 0.08);
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 15px;
  }
  .dataholder-select-wrapper:hover {
    background: #FAFAFA;
    border: 1px solid #E0E0E0;
  }
  .dataholder-select-details-wrapper {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .dataholder-select-image-wrapper {
    width: 32px;
    height: 32px;
    border: 3px solid #d2d2d2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .dataholder-select-image-wrapper > div {
    min-width: 0;
    overflow: hidden;
  }
  .dataholder-select-image-wrapper > div > img {
    max-width: 100%;
    height: auto;
  }
  .dataholder-select-name {
    margin-bottom: 0 !important;
    line-height: 1 !important;
    padding-left: 12px;
    font-size: 18px;
  }
  .dataholder-select-check {
    width: 24px;
    height: 24px;
  }
  .dataholder-list-wrapper {
    margin-top: 30px;
    height: 300px;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .dataholder-list-wrapper::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 768px) {
    .dataholder-list-wrapper {
      height: 500px;
    }
  }
</style>
