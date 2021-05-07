<template>
  <div class="rounded border px-3 pt-4 pb-2 my-4 text-center shadow-subtle">
    <div class="mx-auto d-inline-block rounded-circle border border-heavy bg-white mt-n5 mb-2">
      <div class="p-2 m-1">
        <slot/>
      </div>
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