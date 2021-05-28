<template>
  <page>
    <panel legend="Cloudcase Standard Questions" feature-text="These are the standard question widgets available to all rulebooks">
      <question-text/>
      <question-textarea/>
    </panel>
  </page>
</template>

<script>
import Page from '../templates/Page';
import Panel from '../templates/Panel';
import QuestionText from '../templates/QuestionText';
import QuestionTextarea from '../templates/QuestionTextarea';

export default {
  name: 'questions',
  components: { Page, Panel, QuestionText, QuestionTextarea },
};
</script>