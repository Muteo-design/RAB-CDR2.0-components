<template>
  <div id="fieldset_section_applicant1consent_chooseyourbank" class="sectionheader">
    <legend>{{ legend }}</legend>
    <div id="id_section_applicant1consent_chooseyourbank">
      <div id="question_consentchooseyourbank" cc-panel="consentchooseyourbank" class="questionpanel shownquestionpanel shownquestiontextpanel">
        <div class="questioncontainer fullwidthquestion" cc-type="type-less">
          <div class="questionannotationsandtext">
            <div class="questionannotations"><em>&nbsp;</em></div>
            <div class="questiontext" cc-text="consentchooseyourbank">
              <span>
                <div class="rab-cdr">
                  <slot/>
                </div>
              </span>
            </div>
          </div>
          <div class="questionoutcomecontainer">
            <div class="questionresultcontainer">
              <div cc-result-panel="consentchooseyourbank" class="result_content"></div>
            </div>
            <div class="questionerrorcontainer">
              <div cc-error-panel="consentchooseyourbank" class="error_content"></div>
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
    legend: String
  }
};
</script>
