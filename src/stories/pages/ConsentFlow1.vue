<template>
  <page>
    <widget legend="Let's fast track your application">
      <p class="text-feature mt-4">The new Consumer Data Right (CDR) makes your home loan application more convenient, accurate and safe. Plus, we can really speed up the process.</p>
      <div class="row">
        <div class="col-md-4">
          <badge heading="Convenient" text="Say goodbye to manually collecting bank statements. With CDR, we can do it for you">
            <icon-shield/>
          </badge>
        </div>
        <div class="col-md-4">
          <badge heading="Accurate" text="CDR allows us to precisely get the data we need to generate accurate results">
            <icon-calendar/>
          </badge>
        </div>
        <div class="col-md-4">
          <badge heading="Secure" text="The safety of your data matters most to us. That's why we're CDR accredited">
            <icon-calendar/>
          </badge>
        </div>
      </div>
    </widget>
  </page>
</template>

<script>
import Page from '../templates/Page.vue';
import Widget from '../templates/Widget.vue';

export default {
  name: 'consent-flow-1',
  components: { Page, Widget },
  props: {
    bankSelectorEntered: String
  }
};
</script>
