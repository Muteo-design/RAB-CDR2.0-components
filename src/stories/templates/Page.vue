<template>
	<div id="container" style="">
		<page-header/>
		<div id="cloudcase-form" style="">
			<mobile-nav/>
			<div id="cloudcase-form-container">
				<navigation/>
				<div id="cloudcase-page-container">
					<div id="page">
						<div id="page-content" class="panel-group">
							<div id="page_LoanRequirements" cc-page-id="LoanRequirements" cc-page-index="1" class="panel panel-default viewed">
								<slot name="top"/>
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
import Header from './Header';
import MobileNav from './MobileNav';
import Navigation from './Navigation';
import PageHeader from '@/stories/templates/Header';

export default {
	name: 'page',
	components: { PageHeader, Header, MobileNav, Navigation },
	props: {
		wide: Boolean,
		currentStep: Number,
		stepCount: Number,
		hideButtons: Boolean,
	},
};
</script>
