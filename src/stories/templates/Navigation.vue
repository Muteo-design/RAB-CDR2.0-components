<template v-once>
	<div class="cloudcase-page-navigator desktop">
		<ul class="cloudcase-page-navigator-unrestricted">
			<li id="navigator_item_LoanRequirements" class="page_navigator_item selected" cc-page-id="LoanRequirements"><a id="navigator_item_LoanRequirements_link">Your new home loan</a><i class="icon icon-rab-" style=""></i></li>
			<ul>
				<li id="navigator_item_Applicant1" class="page_navigator_item subpageParent" cc-page-id="Applicant 1"><a id="Applicant 1_link">Applicant 1</a><i class="icon icon-rab-" style=""></i><i class="chevron icon-rab-chevron-down-lime"></i></li>
				<li id="navigator_item_Borrower1" class="page_navigator_item subpage" cc-page-id="Borrower1" cc-prefix="Applicant 1" subpage="Details" style="display: none;"><a id="navigator_item_Borrower1_link">Details</a><i class="icon icon-rab-" style=""></i></li>
				<li id="navigator_item_Borrower1Banks" class="page_navigator_item subpage" cc-page-id="Borrower1Banks" cc-prefix="Applicant 1" subpage="Your Banks" style="display: none;"><a id="navigator_item_Borrower1Banks_link">Your Banks</a><i class="icon icon-rab-" style=""></i></li>
				<li id="navigator_item_Borrower1ConsentFlow1" class="page_navigator_item subpage paginated-show" cc-page-id="Borrower1ConsentFlow1" cc-prefix="Applicant 1" subpage="Consent" style="display: none;"><a id="navigator_item_Borrower1ConsentFlow1_link">Consent</a><i class="icon icon-rab-" style=""></i></li>
				<li id="navigator_item_Borrower1ConsentFlow2" class="page_navigator_item subpage paginated-hide" cc-page-id="Borrower1ConsentFlow2" cc-prefix="Applicant 1" subpage="Consent" style="display: none;"><a id="navigator_item_Borrower1ConsentFlow2_link">Consent</a><i class="icon icon-rab-" style=""></i></li>
				<li id="navigator_item_Borrower1ConsentFlow3" class="page_navigator_item subpage paginated-hide" cc-page-id="Borrower1ConsentFlow3" cc-prefix="Applicant 1" subpage="Consent" style="display: none;"><a id="navigator_item_Borrower1ConsentFlow3_link">Consent</a><i class="icon icon-rab-" style=""></i></li>
				<li id="navigator_item_Borrower1ConsentFlow9" class="page_navigator_item subpage" cc-page-id="Borrower1ConsentFlow9" cc-prefix="Applicant 1" subpage="Test Infoboxes" style="display: none;"><a id="navigator_item_Borrower1ConsentFlow9_link">Test Infoboxes</a><i class="icon icon-rab-" style=""></i></li>
			</ul>
			<li id="navigator_item_Assets" class="page_navigator_item" cc-page-id="Assets"><a id="navigator_item_Assets_link">Assets</a><i class="icon icon-rab-" style=""></i></li>
			<li id="navigator_item_Income" class="page_navigator_item" cc-page-id="Income"><a id="navigator_item_Income_link">Income</a><i class="icon icon-rab-" style=""></i></li>
			<li id="navigator_item_Liability" class="page_navigator_item" cc-page-id="Liability"><a id="navigator_item_Liability_link">Liabilities</a><i class="icon icon-rab-" style=""></i></li>
			<li id="navigator_item_LivingExpenses" class="page_navigator_item" cc-page-id="LivingExpenses"><a id="navigator_item_LivingExpenses_link">Living expenses</a><i class="icon icon-rab-" style=""></i></li>
			<li id="navigator_item_DepositSecurity" class="page_navigator_item" cc-page-id="DepositSecurity"><a id="navigator_item_DepositSecurity_link">Deposit &amp; Security</a><i class="icon icon-rab-" style=""></i></li>
			<li id="navigator_item_Evidence" class="page_navigator_item" cc-page-id="Evidence"><a id="navigator_item_Evidence_link">Your evidence</a><i class="icon icon-rab-" style=""></i></li>
			<li id="navigator_item_Summary" class="page_navigator_item" cc-page-id="Summary"><a id="navigator_item_Summary_link">Ready to go</a><i class="icon icon-rab-" style=""></i></li>
			<li class="page_navigator_item showMore" style="display: none;"><a>Show more...</a><i class="icon icon-rab-plus-invert"></i></li>
			<li class="page_navigator_item showLess"><a>Show less...</a><i class="icon icon-rab-minus-invert"></i></li>
		</ul>
		<ul class="cloudcase-page-navigator-restricted"></ul>
	</div>
</template>

<script>
export default { name: 'navigation' };
</script>
