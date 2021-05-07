<template>
  <div class="d-flex flex-column align-items-center rounded border px-3 pt-4 pb-2 mt-4 text-center">
    <div class="mt-n5 rounded-circle border border-extra-thick bg-white p-2 mb-2">
      <slot/>
    </div>
    <h4 class="mb-1">{{ heading }}</h4>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    heading: String,
    text: String,
  },
  data: function() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>