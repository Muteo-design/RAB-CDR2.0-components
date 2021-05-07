export default {
  props: {
    // Requires a JSON object string
    enteredData: String
  },
  created() {
    if (this.enteredData) {
      this.setEntered();
    }
  },
  methods: {
    setEntered() {
      this.entered = JSON.parse(this.enteredData);
    }
  },
  watch: {
    enteredData() {
      this.setEntered();
    }
  }
}
