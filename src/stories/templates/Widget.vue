<template>
  <div id="fieldset_section_Applicant1Consent_Chooseyourbank" class="sectionHeader">
    <span class="steps" v-if="currentStep && stepCount">Step {{currentStep}} of {{stepCount}}</span>
    <legend>{{ legend }}</legend>
    <!-- <i class="icon-rab-save"/> -->
    <div id="id_section_Applicant1Consent_Chooseyourbank">
      <div id="question_ConsentChooseYourBank" cc-panel="ConsentChooseYourBank" class="questionPanel shownQuestionPanel shownQuestionTextPanel">
        <div class="questionContainer fullWidthQuestion" cc-type="type-less">
          <div class="questionAnnotationsAndText">
            <div class="questionAnnotations"><em>&nbsp;</em></div>
            <div class="questionText" cc-text="ConsentChooseYourBank">
              <span>
                <slot/>
              </span>
            </div>
          </div>
          <div class="questionOutcomeContainer">
            <div class="questionResultContainer">
              <div cc-result-panel="ConsentChooseYourBank" class="result_content"></div>
            </div>
            <div class="questionErrorContainer">
              <div cc-error-panel="ConsentChooseYourBank" class="error_content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'widget',
  props: {
    legend: String,
    currentStep: Number,
    stepCount: Number
  }
};
</script>
