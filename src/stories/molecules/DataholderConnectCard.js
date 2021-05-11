export default {
  template: `
    <div class="dataholder-connect-card col-sm-6 d-flex align-items-stretch mt-4 pb-2">
      <div class="rounded-lg border border-light bg-brand-secondary-four p-3 w-100">
        <i v-if="connected" class="icon-rab-logo-cdr-brandmark icon-4 float-right mt-n1"/>
        <dataholder-details :dataholder="dataholder" class="mb-4"/>
        <div class="font-brand text-dark">
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