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
import QuestionText from './QuestionText';
import QuestionTextarea from './QuestionTextarea';

export default {
  name: 'questions',
  components: { Page, Panel, QuestionText, QuestionTextarea },
};
</script>