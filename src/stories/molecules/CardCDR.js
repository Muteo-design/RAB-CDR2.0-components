export default {
  template: `
    <div class="d-inline-flex align-items-center rounded border-brand-secondary-3 p-3 my-2">
      <div class="mr-3 flex-none">
        <i class="icon-rab-logo-cdr"/>
      </div>
      <div class="text-left">
        <h5 class="my-0 line-height-3">Regional Australia Bank</h5>
        <p class="my-0 h6 line-height-1"><small class="text-brand-1">Accredited Data Recipient: {{ adrNumber }}</small></p>
      </div>
    </div>
  `,
  props: {
    adrNumber: String,
  },
};

