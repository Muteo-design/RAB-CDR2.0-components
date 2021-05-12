export default {
  template: `
    <div class="d-flex align-items-stretch">
      <div class="rounded-lg border-brand-secondary-3 bg-brand-secondary-4 p-3 w-100">
        <i v-if="connected" class="icon-rab-logo-cdr-brandmark icon-4 float-right mt-n1"/>
        <dataholder-details :dataholder="dataholder" name-class="font-brand-bold text-large text-brand-1 mb-n1" class="mb-4"/>
        <div class="font-brand text-brand-1">
          <div>Connection status</div>
          <slot/>
        </div>
      </div>
    </div>
  `,
  props: {
    dataholder: Object,
    connected: Boolean
  }
};