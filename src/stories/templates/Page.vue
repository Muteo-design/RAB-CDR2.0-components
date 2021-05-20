<template>
	<div id="container">
		<div id="cloudcase-progress-and-header-panel">
			<div class="progress">
				<div class="progress-bar"></div>
			</div>
			<div id="header">
				<a id="logo"></a>
				<button class="float-right btn btn-primary save">Save & Exit</button>
				<span class="float-right">1300 132 067</span>
				<svg class="float-right" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M2 9C2 6.61977 2.83103 4.62608 4.22855 3.22855C5.62608 1.83103 7.61977 1 10 1C14.4536 1 18 4.287 18 9V9.75004C18 9.88811 18.1125 10.0017 18.2495 9.98463C19.2363 9.86182 20 9.02011 20 8.00004C20 7.08872 19.3905 6.31976 18.5569 6.07859C17.3823 2.39574 14.0034 0 10 0C7.38023 0 5.12392 0.918973 3.52145 2.52145C2.55115 3.49175 1.83144 4.70177 1.4146 6.08704C0.595648 6.33734 0 7.09911 0 8C0 8.76447 0.428911 9.42876 1.05922 9.76536L1.29551 10.4743C1.49968 11.0868 2.07289 11.4999 2.71854 11.4999H3.99813C4.97766 13.8489 7.29602 15.5 10 15.5C13.5899 15.5 16.5 12.5899 16.5 9C16.5 5.41015 13.5899 2.5 10 2.5C6.41015 2.5 3.5 5.41015 3.5 9C3.5 9.51624 3.56018 10.0184 3.67391 10.4999H2.71854C2.50332 10.4999 2.31225 10.3622 2.2442 10.158L2 9.42543V9ZM4.5 9C4.5 5.96243 6.96243 3.5 10 3.5C13.0376 3.5 15.5 5.96243 15.5 9C15.5 12.0376 13.0376 14.5 10 14.5C7.86262 14.5 6.01 13.2808 5.09966 11.4999H8.13373C8.30662 11.7989 8.62982 12 9 12H10C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10H9C8.6299 10 8.30675 10.2011 8.13383 10.4999H4.70701C4.57216 10.0231 4.5 9.51998 4.5 9Z" fill="#00424D"/>
				</svg>
			</div>
		</div>
		<div style="height:90px"></div>
		<div id="cloudcase-form">
			<div id="cloudcase-form-container">
				<div id="cloudcase-page-navigator">
					<div id="cloudcase-page-navigator-logo">
						<a id="logo"></a>
					</div>
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
	name: 'page',
	created() {
		window.CCExtension = window.CCExtension || {};
		CCExtension.showVueModal = () => {
			document.documentElement.classList.add('show-modal');
		};
		CCExtension.closeVueModal = () => {
			document.documentElement.classList.remove('show-modal');
		};
	},
};
</script>
