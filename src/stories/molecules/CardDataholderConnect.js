export default {
  template: `
    <div class="d-flex align-items-stretch">
      <div class="rounded-lg border-light bg-brand-secondary-4 p-3 w-100">
        <i v-if="hasCdr" class="icon-rab-logo-cdr-brandmark icon-4 float-right mt-n1"/>
        <dataholder-details :dataholder="dataholder" name-class="font-brand-bold h5 text-brand-1" class="mb-4"/>
        <div class="font-brand text-brand-copy-1">
          <div>Connection status</div>
          <div>
            <strong v-if="hasCdr">Ready to connect</strong>
            <strong v-else>We cannot connect your data from this bank</strong>
          </div>
          <slot/>
        </div>
      </div>
    </div>
  `,
  props: {
    dataholder: Object,
    hasCdr: Boolean
  }
};