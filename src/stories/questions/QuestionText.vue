<template>
  <question text="This is a text box" cc-name="Q1" cc-type="free-text" cc-style="text-box">
    <template v-slot:content="{ ccName }">
      <input class="form-control cc-listener-attached" type="text" :cc-field="ccName" :cc-disableable="ccName"/>
    </template>
  </question>
</template>

<script>
import Question from '@/stories/templates/Question';

export default {
  components: { Question },
  name: 'question-text',
};
</script>
