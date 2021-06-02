<template>
	<div id="container" style="">
		<header></header>
		<div id="cloudcase-form" style="">
			<div id="cloudcase-form-container">
				<div id="cloudcase-page-navigator">
					<div id="cloudcase-page-navigator-logo"><a id="logo"></a></div>
					<ul id="cloudcase-page-navigator-unrestricted" style="margin-top: 0px;">
						<li id="navigator_item_LoanRequirements" class="page_navigator_item" cc-page-id="LoanRequirements"><i class="errorIcon fa fa-warning fa-lg" cc-page-error="LoanRequirements" title="This page contains errors" style=""></i><a id="navigator_item_LoanRequirements_link">Your new home loan</a></li>
						<li id="navigator_item_Borrower1" class="page_navigator_item" cc-page-id="Borrower1"><a id="navigator_item_Borrower1_link">About Applicant 1</a></li>
						<li id="navigator_item_Applicant1" class="page_navigator_item subpageParent expanded"><a id="Applicant 1_link">Applicant 1</a></li>
						<li id="navigator_item_Borrower1Banks" class="page_navigator_item subpage selected" cc-page-id="Borrower1Banks" style=""><a id="navigator_item_Borrower1Banks_link" cc-prefix="Applicant 1" subpage="Your Banks">Your Banks</a></li>
						<li id="navigator_item_Borrower1ConsentFlow1" class="page_navigator_item subpage" cc-page-id="Borrower1ConsentFlow1" style=""><a id="navigator_item_Borrower1ConsentFlow1_link" cc-prefix="Applicant 1" subpage="Consent">Consent</a></li>
						<li id="navigator_item_Borrower1ConsentFlow9" class="page_navigator_item subpage" cc-page-id="Borrower1ConsentFlow9" style=""><a id="navigator_item_Borrower1ConsentFlow9_link" cc-prefix="Applicant 1" subpage="Test Infoboxes">Test Infoboxes</a></li>
						<li id="navigator_item_Assets" class="page_navigator_item" cc-page-id="Assets"><a id="navigator_item_Assets_link">Assets</a></li>
						<li id="navigator_item_Income" class="page_navigator_item" cc-page-id="Income"><a id="navigator_item_Income_link">Income</a></li>
						<li id="navigator_item_Liability" class="page_navigator_item" cc-page-id="Liability"><a id="navigator_item_Liability_link">Liabilities</a></li>
						<li id="navigator_item_LivingExpenses" class="page_navigator_item" cc-page-id="LivingExpenses"><a id="navigator_item_LivingExpenses_link">Living expenses</a></li>
						<li id="navigator_item_DepositSecurity" class="page_navigator_item" cc-page-id="DepositSecurity"><a id="navigator_item_DepositSecurity_link">Deposit &amp; Security</a></li>
						<li id="navigator_item_Evidence" class="page_navigator_item" cc-page-id="Evidence"><a id="navigator_item_Evidence_link">Your evidence</a></li>
						<li id="navigator_item_Summary" class="page_navigator_item" cc-page-id="Summary"><a id="navigator_item_Summary_link">Ready to go</a></li>
					</ul>
					<ul id="cloudcase-page-navigator-restricted"></ul>
				</div>
				<div id="cloudcase-page-container">
					<div id="page">
						<div id="page-content" class="panel-group">
							<div id="page_LoanRequirements" cc-page-id="LoanRequirements" cc-page-index="1" class="panel panel-default viewed">
								<div v-if="currentStep && stepCount" class="page-pagination" style=""><span>Step {{ currentStep }} of {{ stepCount }}</span></div>
								<div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#LoanRequirements" class="collapsed" aria-expanded="false">Your new home loan</a></h4><i class="errorIcon fa fa-warning fa-lg" cc-page-error="LoanRequirements" title="This page contains errors" style=""></i></div>
								<div id="LoanRequirements" class="panel-collapse questions" aria-expanded="false">
									<div class="panel-body">
										<div class="sections-container">
											<slot/>
										</div>
										<div v-if="!hideButtons" class="buttonPanel">
											<button class="btn btn-primary next disabled">Continue</button>
											<button class="btn btn-default previous ">Previous</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="cloudcase-info-container" :style="[wide && { width: '85px' }]">
							<div attach-to="Borrower1ShowInfoboxQuestion" associated-page="Borrower1ConsentFlow9" class="rab-cdr infobox-desktop rounded-lg info"
								:style="[!wide && { display: 'block'}]">
								<i class="icon-rab-info"></i>
								<div class="mt-2"><strong>Test infobox</strong></div>
								<div class="mt-2">Test text for infobox</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/stories/templates/Header';

export default {
	name: 'page',
	components: { Header },
	props: {
		wide: Boolean,
		currentStep: Number,
		stepCount: Number,
		hideButtons: Boolean,
	},
};
</script>
