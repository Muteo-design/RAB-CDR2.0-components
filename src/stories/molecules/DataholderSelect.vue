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
    <tickbox :checked="dataholder.selected" v-on="$listeners"/>
  </label>
</template>

<script>
export default {
  props: ['dataholder'],
};
</script>

<style>
.dataholder-select-wrapper {
  padding: 8px 16px 8px 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #BDBDBD;
  box-sizing: border-box;
  box-shadow: 0px 2px 8px rgba(117, 117, 117, 0.08);
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 15px;
}

.dataholder-select-wrapper:hover {
  background: #fefefe;
  border-color: #015060;
  box-shadow: 0px 2px 4px rgba(117, 117, 117, 0.1), 0px 4px 5px rgba(117, 117, 117, 0.08), 0px 1px 10px rgba(117, 117, 117, 0.12);
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

.dataholder-list-wrapper {
  margin-top: 30px;
  height: 300px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
