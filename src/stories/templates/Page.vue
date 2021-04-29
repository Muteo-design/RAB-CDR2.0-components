<template>
  <div id="container">
    <div id="header">
      <a id="logo"></a>
      <h1>Your Application</h1>
    </div>
    <div id="cloudcase-form">
      <div id="cloudcase-form-container">
        <div id="cloudcase-page-navigator">
          <ul id="cloudcase-page-navigator-unrestricted">
            <li id="navigator_item_BeforeYouGetStarted" class="page_navigator_item" cc-page-id="BeforeYouGetStarted">
              <i class="errorIcon fa fa-warning fa-lg" cc-page-error="BeforeYouGetStarted" title="This page contains errors" style=""></i><a id="navigator_item_BeforeYouGetStarted_link">Before you get started</a>
            </li>
            <li id="navigator_item_Applicant1DetailsPage" class="page_navigator_item" cc-page-id="Applicant1DetailsPage">
              <a id="navigator_item_Applicant1DetailsPage_link">Applicant 1 details</a>
            </li>
            <li id="navigator_item_AffordabilityAssessmentSharingYourData" class="page_navigator_item selected" cc-page-id="AffordabilityAssessmentSharingYourData">
              <a id="navigator_item_AffordabilityAssessmentSharingYourData_link">Affordability Assessment : Sharing Your Data</a>
            </li>
          </ul>
        </div>
        <div id="cloudcase-page-container">
          <div id="page">
            <div id="page-content" class="panel-group">
              <div id="page_Applicant1DataSharing" cc-page-id="Applicant1DataSharing" cc-page-index="4" class="panel panel-default viewed">
                <div class="panel-heading selected">
                  <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#Applicant1DataSharing">Affordability assessment</a></h4>
                </div>
                <div id="Applicant1DataSharing" class="panel-collapse questions collapse in selected" style="">
                  <div class="panel-body">
                    <div class="sections-container">
                      <slot/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page'
};
</script>
