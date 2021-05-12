export default {
  template: `
    <div class="dataholder-pill d-flex align-items-center justify-content-between p-2 bg-white border border-brand-primary-1 rounded-pill mr-1 mb-1 mw-100">
      <dataholder-details :dataholder="dataholder"/>
      <div class="flex-none pl-2">
        <i v-if="editing" @click="deselect" class="icon-rab-close icon-2 cursor-pointer"/>
        <i v-else class="icon-rab-check icon-2"/>
      </div>
    </div>
  `,
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