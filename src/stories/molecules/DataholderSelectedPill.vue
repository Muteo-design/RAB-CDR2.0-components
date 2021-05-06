<template>
  <div class="dataholder-pill">
    <dataholder-details :dataholder="dataholder"/>
    <div class="dataholder-pill-icon pl-3 pr-2">
      <div v-if="editing" @click="deselect" class="cursor-pointer">
        <icon-close/>
      </div>
      <icon-check v-else/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataholder: Object,
    editing: Boolean
  },
  methods: {
    deselect: function() {
      this.$emit('deselect');
    },
  },
};
</script>

<style>
.dataholder-pill {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 9px;
  background: #FFFFFF;
  border: 1px solid #00424D;
  box-sizing: border-box;
  border-radius: 25px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  flex-shrink: 0;
}

.dataholder-pill-icon {
  flex: none;
}
/*
.dataholder-pill .dataholder-name {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.editing-pills .dataholder-pill .dataholder-name {
  white-space: nowrap;
}
*/
</style>