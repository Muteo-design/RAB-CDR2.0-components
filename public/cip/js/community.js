/********************************************************************************************************/
/**** @CC Skin: Cloudcase Platform Rendering Engine skin behaviour based on v13_0                    ****/
/********************************************************************************************************/

if (!this.cip_Entity) {
    this.cip_Entity = {};
}
if (!this.cc_EntityIntegration) {
    this.cc_EntityIntegration = {};
}
if (!this.cip_Custom) {
    this.cip_Custom = {};
}

(function () {
	"use strict";
	
	/********************************************************************************************************/
	/**** @CC This is the default direct to customer behaviour                                           ****/
	/**** @CC From: /cloudcase-integration-platform-resources/profiles/webapp/js/cloudcase.js            ****/
	/********************************************************************************************************/
	
	cip_Entity.clientHomePageUrl = "https://www.cloudcase.net";
	cip_Entity.previousSelectedPageId = null;
	cip_Entity.hasSubmitted = false;
	
	cip_Entity.createNextButtonText = function(entityName, formId, isFirstPageSelected, isLastNonRestrictedPageSelected, isReadyToFinish, isInterviewComplete, treatInterviewAsCompletedOnLoad){
		var text = null;

		var nextText = formId == "personalcredit" ? "Continue" : "Next";

		if(isInterviewComplete == false){
			if(isLastNonRestrictedPageSelected == true && isReadyToFinish == true){
				text = 'Submit';
			}else{
				text = nextText;
			}
		}else{
			text = nextText;
		}

		return text;
	};
	
	cip_Entity.createPreviousButtonText = function(entityName, formId, isFirstPageSelected, isLastNonRestrictedPageSelected, isReadyToFinish, isInterviewComplete, treatInterviewAsCompletedOnLoad){
		var text = null;
		
		if(isFirstPageSelected == false){
			text = 'Previous';
		}

		if (text !== null && (formId == "personalcredit" || formId == "mortgage_cdr_merge")) {
			text = "Back";
		}

		return text;
	};
	
	cip_Entity.createSaveButtonText = function(entityName, formId, isFirstPageSelected, isLastNonRestrictedPageSelected, isReadyToFinish, isInterviewComplete, treatInterviewAsCompletedOnLoad){
		
		if (formId == "personalcredit" || formId == "mortgage_cdr_merge") {
			return "Exit and Save";
		}
		return 'Continue Later';
	};
	
	cip_Entity.showApplicationSaveAsDialog = function(entityName, formId, application){
		cc_UI.createSimpleDialog({
			id : cc_SaveAsDialog.id(),
			title : cc_SaveAsDialog.title(),
			content : cc_SaveAsDialog.content(),
			width : cc_SaveAsDialog.width(),
			okText : cc_SaveAsDialog.okText,
			firstOpen : function () {
				if(application.customers && application.customers.length > 0){
					var primaryCustomer = application.customers[0];
					
					cc_SaveAsDialog.populate({
						email : primaryCustomer.email,
						mobilePhoneNumber : primaryCustomer.mobilePhoneNumber
					});
				}
			},
			ok : function () {
				var saveAs = cc_SaveAsDialog.unpopulate();
				
				var validateSaveAs = function(saveAs){
					var email = saveAs.email;
					var mobilePhoneNumber = saveAs.mobilePhoneNumber;
					
					var errors = [];
					
					// email address validator
					if(email){
						var emailExpression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					 	if(emailExpression.test(email) == false) {
					 		errors.push({description: encodeURIComponent(saveAs.email) + ' is not a valid email address'});
					 	}
					}else{
						errors.push({description: 'an email address is required'});
					}
					
					// mobile phone number validator
				 	if(mobilePhoneNumber){
				 		var mobilePhoneExpression = /^04\d{8}$/;
				 		mobilePhoneNumber = mobilePhoneNumber.replace(/ /g,'').replace('+61', '0');
				 		
					 	if(mobilePhoneExpression.test(mobilePhoneNumber) == false) {
					 		errors.push({description: encodeURIComponent(saveAs.mobilePhoneNumber) + ' is not a valid mobile phone number'});
					 	}
				 	}else{
				 		errors.push({description: 'a mobile phone number is required'});
				 	}
					
					return errors;
				};
				
				var errors = validateSaveAs(saveAs);
				
				if(errors.length === 0){
					cc_EntityIntegration.saveUnsubmittedApplicationToCompleteLater(cc_Config.applicationId, saveAs.email, saveAs.mobilePhoneNumber, function(){
						cc_UI.showNotificationDialog(
							"Your application has been saved.<br><br>" + 
							"Instructions on how to continue this application have been sent to your email address.", 
							"Application Saved", function(){
								if (formId == "homeloan" || formId == "mortgage") {
									window.location.href = cip_Custom.clientContinueLaterPage_Url;
								} else {
									window.location.href = cip_Entity.clientHomePageUrl;
								}
							}, 450
						);
					});
				}else{
					cc_UI.attachErrorsToDialog(cc_SaveAsDialog.id(), errors);
				}
			}
		});
	};
	
	cip_Entity.showSendSmsCodeDialog = function(entityName, formId, data, successCallback){
		cc_UI.createSimpleDialog({
			id : cc_SendSmsCodeDialog.id(),
			title : cc_SendSmsCodeDialog.title(),
			content : cc_SendSmsCodeDialog.content(data),
			width : cc_SendSmsCodeDialog.width(),
			okText : cc_SendSmsCodeDialog.okText,
			closable : false,
			ok : function () {
				$("#" + cc_SendSmsCodeDialog.id()).dialog('close').hide();
				successCallback();
			}
		});
	};
	
	cip_Entity.showActivateUsingSmsCodeDialog = function(entityName, formId, data){
		var resendButtonText = "Resend SMS Activation Code";
		
		cc_UI.createSimpleDialog({
			id : cc_ActivateUsingSmsCodeDialog.id(),
			title : cc_ActivateUsingSmsCodeDialog.title(),
			content : cc_ActivateUsingSmsCodeDialog.content(data),
			width : cc_ActivateUsingSmsCodeDialog.width(),
			okText : cc_ActivateUsingSmsCodeDialog.okText,
			closable : false,
			firstOpen : function(){
				$("button:contains(" + resendButtonText + ")").addClass("btn-default").removeClass("btn-primary");
			},
			ok : function () {
				var activateUsingSmsCode = cc_ActivateUsingSmsCodeDialog.unpopulate();
				
				cc_EntityIntegration.activateApplicantSessionUsingSmsCode(activateUsingSmsCode.smsCode);
			},
			additionalButtons : [{
				text : resendButtonText,
				action : function(){
					cc_EntityIntegration.sendApplicantSessionActivationSmsCode(function(){
						$("button:contains(" + resendButtonText + ")").hide(); // only allow one resend
						cc_UI.showNotificationDialog("An activation code has been resent to your mobile phone.", "Sent SMS Activation Code");
					});
				}
			}]
		});
	};
	
	cip_Entity.handleUnavailableApplicantSession = function(entityName, formId){
		cc_UI.createSimpleDialog({
			id : "unavailableApplicantSessionDialog",
			title : "Unauthorised Access",
			content : "",
			width: 450, 
			closable: false,
			firstOpen: function(){
				cc_UI.attachErrorToDialog("unavailableApplicantSessionDialog", 
					"You are not allowed to access this page."
				);
			},
			ok: function() {
				window.location.href = cip_Entity.clientHomePageUrl;
			}
		});
	};
	
	cip_Entity.handleInvalidApplicantSmsCode = function(entityName, formId, data){
		var message = null;
		if(data && data.tooManyFailedAttempts === 'true'){
			message = 'Too many failed attempts, please try again in a few minutes.';
		}else{
			message = 'You have entered an invalid activation code. Please check for any mistakes and try again.';
		}
		
		cc_UI.showErrorDialog(message, 'Invalid SMS Activation Code');
	};
	
	cip_Entity.onCleanAndRefresh = function(entityName, formId, application){
		var title = null;

		if(formId == "homeloan" || formId == "mortgage"){
			title = 'Apply for Home Loan';
		}else if(formId == "savingsaccount"){
			title = 'Apply for Personal Account';
		}else if(formId == "businessaccount"){
			title = 'Apply for Business Account';
		}else if(formId == "carloan"){
			title = 'Apply for Car Loan';
		}else if(formId == "lifeinsurance"){
			title = 'Apply for Life Insurance';
		}else if(formId == "creditcard"){
			title = 'Apply for Credit Card';
		}else if(formId == "creditcard_b"){
			title = 'Apply for Credit Card';
		}else if(formId == "personalloan"){
			title = 'Apply for Personal Loan';
		}else if(formId == "personalloan_b"){
			title = 'Apply for Personal Loan';
		}else if(formId == "businessoverdraft"){
			title = 'Apply for Business Overdraft';
		}else if(formId == "ccinsurance"){
			title = 'Apply for Consumer Credit Insurance';
		}else if(formId == "personalcredit"){
			title = 'Your Application';
		}

		if(title){
			$("#header").append('<h1>' + title + '</h1>');
		}
	};

	cip_Entity.onPreRendering = function(entityName, formId, application){
		var redirectToProgressScreen = function(){
			window.location.href = cip_Entity.clientHomePageUrl;
		};

		if(cc_Model.isInterviewComplete == true){
			if(cc_Config.applicationId){
				// application was just submitted in the previous request
				cc_UI.showNotificationDialog("Application has been submitted", "Application Submitted", redirectToProgressScreen);
			}else{
				cc_UI.showNotificationDialog("Application has already been submitted", "Application Previously Submitted", redirectToProgressScreen);
			}
		}

		// sticky page nav bar
		if($('#cloudcase-progress-and-header-panel').length === 0){
			$('.cloudcase-skin #header').remove();
			$('.cloudcase-skin').prepend(
				'<div id="cloudcase-progress-and-header-panel">' +
					'<div class="progress">' +
						'<div class="progress-bar"></div>' +
					'</div>' +
					'<div id="header">' +
						'<a id="logo"></a>' +
						'<div class="buttonPanel">' +
							'<button class="buttonPanel float-right btn btn-primary save">Save & Exit</button>' +
						'</div>' +
						'<span class="float-right"><a href="tel:1300132067"><b>1300 132 067</b></a></span>' +
						'<svg class="float-right" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
							'<path fill-rule="evenodd" clip-rule="evenodd" d="M2 9C2 6.61977 2.83103 4.62608 4.22855 3.22855C5.62608 1.83103 7.61977 1 10 1C14.4536 1 18 4.287 18 9V9.75004C18 9.88811 18.1125 10.0017 18.2495 9.98463C19.2363 9.86182 20 9.02011 20 8.00004C20 7.08872 19.3905 6.31976 18.5569 6.07859C17.3823 2.39574 14.0034 0 10 0C7.38023 0 5.12392 0.918973 3.52145 2.52145C2.55115 3.49175 1.83144 4.70177 1.4146 6.08704C0.595648 6.33734 0 7.09911 0 8C0 8.76447 0.428911 9.42876 1.05922 9.76536L1.29551 10.4743C1.49968 11.0868 2.07289 11.4999 2.71854 11.4999H3.99813C4.97766 13.8489 7.29602 15.5 10 15.5C13.5899 15.5 16.5 12.5899 16.5 9C16.5 5.41015 13.5899 2.5 10 2.5C6.41015 2.5 3.5 5.41015 3.5 9C3.5 9.51624 3.56018 10.0184 3.67391 10.4999H2.71854C2.50332 10.4999 2.31225 10.3622 2.2442 10.158L2 9.42543V9ZM4.5 9C4.5 5.96243 6.96243 3.5 10 3.5C13.0376 3.5 15.5 5.96243 15.5 9C15.5 12.0376 13.0376 14.5 10 14.5C7.86262 14.5 6.01 13.2808 5.09966 11.4999H8.13373C8.30662 11.7989 8.62982 12 9 12H10C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10H9C8.6299 10 8.30675 10.2011 8.13383 10.4999H4.70701C4.57216 10.0231 4.5 9.51998 4.5 9Z" fill="#00424D"/>' +
						'</svg>' +
					'</div>' +
				'</div>' +
				'<div style="height:90px"></div>'
			).find('.progress').affix({offset:{top:0}});
		}
		
		if($('#cloudcase-page-navigator-logo').length === 0){
			$('#cloudcase-page-navigator').prepend(
				'<div id="cloudcase-page-navigator-logo">' +
					'<a id="logo"></a>' + 
				'</div>'
			);
		}
	};
	
	cip_Entity.onPostRendering = function(entityName, formId, application){
		$('.page_navigator_item a:contains(\()').not('[data-post-rendered]').html(function () {
			return $(this).attr('data-post-rendered', 'true').html().replace("(", "<br>("); 
		});
	};
	
	cip_Entity.onPreFindingsAssessment = function(entityName, formId, application, continuation){
		cc_UI.showConfirmDialog('Would you like to submit application?', function () {
			continuation();
		}, null, 'Application Complete');
	};
	
	cip_Entity.onPostFindingsAssessment = function(entityName, formId, application){
		var message = null;
		if(application.stageId === 'Accepted'){
			message = 'Your application has been accepted.';
				
		}else if(application.stageId === 'ConditionalApproval'){
			message = 'Your application has been conditionally approved.';
				
		} else {
			if (formId === "hardship") {
				message = 'Your application has been submitted and one of our friendly Hardship Specialists will be in touch shortly.';
			} else {
				message = 'Your application has been submitted and one of our friendly Lending Specialists will be in touch shortly.';
			}
		}

		var loanAmount = null;
		var vedaScore = null;
		var productIneligibleContactRequest = null;
		var vedascoreFailQuestion = null;
		var productEligibility = null;
		var recommendation = null;
		var loanPurpose = null;
		var mid = null;

		$.each(application.monitoredQuestions, function(){
			if(this.id == "iRequestedCreditLimit"){
				loanAmount = this.answer;
			} else if(this.id == "OfficeUseIndividual1VedaScore"){
				vedaScore = this.answer;
			} else if(this.id == "ProductIneligibleContactRequest"){
				productIneligibleContactRequest = this.answer;
			} else if(this.id == "VedascoreFailQuestion"){
				vedascoreFailQuestion = this.answer;
			} else if(this.id == "iProductEligibility"){
				productEligibility = this.answer;
			} else if(this.id == "LoanPurpose"){
				loanPurpose = this.answer;
			} else if(this.id == "iRecommendation"){
				recommendation = this.answer;
			} else if(this.id == "MarketoId"){
				mid = this.answer;
			}

		});

		if(dataLayer){
			if(loanAmount){
				dataLayer.push({
					'event' : 'Form.Interaction',
					'eventCategory': cc_Config.rulebookName,
					'eventAction' : 'Submission',
					'eventLabel' : application.stageId,
					'eventValue' : loanAmount
				});
			}
		}
		
		cip_Entity.hasSubmitted = true;
		
		cc_UI.showNotificationDialog(message, "Application Submitted", function() {
			if (formId == "personalloan" || formId == "personalloan_b") {
				if (loanPurpose == "Buy a vehicle") {
					if (vedaScore >= 600) {
						window.location.href = "https://www.regionalaustraliabank.com.au/thank-you/apply-202-cl";
					} else if (vedaScore >= 550 && vedaScore < 600) {
						window.location.href = "https://www.regionalaustraliabank.com.au/thank-you/apply-203-cl";
					} else {
						window.location.href = "https://www.regionalaustraliabank.com.au/thank-you/apply-403-cl";
					}
				} else {
					if (vedaScore >= 600) {
						window.location.href = cip_Custom.clientSubmitPage_PersonalLoan_202_Url;
					} else if (vedaScore >= 550 && vedaScore < 600) {
						window.location.href = cip_Custom.clientSubmitPage_PersonalLoan_203_Url;
					} else {
						window.location.href = cip_Custom.clientSubmitPage_PersonalLoan_403_Url;
					}
				}
			} else if (formId == "creditcard" || formId == "creditcard_b") {
				if (vedaScore >= 600) {
					window.location.href = cip_Custom.clientSubmitPage_CreditCard_202_Url;
				} else if (vedaScore >= 550 && vedaScore < 600) {
					window.location.href = cip_Custom.clientSubmitPage_CreditCard_203_Url;
				} else {
					window.location.href = cip_Custom.clientSubmitPage_CreditCard_403_Url;
				}
			} else if (formId == "homeloan" || formId == "mortgage" && mid) {
			//	window.location.href = "https://www.regionalaustraliabank.com.au/" + mid;
				window.location.href =  cip_Custom.clientSubmitPage_HomeLoan_202_Url + "?mid=" + mid;
			} else if (formId == "personalcredit") {
				window.location.href = cip_Custom.clientSubmitPage_PersonalCredit_202_Url;
			} else if (formId == "hardship") {
				window.location.href = cip_Custom.clientSubmitPage_Hardship;
			} else {
				window.location.href = cip_Entity.clientHomePageUrl;
			}
		});
	};
	
	cip_Entity.onPostFindingsReassessment = function(entityName, formId, application){
	};
	
	cip_Entity.onPreGetQuestions = function (entityName, formId, application, task) {
		if(cc_Model.selectedPage && task && task.isUserDriven && dataLayer){
			dataLayer.push({
			   'event': 'Form.Interaction',
			   'eventCategory': cc_Config.rulebookName,
			   'eventAction': 'Get Questions',
			   'eventLabel': cc_Model.selectedPage.id + ' > '+ task.triggerType.replace('_', ' ')
			});
		}
	};
	
	cip_Entity.onPostChangedEnteredValue = function(entityName, formId, application, question, updatedEnteredValue){
		if(dataLayer){
			if(updatedEnteredValue.length > 0){
				dataLayer.push({
					'event': 'Form.Interaction',
					'eventCategory': cc_Config.rulebookName,
					'eventAction': 'Question Answered',
					'eventLabel': cc_Model.selectedPage.id + ' > ' + question.id
				});

			}else if(updatedEnteredValue.length === 0){
				dataLayer.push({
					'event': 'Form.Interaction',
					'eventCategory': cc_Config.rulebookName,
					'eventAction': 'Question Cleared',
					'eventLabel': cc_Model.selectedPage.id + ' > ' + question.id
				});
			}
		}
	};
	
	cip_Entity.onPostShowPage = function (entityName, formId, application, page) {
		cip_Custom.addCollapsibleNavigation();
		if(cip_Entity.previousSelectedPageId != page.id){
			if(ga){
				ga('send', {
					hitType: 'pageview',
					page: '/virtual/' + cc_Config.rulebookName + '/' + page.id
				});
			}


			cip_Entity.previousSelectedPageId = page.id;
		}
	};
	
	cip_Entity.init = function(){
		// load google analytics
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-68616821-1', 'auto');
			ga('send', 'pageview');

	  // load google tag manager
	  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-PN97M8');

	  if(window.addEventListener){
		  window.addEventListener('beforeunload', function() {
			  if (cip_Entity.hasSubmitted == false && cc_Config.applicationId && cc_Config.rulebookName && cc_Model.selectedPage && dataLayer) {
				  dataLayer.push({
					  'event' : 'Form.Interaction',
					  'eventCategory': cc_Config.rulebookName,
					  'eventAction' : 'Abandonment',
					  'eventLabel' : cc_Model.selectedPage.id
				  });
			  }
		  });
	  }
	};
	
	/********************************************************************************************************/
	/**** @CC This is the default direct to customer integration                                         ****/
	/**** @CC From: /cloudcase-integration-platform-resources/profiles/webapp/js/cloudcase.js            ****/
	/********************************************************************************************************/

	cc_Config.interviewButtonOptions = {
		showOnTop : false
	};

	cc_EntityIntegration.createDefaultScreen = function () {
		return 	'<div id="cloudcase-form-container">' +
					'<div id="cloudcase-page-navigator">' +
						'<ul id="cloudcase-page-navigator-unrestricted"></ul>' +
						'<ul id="cloudcase-page-navigator-restricted"></ul>' +
					'</div>' +
					'<div id="cloudcase-page-container">' +
						'<div id="page">' +
							'<div id="page-content" class="panel-group"></div>' +
							'<div id="cloudcase-info-container">' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
	};
	
	cc_EntityIntegration.getQuestions = function (allowFindingsGeneration, task, callback) {
		if(cip_Entity.onPreGetQuestions){
			cip_Entity.onPreGetQuestions(cip_Common.brandId, cip_Common.formId, cc_Config.application, task);
		}
		
		cc_Ajax.serialRequest({ 
			url: cip_Common.toApplicationUrl() + '/' + cc_Config.applicationId + '/interview/edit',
			type: 'POST',
			throbberDelay: task && task.isUserDriven === false  ? 10000 : 800,
			data : function(){
				return {
					answeredQuestions : cc_Util.stringify(cc_Renderer.dettachQuestions(), cc_Config.uploadCompression.answeredQuestions),
					allowFindingsGeneration : allowFindingsGeneration
				}
			},
			cleanSkippedResponse: function(response){				
				if(response && response.selectedApplication && response.selectedApplication.detail && response.selectedApplication.detail.interview){
					response.selectedApplication.detail.interview.findingsRegenerated = false;
				}
			},
			handle: function (response) { 
				if(response.unexpectedOutcome){
					cip_Common.handleUnexpectedOutcome(response);

				}else{
					cc_Model.isInterviewComplete = false;
					
					if(response && response.selectedApplication && response.selectedApplication.detail){
						cc_Model.isInterviewComplete = response.selectedApplication.detail.submissionStatus == "SUBMISSION_COMPLETE";
					}
					
					var interview = null;
					
					if (response.selectedApplication){
						cc_Config.application = response.selectedApplication.detail;
						cc_Config.workflowName = cc_Config.application.workflowName;
						cc_Config.rulebookName = cc_Config.application.rulebookName;
						cc_Config.rulebookVersion = cc_Config.application.rulebookVersion;
						cc_Config.serverVersionOnRulebookSave = cc_Config.application.interview.serverVersionOnRulebookSave;
						
						interview = cc_Config.application.interview;
					}
	
					cc_Controller.handleGetQuestionResponse(interview, task, callback);	
					
					if(task && task.triggerType === "SAVE"){
						cip_Entity.showApplicationSaveAsDialog(cip_Common.brandId, cip_Common.formId, cc_Config.application);
					}
				}
			}
		});
	};
	
	cc_EntityIntegration.addDocumentToQuestion = function (applicationId, questionId, form) {
		var options = { 
			type: 'POST',
			data: {},
			useShortThrobberKey: true,
			url: cip_Common.toApplicationUrl() + '/' + applicationId + '/add/question/' + questionId + '/document',
			handle: function (response) { 
				if(response.unexpectedOutcome){
					cip_Common.handleUnexpectedOutcome(response);

				}else{
					if (response.invalidInputs && response.invalidInputs.length > 0) {
						// only show the first error if there is more than one
						cc_Renderer.attachError(questionId, response.invalidInputs[0].description, "server");
					}else{
						var task = {
							triggerType : "ADD_DOCUMENT",
							manuallySelectedPageId : null,
							enableMoveToRelativePage : false,
							isUserDriven : false,
							focusedQuestionId : cc_UI.getFocusedQuestionId()
						};
						
						cc_Controller.handleResponse(response.selectedApplication.detail.interview, task);
					}
				}
			}
		};
		
		// we need to add manually since form.ajaxSubmit does not used the
		// $.ajaxSetup defaults
		options = $.extend({}, cc_Ajax.defaults, options);
		
		// increase timeout for slow internet connections
		options.timeout = 1000 * 60 * 5; // 5 mins;
		
		form.ajaxSubmit(options); 
	};
	
	cc_EntityIntegration.removeDocumentFromQuestion = function (applicationId, questionId, documentId, successCallback) {
		cc_Ajax.serialRequest({ 
			url: cip_Common.toApplicationUrl() + '/' + applicationId + '/delete/question/' + questionId + '/document/' + documentId,
			type: 'POST',
			data: {},
			handle: function (response) { 
				if(response.unexpectedOutcome){
					cip_Common.handleUnexpectedOutcome(response);

				}else{
					var task = {
						triggerType : "REMOVE_DOCUMENT",
						manuallySelectedPageId : null,
						enableMoveToRelativePage : false,
						isUserDriven : false,
						focusedQuestionId : cc_UI.getFocusedQuestionId()
					};
					cc_Controller.handleResponse(response.selectedApplication.detail.interview, task);
				}
			}
		}); 
	};
	
	cc_EntityIntegration.saveUnsubmittedApplicationToCompleteLater = function (applicationId, email, mobilePhoneNumber, successCallback) {
		$.ajax({ 
			url: cip_Common.toApplicationUrl() + '/' + applicationId + '/save/completelater',
			type: 'POST',
			data: {
				email : email,
				mobilePhoneNumber : mobilePhoneNumber,
			},
			handle: function (response) { 
				if(response.unexpectedOutcome){
					cip_Common.handleUnexpectedOutcome(response);

				}else{
					successCallback(response);
				}
			}
		}); 
	};
	
	cc_EntityIntegration.sendApplicantSessionActivationSmsCode = function (successCallback) {
		$.ajax({ 
			url: cip_Common.toApplicationUrl() + '/authentication/sms/send',
			type: 'POST',
			data: {},
			handle: function (response) { 
				if(response.unexpectedOutcome){
					cip_Common.handleUnexpectedOutcome(response);

				}else{
					successCallback(response);
				}
			}
		}); 
	};
	
	cc_EntityIntegration.activateApplicantSessionUsingSmsCode = function (smsCode, successCallback) {
		$.ajax({ 
			url: cip_Common.toApplicationUrl() + '/authentication/sms/activate',
			type: 'POST',
			data: {
				smsCode : smsCode
			},
			handle: function (response) { 
				if(response.unexpectedOutcome){
					cip_Common.handleUnexpectedOutcome(response);

				}else{
					window.location.reload();
				}
			}
		}); 
	};
	
	cc_EntityIntegration.getSearchDataSourceResults = function (dataSourceReference, searchValue, successCallback) {
		$.ajax({
			type: 'POST',
			url: cip_Common.toApplicationUrl() + '/' + cc_Config.applicationId + '/datasource/search',
			throbber: false,
			data: {
				workflowName : cc_Config.workflowName, 
				rulebookName : cc_Config.rulebookName, 
				dataSourceReference : cc_Util.stringify(dataSourceReference),
				search : searchValue
			},
			handle: function(response){
				if(response.unexpectedOutcome){
					cip_Common.handleUnexpectedOutcome(response);

				}else{
					successCallback(response);
				}
			}
		});
	};
	
	cc_EntityIntegration.startApplication = function (successCallback, parameters) {
		var initialQuestionStates = [];
		
		var urlParameters = parameters ? parameters : cc_Util.getUrlVars();
		if(urlParameters){
		    $.each(urlParameters, function(){	
		    	var value = urlParameters[this] != null ? urlParameters[this].split("|") : null; // FirstName=Bill%7Ctrue

		    	if(value){
			    	var initialQuestionState = {
			    		id : this
			    	};
			    		    	
			        if(value[0]){
			        	initialQuestionState.entered = value[0].split(",");
			        }
			        
			        if(value[1]){
			        	initialQuestionState.disabled = (value[1] === "true");
			        }
			        
			        initialQuestionStates.push(initialQuestionState);
		    	}
		    });
		}
		
		cc_Ajax.serialRequest({ 
			url: cip_Common.toApplicationFormUrl(cip_Common.formId) + '/interview/start',
			type: 'POST',
			throbberDelay: 0,
			data : function(){
				return {
					initialQuestionStates : JSON.stringify(initialQuestionStates)
				}
			},
			handle: function (response) { 
				if(response.unexpectedOutcome){
					cip_Common.handleUnexpectedOutcome(response);

				}else{
					successCallback.call(response);
				}
			}
		}); 
	};
	
	cc_EntityIntegration.createPreviousButtonText = function(isFirstPageSelected, isLastNonRestrictedPageSelected, isWritableRestrictedPageSelected, isReadyToFinish, isInterviewComplete){
		return cip_Entity.createPreviousButtonText(cip_Common.brandId, cip_Common.formId, isFirstPageSelected, isLastNonRestrictedPageSelected, isReadyToFinish, isInterviewComplete);
	};
	
	cc_EntityIntegration.createNextButtonText = function(isFirstPageSelected, isLastNonRestrictedPageSelected, isWritableRestrictedPageSelected, isReadyToFinish, isInterviewComplete){
		return cip_Entity.createNextButtonText(cip_Common.brandId, cip_Common.formId, isFirstPageSelected, isLastNonRestrictedPageSelected, isReadyToFinish, isInterviewComplete);
	};
	
	cc_EntityIntegration.createSaveButtonText = function(isFirstPageSelected, isLastNonRestrictedPageSelected, isWritableRestrictedPageSelected, isReadyToFinish, isInterviewComplete){
		return cip_Entity.createSaveButtonText(cip_Common.brandId, cip_Common.formId, isFirstPageSelected, isLastNonRestrictedPageSelected, isReadyToFinish, isInterviewComplete);
	};
	
	cc_EntityIntegration.onPreRendering = function(){
		return cip_Entity.onPreRendering(cip_Common.brandId, cip_Common.formId, cc_Config.application);
	};
	
	cc_EntityIntegration.onPostRendering = function(){
		cip_Entity.onPostRendering(cip_Common.brandId, cip_Common.formId, cc_Config.application);
	};
	
	cc_EntityIntegration.onPreFindingsAssessment = function(continuation){
		cip_Entity.onPreFindingsAssessment(cip_Common.brandId, cip_Common.formId, cc_Config.application, function(){
			// hide questions so that response data is not visible when rendered
			$('#container').hide();
			continuation();
		});
	};
	
	cc_EntityIntegration.onPostFindingsAssessment = function(){
		cip_Entity.onPostFindingsAssessment(cip_Common.brandId, cip_Common.formId, cc_Config.application);
	};
	
	cc_EntityIntegration.onPostFindingsReassessment = function(){
		cip_Entity.onPostFindingsReassessment(cip_Common.brandId, cip_Common.formId, cc_Config.application);
	};
	
	cc_EntityIntegration.onCleanAndRefresh = function(){
		cip_Entity.onCleanAndRefresh(cip_Common.brandId, cip_Common.formId, cc_Config.application);
	};
	
	cc_EntityIntegration.onPostShowPage = function (page) {
		cip_Entity.onPostShowPage(cip_Common.brandId, cip_Common.formId, cc_Config.application, page)
	}
	
	cc_EntityIntegration.onPostChangedEnteredValue = function (question, updatedEnteredValue) {
		cip_Entity.onPostChangedEnteredValue(cip_Common.brandId, cip_Common.formId, cc_Config.application, question, updatedEnteredValue);
	};
	
	/********************************************************************************************************/
	/**** @CC This is the default rendering engine view                                                  ****/
	/**** @CC From: /rendering-engine/v13_0/js/api/cloudcase.sdk.api.view.js                             ****/
	/********************************************************************************************************/

	cc_View.blankSelectedOption = '<option value="" selected></option>';
	cc_View.dayOptions = cc_View.blankSelectedOption;
	cc_View.monthOptions = cc_View.blankSelectedOption;

	for(var i = 1; i <= 12; i++) {
		cc_View.monthOptions += '<option value="' + i + '">' + i +'</option>';
	};

	for(var i = 1; i <= 31; i++) {
		cc_View.dayOptions += '<option value="' + i + '">' + i +'</option>';
	};
	
	cc_View.currentDate = new Date();
	cc_View.currentYear = cc_View.currentDate.getFullYear();
	cc_View.currentMonthOfYear = cc_View.currentDate.getMonth() + 1;
	cc_View.currentDayOfMonth = cc_View.currentDate.getDate();

	cc_View.getPageNavigatorItemId = function (pageId) {
		return 'navigator_item_' + cc_Util.toWebSafeId(pageId);
	};
	
	cc_View.getPageDivId = function (pageId) {
		return 'page_' + cc_Util.toWebSafeId(pageId);
	};
	
	cc_View.getQuestionPanelDivId = function (questionId) {
		return 'question_' + cc_Util.toWebSafeId(questionId);
	};
	
	cc_View.findResultPanelById = function (id) {
		return $('.questionResultContainer [cc-result-panel=' + id + ']');
	};
	
	cc_View.findErrorPanelById = function (id) {
		return $('.questionErrorContainer [cc-error-panel=' + id + ']');
	};
	
	cc_View.createResultMessage = function (result) {
		return '<div class="result_text">' + result + '</div>';
	};
	
	cc_View.createErrorMessage = function (message, raisedBy) {
		// raised by should be either 'server' or 'client'
		return '<div class="errorText" data-raised-by="' + (raisedBy ? raisedBy : 'server') + '">' + message + '</div>';
	};
	
	cc_View.createCompletedIcon = function (pageId) {
		return '<i class="completedIcon fa fa-check fa-lg" cc-page-completed="' + pageId + '" title="This page is complete"/>';
	};
	
	cc_View.createErrorIcon = function (pageId) {
		return '<i class="errorIcon fa fa-warning fa-lg" cc-page-error="' + pageId + '"title="This page contains errors"/>';
	};
	
	cc_View.createWarningIcon = function (pageId) {
		return '<i class="warningIcon fa fa-warning fa-lg" cc-page-warning="' + pageId + '"title="This page contains new questions"/>';
	};
	
	cc_View.createQuickfillDefaultScreen = function () {
		return 	'<div id="cloudcase-form-container">' +
					'<div id="cloudcase-page-container">' +
						'<div id="page">' +
							'<div id="page-content" class="panel-group"></div>' +
						'</div>' +
					'</div>' +
				'</div>';
	};
	
	cc_View.createPage = function (page) {
		return 	'<div id="' + cc_View.getPageDivId(page.id) + '" cc-page-id="' + page.id + '" cc-page-index="' + page.pageIndex + '" class="panel panel-default">' +
					'<div class="panel-heading">' +
						'<h4 class="panel-title">' +
							'<a data-toggle="collapse" data-parent="#accordion" href="#' + page.id + '">' + page.text + '</a>' +
						'</h4>' +
					'</div>' +
					'<div id="' + page.id + '" class="panel-collapse collapse questions">' +
						'<div class="panel-body">' +
							'<div class="sections-container">' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
	};

	cc_View.createPageNavigatorItem = function (page) {
		var navigatorItemId = cc_View.getPageNavigatorItemId(page.id);
		var toBeSubpaged = (page.text.indexOf("|") !== -1) ? page.text.split("|") : undefined;
		var subpageClass = toBeSubpaged ? " subpage" : "";
		var prefixAttribute = toBeSubpaged ? "prefix='" + toBeSubpaged[0].trim() + "' " : "";
		var subpageAttribute = toBeSubpaged ? "subpage='" + toBeSubpaged[1].trim() + "' " : "";
		var text = toBeSubpaged ? toBeSubpaged[1].trim() : page.text;
		
		return '<li id="' + navigatorItemId + '" class="page_navigator_item' + subpageClass + '" cc-page-id="' + page.id + '">' +
					'<a id="' + navigatorItemId + '_link" ' + prefixAttribute + subpageAttribute + '>' + 
						text + 
					'</a>' + 
				'</li>';
	};
	
	cc_View.createButtonPanel = function(isInterviewComplete, next, previous, save, pageId){
		// TODO:: logic within this function has been deprecated from the UI Event bridge VUE Widget

		var pages = cc_Model.topLevelPagesMap;
		var length = 0;
		var completed = 0;
	
		for (var key in pages) {
			if (pages[key].visible == true) {
				length++;
			}
			if (pages[key].completed == true) {
				completed++;
			}
		}
	
		var percentComplete = Math.round(10 * (completed / length)) * 10; // nearest 10%
		$('.progress-bar').css('width', percentComplete + "%");
	
		function previousButton(previous) {
			return previous ? '<button class="btn btn-default previous">' + previous + '</button>' : '';
		}
	
		function nextButton(next) {
			return '<button class="btn btn-primary next">' + next + '</button>';
		}
	
		function saveButton(save) {
			return "";
			// return '<button class="btn btn-default save">' + save + '</button>';
		}
	
		// TODO Review this button, is the "change" functionality even still required?
		// It may have been migrated from a really old version but not actually used
		function changeButton(pageId) {
			return '<button class="btn btn-primary change" data-page-id="' + pageId + '">Change</button>';
		}
	
		var html =	"<div class='buttonPanel'>";
	
		// CDR consent request page, let's hide the next save buttons as they're backed into the widget
	
		if (cc_Config.rulebookName == "PersonalCredit") {
			if(pageId === cc_Model.getSelectedPageId() && isInterviewComplete === false){
				if (pageId === "ConsentRequest") {
					html += previousButton(previous);
				} else {
					html += previousButton(previous)  +
							nextButton(next) +
							saveButton(save);
				}
			}else{
				html += changeButton(pageId);
			}
		} else {
			if(pageId === cc_Model.getSelectedPageId() && isInterviewComplete === false){
				if (cc_Model.getSelectedPageId().indexOf("AffordabilityAssessmentChooseYourBanks") > -1) {
					var borrower = cc_Model.getSelectedPageId().match(new RegExp("Borrower\\d")) ? cc_Model.getSelectedPageId().match(new RegExp("Borrower\\d"))[0] : null;
					if ($("#question_" + borrower + "AffordabilityAssessmentInitiateWidget").is(":visible")) {
						html += previousButton(previous);
					} else {
						html += previousButton(previous)  +
								nextButton(next) +
								saveButton(save);
					}
				} else if (pageId.indexOf("ConsentRequest") > -1) {
					html += previousButton(previous);
				} else if (cc_Model.getSelectedPageId().indexOf("ConnectToBank") > -1) {
					var borrower = cc_Model.getSelectedPageId().match(new RegExp("Borrower\\d")) ? cc_Model.getSelectedPageId().match(new RegExp("Borrower\\d"))[0] : null;
					if (
						$("#" + borrower + "ConnectToBank").find("div[id^=question_Borrower][id$=ConnectWidget]").toArray().every(function(dataholder) {
							return $(dataholder).find(".success,.error").is(":visible")
						})
					) {
						html += previousButton(previous)  +
								nextButton(next) +
								saveButton(save);
					} else {
						html += previousButton(previous);
					}
				} else {
					html += previousButton(previous)  +
							nextButton(next) +
							saveButton(save);
				}
			}else{
				html += changeButton(pageId);
			}
		}
		html +=		"</div>";
	
		return html;
	};
	
	cc_View.getSectionDivId = function (pageId, section) {
		return 'id_section_' + cc_Util.toWebSafeId(pageId) + '_' + cc_Util.toWebSafeId(section);
	};
	
	cc_View.createSection = function (pageId, section) {
		var html = '<div id="' + cc_View.getSectionFieldsetId(pageId, section) + '" class="sectionHeader">' +
						'<div class="overlay-container">' +
							'<div class="overlay">' +
							'</div>' +
						'</div>';

		if(section){
			html +=		'<legend>' + section + '</legend>';
		}

		html +=			'<div id="' + cc_View.getSectionDivId(pageId, section) + '"></div>' +
					'</div>';

		return html;
	};
	
	cc_View.getSectionFieldsetId = function (pageId, section) {
		return 'fieldset_section_' + cc_Util.toWebSafeId(pageId) + '_' + cc_Util.toWebSafeId(section);
	};
	
	cc_View.isViewableQuestion = function (question) {	
		var hasValue = function(value){
			return (value != null && value.length > 0);
		};
		
		return hasValue(question.text) || hasValue(question.values) || hasValue(question.entered) || 
				hasValue(question.error) || question.type.value === 'external-widget' || cc_Model.getProperty(cc_Renderer.PROPERTY_PLACEHOLDER, question) != null;
	};
	
	cc_View.createQuestionHtml = function (question) {	
		var classes = 'questionPanel';
			
		classes += (cc_View.isViewableQuestion(question) == true ? ' shownQuestionPanel' : ' hiddenQuestionPanel');
		classes += (question.text ? ' shownQuestionTextPanel' : ' hiddenQuestionTextPanel');
		
		if(question.concealed == true){
			classes += ' concealed';
		}
		
		if(cc_Model.getProperty(cc_Renderer.PROPERTY_LAYOUT, question) == 'Horizontal'){
			classes += ' layoutHorizontal';
		}
		
		var html = '<div id="' + cc_View.getQuestionPanelDivId(question.id) + '" cc-panel="' + question.id + '" class="' + classes + '">';
		
		if (question.type.hasAnInputType) {
			switch (question.type.value) {
			case 'multi-select':
				html += cc_View.createMultiSelectQuestionHtml(question);
				break;
			case 'single-select':
			case 'boolean':
				html += cc_View.createSingleSelectQuestionHtml(question);
				break;
			case 'free-text':
				html += cc_View.createFreeTextQuestionHtml(question);
				break;
			case 'number':
			case 'range':
				html += cc_View.createNumberQuestionHtml(question);
				break;
			case 'date':
				html += cc_View.createDateQuestionHtml(question);
				break;
			case 'search':
				html += cc_View.createSearchQuestionHtml(question);
				break;
			case 'add-document':
				html += cc_View.createAddDocumentQuestionHtml(question);
				break;
			case 'external-widget':
				html += cc_View.createExternalWidgetQuestionHtml(question);
				break;
			}
			
		}else{
			html +=	'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, 'fullWidthQuestion') + '" cc-type="' + question.type.value + '">' +
						cc_View.createQuestionHeadingHtml(question) +
						cc_View.createQuestionHelpButtonHtml(question) +
						cc_View.createQuestionResultAndErrorPanelHtml(question) +
						cc_View.createQuestionHelpPanelHtml(question) +
					'</div>';
		}
	
		if (question.hasSubQuestions) {
			html += cc_View.createSubQuestionsHtml(question);
		}
		
		html += '</div>';
		
		return html;
	};

	cc_View.createQuestionHeadingHtml = function (question) {
		var text = cc_View.createQuestionText(question);
		
		// when question does not include a text value still attach the questionText elements
		// as the value can be modified via a CC.getQuestion().setText() call.
		// without the questionText added the text value modifications will never be displayed
		var html = 	'<div class="questionAnnotationsAndText">';
			
		if(text){
			html +=		'<div class="questionAnnotations">' +
							cc_View.createQuestionHeadingMustAnswerHtml(question.mustAnswer) +
						'</div>';
		}
		
		html +=			'<div class="questionText" cc-text="' + question.id + '">' +
							'<span>' + (text ? text : '') + '</span>' +
						'</div>' + 
					'</div>';
		
		return html;
	};
	
	cc_View.createQuestionHeadingMustAnswerHtml = function (isMustAnswer) {
		return '<em>' + (isMustAnswer === true ? '*' : '&nbsp;') + '</em>';
	};
	
	cc_View.createMultiSelectQuestionHtml = function (question) {
		var html = 
				'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, question.text ? 'fixedWidthQuestion' : 'floatingWidthQuestion') + '" cc-type="' + question.type.value + '">' +
					cc_View.createQuestionHeadingHtml(question) +
					'<div class="questionContent">' +
						'<div class="multiAnswerGroup" cc-group-question-id="' + question.id + '">';

		html += 			cc_View.createMultiSelectOptionsHtml(question);
	
		html +=			'</div>' +
					'</div>' +
					cc_View.createQuestionHelpButtonHtml(question) +
					cc_View.createQuestionResultAndErrorPanelHtml(question) +
					cc_View.createQuestionHelpPanelHtml(question) +
				'</div>';
			
		return html;
	};
	
	cc_View.createMultiSelectOptionsHtml = function (question) {
		var html = '';
		
		$.each(question.values, function (i) {
			var optionId = question.id + '_' + cc_Util.escapeHtmlAttributeValue(this.value);
			
			html += '<div class="checkbox-inline">' +
					'<input id="' + optionId + '" type="checkbox" name="' + question.id + '" cc-field="' + question.id + '" cc-disableable="' + question.id + '" value="' + cc_Util.escapeHtmlAttributeValue(this.value) + '" />' +
					'<label class="answerText unselectable" for="' + optionId + '" style="display: inline-block">' + this.value + '</label>' +
				'</div>';
		});
		
		return html;
	};
	
	cc_View.createSingleSelectQuestionHtml = function (question) {
		if(question.type.value == 'boolean' || question.type.styleName == 'radio'){
			return cc_View.createSingleSelectRadioQuestionHtml(question);
			
		}else{
			return cc_View.createSingleSelectListQuestionHtml(question);
		}
	};
	
	cc_View.createSingleSelectListQuestionHtml = function (question) {
		var html =
				'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, 'fixedWidthQuestion') + '" cc-type="' + question.type.value + '" cc-style="list">' +
					cc_View.createQuestionHeadingHtml(question) +
					'<div class="questionContent">';

		if(question.type.styleName == 'auto-complete'){
			html +=		'<input class="form-control" type="text" cc-field="' + question.id + '" cc-disableable="' + question.id + '" cc-style="auto-complete" ' + cc_View.createQuestionPlaceholder(question) + '/>';
			
		}else{
			html +=		'<select class="form-control" cc-field="' + question.id + '" cc-disableable="' + question.id + '" cc-style="list">';

			html += 		cc_View.createSingleSelectListOptionsHtml(question);
					
			html +=		'</select>';
		}
		
		html +=		'</div>' +
					cc_View.createQuestionHelpButtonHtml(question) +
					cc_View.createQuestionResultAndErrorPanelHtml(question) +
					cc_View.createQuestionHelpPanelHtml(question) +
				'</div>';
			
		return html;
	};
	
	cc_View.createSingleSelectListOptionsHtml = function (question) {
		var html = '<option value="" selected></option>';
		
		$.each(question.values, function () {
			html += '<option value="' + cc_Util.escapeHtmlAttributeValue(this.value) + '">' + this.value +'</option>';
			return true;
		});
		
		return html;
	};
	
	cc_View.createSingleSelectRadioQuestionHtml = function (question) {
		var html = 
				'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, question.text ? 'fixedWidthQuestion' : 'floatingWidthQuestion') + '" cc-type="' + question.type.value + '" cc-style="radio">' +
					cc_View.createQuestionHeadingHtml(question) +
					'<div class="questionContent">' + 
						'<div class="multiAnswerGroup" cc-group-question-id="' + question.id + '">';

		html += 			cc_View.createSingleSelectRadioOptionsHtml(question);
							
		html +=			'</div>' +
					'</div>' +
					cc_View.createQuestionHelpButtonHtml(question) +
					cc_View.createQuestionResultAndErrorPanelHtml(question) + 
					cc_View.createQuestionHelpPanelHtml(question) +
				'</div>';
			
		return html;
	};
	
	cc_View.createSingleSelectRadioOptionsHtml = function (question) {
		var styleProperty = cc_Model.getProperty(cc_Renderer.PROPERTY_STYLE, question);
		
		var html = '';
		
		if(styleProperty == "ButtonGroup"){
			html += '<div class="btn-group" data-toggle="buttons">';		
		}
		
		$.each(question.values, function (i) {
			var optionId = question.id + '_' + cc_Util.escapeHtmlAttributeValue(this.value);
			
			if(styleProperty == "ButtonGroup"){ 
				html += '<label class="btn btn-lg btn-default" for="' + optionId + '" cc-disableable="' + question.id + '">' +
							'<input id="' + optionId + '" type="radio" name="' + question.id + '" cc-field="' + question.id + '" cc-disableable="' + question.id + '" value="' + cc_Util.escapeHtmlAttributeValue(this.value) + '" />' + 
							this.value +
						'</label>';
			}else{
				html += '<div class="radio-inline">' +
							'<input id="' + optionId + '" type="radio" name="' + question.id + '" cc-field="' + question.id + '" cc-disableable="' + question.id + '" value="' + cc_Util.escapeHtmlAttributeValue(this.value) + '" />' +
							'<label class="answerText unselectable" for="' + optionId + '" >' + this.value + '</label>' +
						'</div>';
			}
		});
		
		if(styleProperty == "ButtonGroup"){
			html += '</div>';		
		}
		
		return html;
	};
	
	cc_View.createSearchQuestionHtml = function (question) {
		var Placeholder = cc_Model.getProperty(cc_Renderer.PROPERTY_PLACEHOLDER, question);

		var html =
				'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, 'fixedWidthQuestion') + '" cc-type="' + question.type.value + '">' +
					cc_View.createQuestionHeadingHtml(question) +
					'<div class="questionContent">' + 
						'<input class="form-control" type="text" cc-field="' + question.id + '" cc-disableable="' + question.id + '" cc-style="auto-complete" ' + cc_View.createQuestionPlaceholder(question) + '/>';
						
		if(question.type.searchMatch.required === false){
			html +=		'<div cc-hideable-panel="' + question.id + '" class="searchNoMatchContent">' + 
							'<a class="searchNoMatchLink">' + question.type.searchMatch.noMatchText + '</a>' +
						'</div>';
		}
		
		html +=			'<div cc-hideable-panel="' + question.id + '">' + 
							'<input style="display:none;" cc-search-edit-button="' + question.id + '" class="editSearchButton btn btn-primary" type="button" value="Edit" />' +
						'</div>' +
						'<div class="searchAgainContent" cc-hideable-panel="' + question.id + '">' + 
							'<a style="display:none;" class="searchAgainLink">Click here to search again</a>' +
						'</div>' +
					'</div>' +
					cc_View.createQuestionHelpButtonHtml(question) +
					cc_View.createQuestionResultAndErrorPanelHtml(question) +
					cc_View.createQuestionHelpPanelHtml(question) +
				'</div>';
			
		return html;
	};

	cc_View.createNumberQuestionHtml = function (question) {
		return 	'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, 'fixedWidthQuestion') + '" cc-type="' + question.type.value + '">' +
					cc_View.createQuestionHeadingHtml(question) +
					'<div class="questionContent">' +
						'<input class="form-control" type="' + (cc_UI.isMobileDevice() === true ? 'number' : 'text') + '" cc-field="' + 
							question.id + '" cc-disableable="' + question.id + '" style="display:none" />' +
						'<input class="form-control " type="text" cc-decorator-field="' + 
							question.id + '" cc-disableable="' + question.id + '" ' + cc_View.createQuestionPlaceholder(question) + '/>' +
					'</div>' +
					cc_View.createQuestionHelpButtonHtml(question) +
					cc_View.createQuestionResultAndErrorPanelHtml(question) +
					cc_View.createQuestionHelpPanelHtml(question) +
				'</div>';
	};
	
	cc_View.createFreeTextQuestionHtml = function (question) {
		var isFullWidthQuestion = question.type.styleName == 'text-area';
		var styleProperty = cc_Model.getProperty(cc_Renderer.PROPERTY_STYLE, question);
		
		var html = '<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, isFullWidthQuestion == true ? 'fullWidthQuestion' : 'fixedWidthQuestion') + '" cc-type="' + question.type.value + '" cc-style="' + question.type.styleName + '">' +
						cc_View.createQuestionHeadingHtml(question) +
						'<div class="questionContent">';
		
		if(question.type.styleName == 'text-area'){
			var heightProperty = cc_Model.getProperty(cc_Renderer.PROPERTY_HEIGHT, question);
			
			html +=		'<textarea class="text form-control" cc-field="' + question.id + '" cc-disableable="' + question.id + '" ' + cc_View.createQuestionPlaceholder(question) +
							(heightProperty ? ' style="height:' + heightProperty + ';"' : '') + 
						'></textarea>';
		}else if(styleProperty == 'Password'){
			html += 	'<input class="form-control" type="password" name="password-' + cc_Util.toWebSafeId(question.id) + '" cc-field="' + question.id + '" cc-disableable="' + question.id + '" ' + cc_View.createQuestionPlaceholder(question) + '/>';
		}else{
			html += 	'<input class="form-control" type="text" cc-field="' + question.id + '" cc-disableable="' + question.id + '" ' + cc_View.createQuestionPlaceholder(question) + '/>';
		}
		
		html += 	'</div>' +
					cc_View.createQuestionHelpButtonHtml(question) +
					cc_View.createQuestionResultAndErrorPanelHtml(question) +
					cc_View.createQuestionHelpPanelHtml(question) +
				'</div>';
		
		return html;
	};
	
	cc_View.createSubQuestionsHtml = function (question) {
		var html = '';
		
		if(question.subQuestions && question.subQuestions.length > 0){
			cc_Util.invokeOnElements(question.subQuestions, function () {
				html += cc_View.createQuestionHtml(this);
			});
		}
		
		return html;
	};
	
	cc_View.createExternalWidgetQuestionHtml = function (question) {
		var html = 	'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, 'fullWidthQuestion') + '" cc-type="' + question.type.value + '">';

		html +=			cc_View.createQuestionHelpButtonHtml(question) +
					cc_View.createQuestionResultAndErrorPanelHtml(question) +
					cc_View.createQuestionHelpPanelHtml(question);
		
		var renderedQuestionHtml = eval(question.type.externalWidget.renderFunktion + ';' + question.type.externalWidget.renderFunktionName + '();');
		if(renderedQuestionHtml){
			html += renderedQuestionHtml;
		}

		html +=		'</div>';
		
		return html;
	};
	
	cc_View.createAddDocumentQuestionHtml = function (question) {
		return 	'<form>' +
					'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, 'fixedWidthQuestion') + '" cc-type="' + question.type.value + '">' +
						cc_View.createQuestionHeadingHtml(question) +
						'<div class="questionContent"></div>' +
						cc_View.createQuestionHelpButtonHtml(question) +
						cc_View.createQuestionResultAndErrorPanelHtml(question) +
						cc_View.createQuestionHelpPanelHtml(question) +
					'</div>'+
				'</form>';
	};
	
	cc_View.createAddDocumentQuestionContentHtml = function (question) {
		var html;
		
		if(cc_Config.isExecutingWithinWorkflow === true){
			
			// entered can be null for multiple answer questions
			if(question.entered && question.entered.length == 2){
				html = '<div class="addedDocumentPanel">' + 
							'<input cc-disableable="' + question.id + '" cc-field="' + question.id + '" value="' + question.entered[0] + cc_Config.fieldDelimiter + question.entered[1] + '" type="hidden" />' +
							'<div style="font-weight:bold;">' + question.entered[1] + '</div>' + 
							'<input cc-disableable="' + question.id + '" class="removeDocumentButton btn btn-default" style="margin-top:8px;margin-left:0px;"' + 
								' data-documentid="' + question.entered[0] + '" class="btn btn-primary" type="button" value="Remove" />' +
						'</div>';
			}else{
				html = '<div class="missingDocumentPanel" >' +
							'<input cc-disableable="' + question.id + '" name="environment" type="hidden" value="' + cc_Config.environment + '" />' +
							'<input cc-disableable="' + question.id + '" name="workflowName" type="hidden" value="' + cc_Config.workflowName + '" />' +
							'<input cc-disableable="' + question.id + '" name="workflowVersion" type="hidden" value="' + cc_Config.workflowVersion + '" />' +
							'<label for="' + question.id + '" class="uploadDocumentButton btn btn-primary">Upload File</label>' +
							'<input id="' + question.id + '" style="display:none;" cc-disableable="' + question.id + '" cc-field="' + question.id + '" name="document" class="uploadDocumentFile btn btn-default" type="file" />' +
						'</div>';
			}
			
		}else{
			html = 	'<div style="margin-top:-4px;">' + 
						'<span style="margin-right:25px;font-weight:bold;">Add Document question is not supported in rulebook test mode.</span>' + 
					'</div>';							
		}
		
		return html;
	};
	
	cc_View.createDateQuestionHtml = function (question) {
		return	'<div class="questionContainer ' + cc_View.getQuestionLayoutTextPosition(question, 'fixedWidthQuestion') + '" cc-type="' + question.type.value + '">' +
					cc_View.createQuestionHeadingHtml(question) +
					'<div class="questionContent">' + 
						'<table>' +
							'<tr>' +
								cc_View.createDateQuestionSegmentHtml(question, 'day') + 
								cc_View.createDateQuestionSegmentHtml(question, 'month') + 
								cc_View.createDateQuestionSegmentHtml(question, 'year') + 
							'</tr>' +
						'</table>' +
					'</div>' +
					cc_View.createQuestionHelpButtonHtml(question) +
					cc_View.createQuestionResultAndErrorPanelHtml(question) +
					cc_View.createQuestionHelpPanelHtml(question) +
				'</div>';
	};
	
	cc_View.createQuestionResultAndErrorPanelHtml = function (question) {
		// this method can be called in two situations:
		//	1. as a next question being attached for the first time
		//	2. when a sub question is being added as a next question
		//
		// for case 2. the sub question's root parent is re-rendered. 
		//
		// an error should only be shown via this mechanism when it is being attached for the first
		// time, so it had not been viewed. this only occurs when the query interface method setError()
		// is run on a newly asked question
		var allowErrorToBeShown = question.viewed === false;
		
		return	'<div class="questionOutcomeContainer">' +
					'<div class="questionResultContainer">' + cc_View.createQuestionResult(question) + '</div>' +
					'<div class="questionErrorContainer">' + cc_View.createQuestionError(question, allowErrorToBeShown) + '</div>' +
				'</div>';
	};
	
	cc_View.createQuestionHelpPanelHtml = function (question) {
		var html = '';

		var helpText = cc_Model.getProperty(cc_Renderer.PROPERTY_HELP_TEXT, question);
		if(helpText != null){
			html += 	'<div class="questionHelpContainer" style="display:none;">' +
							helpText +
						'</div>';
		}
		
		return html;
	};
	
	cc_View.createQuestionHelpButtonHtml = function (question) {
		var html = '';

		var helpText = cc_Model.getProperty(cc_Renderer.PROPERTY_HELP_TEXT, question);
		if(helpText != null){
			html += 	'<div class="questionHelpButton">' +
							'<span class="fa fa-question-circle fa-lg"></span>' +
						'</div>';
		}
		
		return html;
	};
	
	cc_View.createDateQuestionSegmentHtml = function (question, type) {
		var label, segmentHtml;
		
		if(type === 'year'){
			segmentHtml = cc_View.blankSelectedOption;
			for(var i = question.hints[3] ; i >= question.hints[2]; i--) {
				segmentHtml += '<option value="' + i + '">' + i +'</option>';
			};
			label = 'Year';
			
		}else if(type === 'month'){
			segmentHtml= cc_View.monthOptions;
			label = 'Month';
			
		}else{
			segmentHtml= cc_View.dayOptions;
			label = 'Day';
		}
		
		return '<td class="answerText" style="min-width:70px;padding:0;border:none;">' +
					'<table>' +
						'<tr>' +
							'<td>' + label + '</td>' +
						'</tr>' +
					'</table>' +
					'<table>' +
						'<tr>' +
							'<td><select class="form-control" cc-field="' + question.id + '" cc-disableable="' + question.id + '">' + segmentHtml + '</select></td>' +
						'</tr>' +
					'</table>' +
				'</td>';
	};
	
	cc_View.getQuestionLayoutTextPosition = function (question, defaultLayoutTextPosition) {
		var layoutTextPositionProperty = cc_Model.getProperty(cc_Renderer.PROPERTY_LAYOUT_TEXT_POSITION, question);

		var layoutTextPosition = null;
		switch(layoutTextPositionProperty) {
			case 'Full':
				layoutTextPosition = 'fullWidthQuestion';
				break;
			case 'Floating':
				layoutTextPosition = 'floatingWidthQuestion';
				break;
			case 'Fixed':
				layoutTextPosition = 'fixedWidthQuestion';
				break;
			default:
				layoutTextPosition = defaultLayoutTextPosition;
		}
		
		return layoutTextPosition;
	};
	
	cc_View.createQuestionPlaceholder = function (question){
		var placeholder = cc_Model.getProperty(cc_Renderer.PROPERTY_PLACEHOLDER, question);
		return placeholder ? 'placeholder="' + placeholder + '"' : '';
	};
	
	cc_View.createQuestionText = function (question) {
		return question.text;
	};
	
	cc_View.findQuestionPanelById = function (id, filter) {
		return $('#' + cc_View.getQuestionPanelDivId(id) + (filter || ''));
	};
	
	cc_View.findQuestionFieldById = function (id, filter) {
		return $('div.questionContent [cc-field=' + id + ']' + (filter || ''));
	};
	
	cc_View.findQuestionPanelByField = function (jField) {
		return $(jField).closest('.questionPanel');
	}; 
	
	cc_View.findQuestionLabelByField = function (jField) {
		return $(jField).closest('label');
	}; 
	
	cc_View.findQuestionFieldDecoratorByField = function (jField) {
		return jField.parent().find('[cc-decorator-field]');
	}; 
	
	cc_View.findQuestionTextById = function (id, filter) { 
		return $('div.questionText[cc-text=' + id + ']' + (filter || ''));
	};
	
	cc_View.findQuestionDisabledById = function (id, filter) { 
		return $('[cc-disableable=' + id + ']' + (filter || ''));
	};
	
	cc_View.findQuestionSearchNoMatchPanelById = function (id, filter) { 
		return $('[cc-search-no-match-panel=' + id + ']' + (filter || ''));
	};
	
	cc_View.findQuestionHideablePanelById = function (id, filter) { 
		return $('[cc-hideable-panel=' + id + ']' + (filter || ''));
	};
	
	cc_View.createQuestionResult = function (question) {
		return 	'<div cc-result-panel="' + question.id + '" class="result_content">' + 
					(question.result ? cc_View.createResultMessage(question.result) : '') + 
				'</div>';
	};

	cc_View.createQuestionError = function (question, allowErrorToBeShown) {
		return 	'<div cc-error-panel="' + question.id + '" class="error_content">' + 
					(question.error && allowErrorToBeShown === true ? cc_View.createErrorMessage(question.error) : '') + 
				'</div>';
	};
	
	cc_View.getContainingDialogId = function(field) {
		var containingDialog = field.closest(".ui-dialog-content.ui-widget-content");
		return containingDialog ? containingDialog.id : null;
	};
	
	cc_View.isShowingDialogId = function(dialogId) {
		return $('#' + dialogId + ':visible').length > 0;
	};
	
	/********************************************************************************************************/
	/**** @CC This is the default rendering engine renderer                                              ****/
	/**** @CC From: /rendering-engine/v13_0/js/api/cloudcase.sdk.api.renderer.js                         ****/
	/********************************************************************************************************/

	cc_Renderer.PROPERTY_DECORATOR = "Decorator";
	cc_Renderer.PROPERTY_DECORATOR_USE_DECIMAL_PERCENTAGE = "UseDecimalPercentage"
	cc_Renderer.PROPERTY_PLACEHOLDER = "Placeholder";
	cc_Renderer.PROPERTY_HELP_TEXT = "HelpText";
	cc_Renderer.PROPERTY_STYLE = "Style"; // ButtonGroup, Password
	cc_Renderer.PROPERTY_LAYOUT = "Layout"; // Horizontal
	cc_Renderer.PROPERTY_LAYOUT_TEXT_POSITION = "TextPosition"; // Full, Fixed, Floating
	cc_Renderer.PROPERTY_LAYOUT_COLUMNS = "Columns"; // 1 - 12
	cc_Renderer.PROPERTY_LAYOUT_NEW_ROW = "NewRow"; // true
	cc_Renderer.PROPERTY_HEIGHT = "Height"; // 200px
	cc_Renderer.PROPERTY_ENTERED_REGEX_MATCH = "EnteredRegexMatch";
	cc_Renderer.PROPERTY_ENTERED_REGEX_SUBSTITUTION = "EnteredRegexSubstitution";
	
	cc_Renderer.enableScrollToCaptureUserAttention = true;
	
	cc_Renderer.startInit = function () {
		$('#cloudcase-form').empty().append(cc_EntityIntegration.createDefaultScreen()).hide();
		
		// clean up previous state because the modal interview dialog can be opened many times on the same url
		cc_Renderer.lastQuestionChangedScrollTop = null;
		cc_Renderer.lastScrolledToSectionDivId = null;
	};
	
	cc_Renderer.startQuickfillInit = function () {
		$('#cloudcase-form').empty().append(cc_View.createQuickfillDefaultScreen()).hide();
	};
	
	cc_Renderer.completeInit = function () {
		$('#cloudcase-form').show();
	
		if(cc_Model.isFirstPageSelected === false){
			$.doTimeout(1000, function(){
				var elementToScrollTo = $("#" + cc_View.getPageDivId(cc_Model.getSelectedPageId()) + " .sectionHeader:first");
				$('html,body').animate({scrollTop: elementToScrollTo.offset().top - 36}, 1000);
				return false; // poll
			});
		}
	
		$(function() {
			// Don't extract `$("#cloudcase-page-navigator-unrestricted")` into its own variable,
			// It will break when page navigation folding is enabled as that dynamically changes page nav height
			
			if ($("#cloudcase-page-navigator-unrestricted").length > 0) {
				var sidebarInitialPositionOffsetTop = $("#cloudcase-page-navigator-unrestricted").position().top;
				var dynamicSidebarOffset = sidebarInitialPositionOffsetTop;
				var sidebarScrollPosition = 0;
				var sidebarPaddingBottom = 50;
				var previousWindowScrollPosition = $(window).scrollTop();
	
				$(window).scroll(function() {
					var windowHeight = $(window).height();
					var sidebarHeight = $("#cloudcase-page-navigator-unrestricted").outerHeight();
	
					var windowScrollPosition = $(window).scrollTop();
	
					var scrollDelta = windowScrollPosition - previousWindowScrollPosition;
					previousWindowScrollPosition = windowScrollPosition;
					sidebarScrollPosition = windowScrollPosition - dynamicSidebarOffset;
	
					if (windowHeight > sidebarHeight && sidebarHeight + sidebarPaddingBottom < windowHeight) {
						// If sidebar is smaller than the window, make it always sticky
						dynamicSidebarOffset = windowScrollPosition;
					} else if (sidebarHeight > windowHeight && (sidebarScrollPosition + windowHeight > sidebarHeight + sidebarPaddingBottom || sidebarScrollPosition < -sidebarInitialPositionOffsetTop)) {
						// If the sidebar is larger than the window, only make it sticky when trying to scroll past the bounds of the sidebar
						dynamicSidebarOffset += scrollDelta;
					} else if (dynamicSidebarOffset < 0) {
						// If for some reason the sidebar recedes too far above, reset
						dynamicSidebarOffset = sidebarInitialPositionOffsetTop;
					}
					$("#cloudcase-page-navigator-unrestricted").css("margin-top", dynamicSidebarOffset);
				});
			}
		});
	};

	cc_Renderer.render = function (pageToRender, response, triggerType, focusedQuestionId, isUserDriven, isExplictSave, triggeringQuestionId, manuallySelectedPageId, enableMoveToRelativePage, quickfill) {
		var result = {};
		result.questionsToAttached = [];
		result.newlyShownQuestions = [];
		
		if(response.next && response.next.length > 0){
			$.each(response.next, function () {
				result.newlyShownQuestions.push(this.id);
			});
		}
		
		if(response.revealed && response.revealed.length > 0){
			$.each(response.revealed, function () {
				result.newlyShownQuestions.push(this);
			});
		}
		
		$.each(cc_Model.questionsToBeRerendered, function () {
			var question = cc_Model.anyLevelQuestionMap[this];
			
			if (quickfill) {
				if (quickfill.questionId == question.id) {
					result.questionsToAttached.push(question.id);
				}
			} else {
				if (cc_Config.enableLazyQuestionRendering === false || pageToRender == question.page.id) {
					result.questionsToAttached.push(question.id);
				}	
			}
		});
		
		result.triggerType = triggerType;
		result.isUserDriven = isUserDriven;
		result.isExplictSave = isExplictSave;
		result.focusedQuestionId = focusedQuestionId;
		result.triggeringQuestionId = triggeringQuestionId;
		result.quickfill = quickfill;
		result.isInterviewComplete = cc_Model.isInterviewComplete === true || false;
		result.treatInterviewAsCompletedOnLoad = cc_Model.treatInterviewAsCompletedOnLoad || false;
		result.isFirstRequest = cc_Model.isFirstRequest;
		result.hasInvalidQuestions = response.invalid && response.invalid.length > 0;
		result.invalidQuestionsOnSelectedPage = cc_Model.getSelectedPageQuestionsForReferences(response.invalid);
		result.newlyShownQuestionsOnSelectedPage = cc_Model.getSelectedPageQuestionsForReferences(cc_Model.convertToQuestionReferences(result.newlyShownQuestions));
		result.hasInvalidOrNewlyShownQuestionsOnSelectedPage = result.invalidQuestionsOnSelectedPage.length > 0 || result.newlyShownQuestionsOnSelectedPage.length > 0;
		result.pageToShow = cc_Renderer.determinePageToShow(result, pageToRender, triggerType, isUserDriven, manuallySelectedPageId, enableMoveToRelativePage);
		
		var allowRendering = result.pageToShow && pageToRender == result.pageToShow.id;
		var hasQuestionsToAttached = result.questionsToAttached && result.questionsToAttached.length > 0;
		var hasNewlyShownQuestions = result.newlyShownQuestions && result.newlyShownQuestions.length > 0;
		
		var attachedConcealedQuestions = [];
		if(allowRendering == true && hasQuestionsToAttached == true){
			$.each(result.questionsToAttached, function () {
				var question = cc_Model.anyLevelQuestionMap[this];
				
				if(question){ // question could be on a restricted page
					// concealed can include:
					// -> questions flagged as concealed via response.concealed OR
					// -> any level next questions with concealed = true, this can occur when resuming a stateful session 
					if(question.concealed == true){
						attachedConcealedQuestions.push(question.id);
					}
					
					// this will render both shown and concealed questions. they will be hidden later
					cc_Renderer.attachQuestion(question, cc_View.findQuestionPanelById(question.id).length == 0);
					
					cc_Util.removeElement(cc_Model.questionsToBeRerendered, question.id);
				}
			});
			
			// ensure any concealed pages or sections are shown when newly attached questions are added
			cc_Renderer.updatePageAndSectionVisibilityForRevealed(result.questionsToAttached);
		}
		
		if(pageToRender){
			cc_Renderer.hideConcealedQuestions(pageToRender);
		}
		
		// compile an array of all concealed questions via response.concealed and response.next
		var allConcealedQuestions = attachedConcealedQuestions;
		if(response.concealed && response.concealed.length > 0){
			allConcealedQuestions = allConcealedQuestions.concat(response.concealed);
		}
		
		if(allConcealedQuestions && allConcealedQuestions.length > 0){
			cc_Renderer.updatePageAndSectionVisibilityForConcealed(allConcealedQuestions);
		}
		
		if(response.revealed && response.revealed.length > 0){
			cc_Renderer.updatePageAndSectionVisibilityForRevealed(response.revealed);
		}
		
		if(hasNewlyShownQuestions == true){
			cc_Renderer.attachPageWarnings(result.newlyShownQuestions);
		}
		
		result.isRendered = allowRendering;
		
		return result;
	};

	cc_Renderer.attachUserExperienceExtensions = function(extensions) {
		if (Array.isArray(extensions)) {
			extensions.forEach(function(extension) {
				cc_Extension.snapshotMethods(extension.extendMethods);
				if (!cc_Renderer.styleExistsInHead(extension.id)) {
					cc_Renderer.attachStyleToHead(extension.id, extension.appearance);
				}
				if (!cc_Renderer.scriptExistsInHead(extension.id)) {
					cc_Renderer.attachScriptToHead(extension.id, extension.behavior);
				}
			});
		}
	};

	cc_Renderer.styleExistsInHead = function(id) {
		return !!$("style." + id).length;
	}

	cc_Renderer.attachStyleToHead = function(id, style) {
		$('head').append("<style class='extension " + id + "'>" + style + "</style>");
	};

	cc_Renderer.scriptExistsInHead = function(id) {
		return !!$("script." + id).length;
	}

	cc_Renderer.attachScriptToHead = function(id, script) {
	//	TODO see if its possible to merge with external widget's add to head
		$('head').append("<script class='extension " + id + "' type='text/javascript'>" + script + "</script>");
	};
	
	cc_Renderer.attachPageWarnings = function(questionsToAttached){
		var viewedPagesWithNewlyAttachedQuestions = [];
		
		$.each(questionsToAttached, function () {
			var question = cc_Model.anyLevelQuestionMap[this];
			var page = cc_Model.topLevelPagesMap[question.page.id];
			
			if(page && page.viewed && cc_Model.getSelectedPageId() != page.id && !cc_Util.containsElement(viewedPagesWithNewlyAttachedQuestions, page.id)){
				viewedPagesWithNewlyAttachedQuestions.push(page.id);
			}
		});
		
		$.each(viewedPagesWithNewlyAttachedQuestions, function () {
			cc_Renderer.attachPageWarning(this);
		});
	};
	
	cc_Renderer.hideConcealedQuestions = function(page){
		$('#' + cc_View.getPageDivId(page) + ' .concealed').hide();
	};
	
	cc_Renderer.determinePageToShow = function (result, currentSelectedPage, triggerType, isUserDriven, manuallySelectedPageId, enableMoveToRelativePage) {
		if(currentSelectedPage === null && cc_Model.getFirstPageRequiringAttention()){
			currentSelectedPage = cc_Model.getFirstPageRequiringAttention().id;
		}
		
		var pageIdToShow = currentSelectedPage;
		
		if(isUserDriven == true){
			if(triggerType === "NEXT" && enableMoveToRelativePage == true){
				pageIdToShow = cc_Model.getNextPageId(currentSelectedPage);
				
			}else if(triggerType === "PREVIOUS" && enableMoveToRelativePage == true){
				pageIdToShow = cc_Model.getPreviousPageId(currentSelectedPage);
			}
			
			if(manuallySelectedPageId && cc_Model.topLevelPagesMap[manuallySelectedPageId]){
				// moving manuallySelectedPageId check here since NEXT and PREVIOUS are never used with manuallySelectedPageId.
				// manuallySelectedPageId should only be used for page selection, quickfill, or open-interview
				pageIdToShow = manuallySelectedPageId; 
				
			}else if(result.isExplictSave == true && (result.isReadyToFinish == true || result.hasInvalidOrNewlyShownQuestionsOnSelectedPage == true)){
				pageIdToShow = currentSelectedPage;
				
			}else if(cc_Model.isInterviewInProgress() == false && result.hasInvalidOrNewlyShownQuestionsOnSelectedPage == true){
				pageIdToShow = currentSelectedPage;
				
			}else if (enableMoveToRelativePage == true && cc_Model.doesPageHaveQuestions(pageIdToShow) == false){
				pageIdToShow = currentSelectedPage;
			}
		}

		return cc_Model.topLevelPagesMap[pageIdToShow];
	};
	
	cc_Renderer.showPage = function (page, result) {
		if(page){
			page.viewed = true;
			cc_Model.selectedPage = page;
			cc_Model.isFirstPageSelected = (cc_Model.selectedPage.id == cc_Model.getFirstPage().id);
			cc_Model.isLastNonRestrictedPageSelected = (cc_Model.selectedPage.id == cc_Model.getLastNonRestrictedPage().id);
			cc_Model.isWritableRestrictedPageSelected = (cc_Model.selectedPage.restricted == true && cc_Model.selectedPage.readOnly == false);
			
			// warnings are used to ensure the user knows that something has changed on the page.
			// therefore when a page is shown its warnings should be removed 
			cc_Renderer.detachPageWarning(page.id);
			
			cc_Renderer.selectPageNavigatorItem(page.id);
			
			var selectedPageDivId = cc_View.getPageDivId(page.id);
			
			var detachErrorCallback = function(){
				cc_Renderer.detachError($(this).parent().find('[cc-field]').attr('cc-field'));
			};
			 
			$('#' + selectedPageDivId + ' > * input[cc-field][type=text], ' +
				'#' + selectedPageDivId + ' > * input[cc-field][type=number], ' +
				'#' + selectedPageDivId + ' > * button[cc-field][type=number], ' +
				'#' + selectedPageDivId + ' > * select, ' +
				'#' + selectedPageDivId + ' > * textarea')
				.on('focus', detachErrorCallback);
			
			// checkbox does not trigger focus event on check or uncheck & radio buttons, file input and buttons loose focus when error message is detached 
			$('#' + selectedPageDivId + ' > * input[type=checkbox], ' +
				'#' + selectedPageDivId + ' > * input[type=radio], ' +
				'#' + selectedPageDivId + ' > * input[type=file], ' +
				'#' + selectedPageDivId + ' > * input[type=button]')
				.on('click', detachErrorCallback);
			
			cc_Renderer.updateSubQuestionVisiblity(selectedPageDivId);
			
			$('#' + selectedPageDivId).addClass("viewed").show();
			
			cc_UI.selectAccordionPage(page.id);
			
			cc_Renderer.attachFieldChangeListeners();
			
			// process all new errors 
			var hasNewErrors = result.response.invalid && result.response.invalid.length > 0;
			var allNewErrorsMap = {};
			
			if (hasNewErrors === true){
				$.each(result.response.invalid, function(){
					allNewErrorsMap[this.id] = this;
				});
			}
			
			// when the user triggered the page to be show then attach all errors
			if(result.isUserDriven == true && hasNewErrors === true){
				cc_Renderer.attachNewErrors(result.response.invalid);
						
				if(result.isFirstRequest == false){
					cc_Renderer.flashErrors();
				}
				
			// when a question change triggered the page to be shown only update the affected question	
			}else if(result.triggeringQuestionId){
				if(hasNewErrors === true){
					$.each(result.response.invalid, function () {
						// update triggering question error by removing old and attaching new
						if(result.triggeringQuestionId == this.id){
							cc_Renderer.detachError(this.id);
							cc_Renderer.attachError(this.id, this.message, "server");
						}
					});
				}
			}
			
			// remove errors which previously existed but do not now (ie errors which have been corrected)
			if (cc_Model.allErrorsMap){
				$.each(cc_Model.allErrorsMap, function(){
					if(allNewErrorsMap[this.id] == null){
						cc_Renderer.detachError(this.id);
					}
				});
			}
			
			// all new errors become the current errors
			cc_Model.allErrorsMap = allNewErrorsMap;
			
			cc_Renderer.refreshPageWizard();
			cc_Model.handlePageShown();
			
			if(result.isUserDriven == true){
				cc_Renderer.detachPageCompletionIcons();
				
				cc_Model.updatePageCompletionStatuses();
				
				$.each(cc_Model.topLevelPagesMap, function(){
					if(this.completed == true){
						cc_Renderer.attachPageCompletionIcons(this.id);
					}
				});
			}
			
			cc_Renderer.scrollToCaptureUserAttention(result);
			
			if(cc_EntityIntegration.onPostShowPage){
				cc_EntityIntegration.onPostShowPage(page);
			}
		}
	};
	
	cc_Renderer.selectPageNavigatorItem = function (pageId) {
		$('.page_navigator_item').removeClass('selected');
		$('#' + cc_View.getPageNavigatorItemId(pageId)).addClass('selected');
	}
	
	cc_Renderer.updateSubQuestionVisiblity = function (selectedPageDivId) {
		// call all change listeners too so that sub questions are refreshed
		$('#' + selectedPageDivId + ' input, #' + selectedPageDivId + ' select, #' + selectedPageDivId + ' textarea').change();
	}
	
	cc_Renderer.updatePageAndSectionVisibilityForConcealed = function (questions) {
		$.each(questions, function(){
			var question = cc_Model.anyLevelQuestionMap[this];
			
			if(question){ // question could be on a restricted page
				var sectionName = cc_Model.getSectionName(question);
				
				if (cc_Model.doesSectionHaveQuestions(question.page.id, sectionName) == false) {
					$('#' + cc_View.getSectionFieldsetId(question.page.id, sectionName)).hide();
				}
				
				if (cc_Model.doesPageHaveQuestions(question.page.id) == false) {
					cc_Model.updatePageVisibility(question.page.id, false);
					
					$('#' + cc_View.getPageNavigatorItemId(question.page.id)).hide();
					$('#' + cc_View.getPageDivId(question.page.id)).hide();
				}
			}
		});
	};
	
	cc_Renderer.updatePageAndSectionVisibilityForRevealed = function (questions) {
		$.each(questions, function(){
			var question = cc_Model.anyLevelQuestionMap[this];
			
			if(question){ // question could be on a restricted page
				var sectionName = cc_Model.getSectionName(question);
				
				if (cc_Model.doesSectionHaveQuestions(question.page.id, sectionName) == true) {
					$('#' + cc_View.getSectionFieldsetId(question.page.id, sectionName)).show();
				}
				
				if (cc_Model.doesPageHaveQuestions(question.page.id) == true) {
					cc_Model.updatePageVisibility(question.page.id, true);
					
					$('#' + cc_View.getPageNavigatorItemId(question.page.id)).show();
					$('#' + cc_View.getPageDivId(question.page.id)).show();
				}
			}
		});
	};
	
	cc_Renderer.attachQuestion = function (question, isNew) {
		var sectionName = cc_Model.getSectionName(question);
		var sectionDivId = cc_View.getSectionDivId(question.page.id, sectionName);
		
		// we are dealing with a new section so lets add it first 
		if ($('#' + sectionDivId).length == 0) {
			cc_Renderer.addNewSection(question, sectionName);
		}
		
		var hasExternalWidgets = cc_Renderer.hasExternalWidgets(question);
		
		// ensure all head scripts are added 
		var externalWidgetsAddedToHead = []; // this acts as a cache of scripts have have been added to head
		cc_Renderer.applyExternalWidgetAddToHeadFunction(question, externalWidgetsAddedToHead);
		
		// logic to ensure all widgets are ready to render
		if(hasExternalWidgets === true){
			
			// this will manage time to ensure that the add to head script download is not being blocked by this thread
			cc_Renderer.renderQuestionAfterExternalWidgetsAreReadyToRender(question, function(){
				
				// question is ready to be rendered
				cc_Renderer.renderQuestion(question, isNew, sectionDivId);
			});
			
		}else{
			// question is ready to be rendered and there are no external widgets
			cc_Renderer.renderQuestion(question, isNew, sectionDivId);
		}
	};

	cc_Renderer.renderQuestion = function (question, isNew, sectionDivId) {
		// render top level question
		
		var html = cc_View.createQuestionHtml(question);
		if(isNew == true){
			$('#' + sectionDivId).append(html);
		}else{
			$('#' + sectionDivId).find("div[cc-panel=" + question.id + "]").replaceWith(html);
		}
		
		cc_Renderer.applyExternalWidgetOnRenderingCompleteFunction(question);
		cc_Renderer.applyRichQuestionAnswerStyles(question);
		cc_Renderer.attachValidator(question);
		
		// update on first render
		cc_Renderer.updateEnteredValue(question, question.entered);
		cc_Renderer.updateDisabledValue(question, true);
		
		// after the entered values are attached then attach the decorator
		cc_Renderer.attachDecorator(question);
		
		cc_Renderer.attachLayout(question);
		cc_Renderer.attachHelp(question);
		
		cc_Renderer.bindSubQuestions(question, null);
	}
	
	cc_Renderer.dettachQuestions = function (includeAllFields) {
		var detachedQuestions = [];
		
		$.each(cc_Model.topLevelQuestionMap, function (i) {
			var isOnSelectedPage = cc_Model.isOnSelectedPage(this);
			
			// dettach when:
			//	1) is operator or applicant and is on selected page (stateful session) OR
			//	2) is author (stateless session)
			if((cc_Config.userType != "author" && isOnSelectedPage === true) || cc_Config.userType === "author"){
				if (isOnSelectedPage === true) {
					cc_Renderer.dettachQuestion(this);
				}
				
				detachedQuestions.push(cc_Model.toAnsweredQuestion(this, includeAllFields));
			}
		});
		
		return detachedQuestions;
	};
	
	cc_Renderer.dettachQuestion = function (question) {
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.dettachQuestion(this);
			});
		}
		
		var isVisible = cc_View.findQuestionPanelById(question.id, ":visible").length > 0;
		
		// if question is included and on the current page then it has been viewed
		if(isVisible === true){
			question.viewed = true;
		}

		cc_Model.updateQuestionInclusionRenderedState(question, isVisible);
		cc_Model.updateQuestionEnteredRenderedState(question, cc_Renderer.getQuestionEnteredValue(question));
		
		return question;
	};
	
	cc_Renderer.addNewPage = function (page) {
		var pageHtml = cc_View.createPage(page);
		var pageNavigatorItemHtml = cc_View.createPageNavigatorItem(page);		
		var pageBefore = cc_Model.getPageBefore(page.id, page.restricted);
		
		var pageNavigator = page.restricted === true ? "cloudcase-page-navigator-restricted" : "cloudcase-page-navigator-unrestricted";
		
		if(pageBefore){
			// insert new page in correct order
			$('#page-content #' + cc_View.getPageDivId(pageBefore.id)).after(pageHtml);
			$('#' + pageNavigator + ' #' + cc_View.getPageNavigatorItemId(pageBefore.id)).after(pageNavigatorItemHtml);
		}else{
			// insert at the end
			$('#page-content').append(pageHtml);
			$('#' + pageNavigator + '').append(pageNavigatorItemHtml);
		}
		
		// remove all previous click listeners and add new ones including the new page. also apply a throttle routine across them
		$('.page_navigator_item').off().on('click', $.throttle(1500, function () {
			cc_Controller.save("PAGE_SELECTION", $(this).closest('li').attr("cc-page-id"));
		}));
	};
	
	cc_Renderer.addNewSection = function (question, section) {
		var newSectionIndex = cc_Model.getQuestionSectionIndex(question);
		
		var jSections = $('#' + cc_View.getPageDivId(question.page.id) + ' .panel-body .sections-container');
		var html = cc_View.createSection(question.page.id, section);
		
		if(newSectionIndex == 0){
			// always insert new section as first section.
			// note: this is an prepend operation as a question with no section could be added even when there are existing sections
			jSections.prepend(html);
			
		}else{
			// insert after existing section (note: eq() is offset by 1 ie starts at index 1)
			var jSectionsInsertionPoint = jSections.find('> .sectionHeader:eq(' + (newSectionIndex - 1) + ')');
			
			if(jSectionsInsertionPoint.length == 0){
				// this situation can occur when multiple new sections are being added for the first time. so
				// add the new section as the last section (using append())
				// i.e. they have been append in this render iteration but are not bound to the rendered dom yet so
				// the jquery selector does not return them
				jSections.append(html);
			}else{
				jSectionsInsertionPoint.after(html);
			}
		}
	};
	
	cc_Renderer.applyRichQuestionAnswerStyles = function (question){
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.applyRichQuestionAnswerStyles(this);
			});
		}
		
		if(question.type.styleName == 'auto-complete'){
			var source = null;
			var select = null;
			
			var jPanel = $(cc_View.findQuestionPanelById(question.id));
			var jField = $(cc_View.findQuestionFieldById(question.id));
			
			// add a hook for css
			jPanel.find('> .questionContainer > .questionContent').attr('cc-rich-style', 'auto-complete');
			
			if(question.type.value === 'search'){
				jPanel.find('.searchNoMatchLink').click(function (){
					cc_Renderer.updatedSearchEnteredValue(question.id, 'NO_MATCH_SELECTED', null);
					cc_Renderer.handleFieldChange(jField);
				});
				
				jPanel.find('.editSearchButton, .searchAgainLink').click(function (){
					cc_Renderer.updatedSearchEnteredValue(question.id, null, null);
					cc_Renderer.handleFieldChange(jField);
				});
				
				select = function(event, ui){
					// clone selected result so we can removed the 'value' property which is added by jquery ui autocomplete
					var selectedResult = cc_Util.clone(ui.item);
					delete selectedResult.value;
					
					cc_Renderer.updatedSearchEnteredValue(question.id, 'MATCH_SELECTED', selectedResult);
					cc_Renderer.handleFieldChange(jField);
				};
				
				source = function(sourceRequest, sourceResponse){
					cc_EntityIntegration.getSearchDataSourceResults(question.type.dataSourceReference, sourceRequest.term, sourceResponse);
				};
				
			}else{
				select = function(event, ui){
					// set the value on the field because handleFieldChange() needs to know the updated value.
					// however, the autocomplete question has not updated the field on executing the selection event 
					jField.setValue(ui.item.value);
					
					// clone selected result so we can removed the 'value' property which is added by jquery ui autocomplete
					var selectedResult = cc_Util.clone(ui.item);
					delete selectedResult.value;
					
					cc_Renderer.handleFieldChange(jField);
				};
				
				// use the supplied option values
				source = question.values;
			}
			
			cc_UI.autocomplete(cc_View.findQuestionFieldById(question.id), source, select, 500, question.type.autoCompleteStyle.minimumLength, false);
			
			// add class so we have a hook to change the style of the form (without impacting areas )
			cc_View.findQuestionFieldById(question.id).autocomplete("widget").addClass("cloudcase-form-autocomplete");
		}
	};
	
	cc_Renderer.attachHelp = function (question){
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.attachHelp(this);
			});
		}
		
		var questionPanel = $('[cc-panel=' + question.id + ']');
		
		questionPanel.find('> .questionContainer > .questionHelpButton, > .layoutHorizontalRow > .questionHelpButton').on('click', function(){
			questionPanel.find('> .questionContainer > .questionHelpContainer, > .questionHelpContainer').toggle();
		});
	};
	
	cc_Renderer.attachLayout = function (question){
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.attachLayout(this);
			});
		}

		if(question.type.value === "type-less"){
			var layout = cc_Model.getProperty(cc_Renderer.PROPERTY_LAYOUT, question);
			
			if(layout != null && layout == 'Horizontal'){
				var questionPanel = $('[cc-panel=' + question.id + ']');
				
				if(cc_Model.getProperty(cc_Renderer.PROPERTY_LAYOUT_TEXT_POSITION, question) === 'Fixed'){
					questionPanel.find('> .questionContainer.fullWidthQuestion').removeClass('fullWidthQuestion').addClass('fixedWidthQuestion');
				}
				
				var row = null;
				if (question.hasSubQuestions) {				
					
					var hasMustAnswerSubQuestion = false;
					
					$.each(question.subQuestions, function (i) {
						var subQuestion = this;
						var isNewRow = i === 0 || cc_Model.getProperty(cc_Renderer.PROPERTY_LAYOUT_NEW_ROW, this) === 'true';
						var columns = cc_Model.getProperty(cc_Renderer.PROPERTY_LAYOUT_COLUMNS, this);
						
						if(hasMustAnswerSubQuestion === false){
							hasMustAnswerSubQuestion = subQuestion.mustAnswer;
						}
						
						if(isNewRow === true){
							questionPanel.append('<div class="row layoutHorizontalRow"></div>');
							row = questionPanel.find('> .row:last');
						}
						
						var subQuestionPanel = $('[cc-panel=' + this.id + ']');
						subQuestionPanel.addClass('col-md-' + (columns ? columns : '4'));
						
						if(subQuestion.type.value == 'boolean' || subQuestion.type.styleName == 'radio'){
							subQuestionPanel.find('> .questionContainer').removeClass('fixedWidthQuestion').addClass('floatingWidthQuestion');
						}
						
						row.append(subQuestionPanel.detach());
					});
					
					if(hasMustAnswerSubQuestion === true){
						questionPanel.find('> .questionContainer > .questionAnnotationsAndText > .questionAnnotations').html(
							cc_View.createQuestionHeadingMustAnswerHtml(true)
						);
					}
					
					if(cc_Model.getProperty(cc_Renderer.PROPERTY_HELP_TEXT, question) != null){
						questionPanel.find('> .layoutHorizontalRow:first').append(questionPanel.find('> .questionContainer > .questionHelpButton'));
						questionPanel.append(questionPanel.find('> .questionContainer > .questionHelpContainer'));
					}
				} 
			}
		}
	};
	
	cc_Renderer.attachDecorator = function (question){
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.attachDecorator(this);
			});
		}

		if(question.type.value === "number"){
			var jFieldRaw = cc_View.findQuestionFieldById(question.id);
			var jFieldDecorator = cc_View.findQuestionFieldDecoratorByField(jFieldRaw);
			
			if(cc_UI.isMobileDevice() === true){
				// input[type=number] is used for mobile devices so the number part of the keypad is
				// brought up instead of the aplha. however the native number input on webkit will clear
				// the whole entered valeu if it contains inputs other than '-, ., 0-9'. as such the below logic
				// restricts input to those keys
				jFieldRaw.keypress(function(e) {
					if (e.which != 45 && e.which != 46 && !(e.which >= 48 && e.which <= 57)) {
						return false;
					}
				});
			}
			
			jFieldRaw.on("blur", function () {
				cc_Renderer.handleQuestionFieldExit(question, jFieldRaw, jFieldDecorator);
			});
			
			jFieldDecorator.on("focus", function (e) {
				cc_Renderer.handleQuestionFieldEnter(question, jFieldRaw, jFieldDecorator);
			});
			
			// after attaching the decorator execute a simulated blur to populated the decorated value
			cc_Renderer.handleQuestionFieldExit(question, jFieldRaw, jFieldDecorator);
		}
	};
	
	cc_Renderer.handleQuestionFieldEnter = function (question, jFieldRaw, jFieldDecorator){
		// on focus of the decorator only show the field
		jFieldDecorator.hide();
		// focus before showing so that the text selection is seemless when handing over from the decorator
		jFieldRaw.focus().show().focus();
	};
	
	cc_Renderer.handleQuestionFieldExit = function (question, jFieldRaw, jFieldDecorator){
		var raw = jFieldRaw.getValue();
		var entered = null;
		
		if(raw && raw != ''){
			var decorator = cc_Model.getProperty(cc_Renderer.PROPERTY_DECORATOR, question);
			
			var formatterOptions = {};
			if(decorator != null && numeral.kind(decorator) == 'percentage'){
				formatterOptions.scalePercentBy100 = cc_Renderer.shouldScalePercentageDecoratedQuestionBy100(question);
			}
			
			var parsed = numeral(raw, formatterOptions);
			entered = parsed.input(); // entered as typed 
			
			// can input be parsed as a number (ie a value)
			var isParsedAsNumber = parsed.value() != null;
			
			if(isParsedAsNumber){
				// convert value back and forth. this will create the unformatted input value.
				//	for example: 1k becomes 1000, 1 000 becomes 1000, $1000 becomes 1000, 1,000 becomes 1000, 1000 becomes 1000
				entered = numeral(parsed.value()).value(); 
			}
			
			if(isParsedAsNumber && entered != null && decorator){
				// when there is an entered number decorate it
				jFieldDecorator.setValue(parsed.format(decorator, null, formatterOptions));
				
			}else{
				// otherwise update the decorator. this includes:
				// 	1. entered numbers without a decorator
				//	2. invalid inputs
				jFieldDecorator.setValue(entered);
			}
			
		}else{
			// user has cleared the field value so clear the decorator
			jFieldDecorator.setValue(entered);
		}
		
		// this does two things:
		// 	1. 	if the value as typed is different to the converted value then update the field.
		// 		the rule here is that the field must always have an unformatted number
		//	2. 	ensures that the text in the field is unselected (i.e. setting value clears the text selection)
		jFieldRaw.setValue(entered);
		
		// update entered value to trigger dependent logic including updating the model
		cc_Renderer.getQuestionEnteredValue(question, entered);
		
		// on blur of the field only show the decorator
		jFieldRaw.hide();
		jFieldDecorator.show();
	};
	
	cc_Renderer.shouldScalePercentageDecoratedQuestionBy100 = function (question){
		var scalePercentBy100 = false;
		
		if(cc_Util.isVersionLessThan(cc_Config.serverVersionOnRulebookSave, "11.1.0")){
			// backward compatible behaviour.
			// when decorated numbers are inputted using a '%' format they were always scaled by 100. this can create an unexpected outcome for a user. for example inputting '22' resulted as 2200%.
			scalePercentBy100 = true;
			
		}else if(cc_Util.isVersionLessThan(cc_Config.serverVersionOnRulebookSave, "11.2.0")){
			// backward compatible behaviour.
			// percentage inputs are not scaled by default. instead only numbers which have a '%' decorator and an allowed value of between 0 and 1 will be scaled by 100.
			scalePercentBy100 = (question.values[1].value - question.values[0].value) == 1;
			
		}else{
			// only scale percentages when the rulebook specifies scaling is required (i.e. leave it up to the author)
			var useDecimalPercentage = cc_Model.getProperty(cc_Renderer.PROPERTY_DECORATOR_USE_DECIMAL_PERCENTAGE, question);
			scalePercentBy100 = (useDecimalPercentage != null && useDecimalPercentage === 'true'); 
		}
		
		return scalePercentBy100;
	};
	
	cc_Renderer.hasExternalWidgets = function (question) {
		var hasExternalWidgets = (question.type.externalWidget != null && question.type.externalWidget.getEnteredFunktion != null); // get entered is mandatory
		
		if(hasExternalWidgets === false && question.hasSubQuestions === true) {
			for(var i = 0; i < question.subQuestions.length; i++){
				hasExternalWidgets = cc_Renderer.hasExternalWidgets(question.subQuestions[i]);
				
				if(hasExternalWidgets === true){
					break;
				}
			};
		}
	
		return hasExternalWidgets;
	};
	
	cc_Renderer.applyExternalWidgetAddToHeadFunction = function (question, externalWidgetsAddedToHead) {
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.applyExternalWidgetAddToHeadFunction(this, externalWidgetsAddedToHead);
			});
		}
		
		// only add to head once per external widget definition
		if(question.type.externalWidget && question.type.externalWidget.addToHeadFunktion != null && $.inArray(question.id, externalWidgetsAddedToHead) == -1){
			var html = eval(question.type.externalWidget.addToHeadFunktion + ';' + question.type.externalWidget.addToHeadFunktionName + '();');
			
			if(html){
				$('head').append(html);
				externalWidgetsAddedToHead.push(question.id);
			}
		}
	};
	
	cc_Renderer.renderQuestionAfterExternalWidgetsAreReadyToRender = function (question, doRenderQuestion) {
		var outstandingIsReadyToRenderTimers = [];
		
		// logic to ensure all questions are rendered
		var renderQuestionWhenReadyToRender = function(){
			
			// there is an outstanding question to be rendered (note: this include the question plus its sub questions)
			if(outstandingIsReadyToRenderTimers.length > 0){
				// external widget is not ready to be rendered, so wait then try again.
				// please note: a timeout is required so that the <script... tag which could have been added in the add-to-head is not blocked downloading
				setTimeout(renderQuestionWhenReadyToRender, 200);
				
			}else{
				// question is ready to be rendered
				doRenderQuestion();
			}
		};

		// run the is-ready-to-render, this will add to the outstandingIsReadyToRenderTimers
		cc_Renderer.applyExternalWidgetIsReadyToRenderFunction(question, outstandingIsReadyToRenderTimers);
		
		// start checking if question is ready to render (this includes all of its sub questions)
		renderQuestionWhenReadyToRender();
	}
	
	cc_Renderer.applyExternalWidgetIsReadyToRenderFunction = function (question, outstandingIsReadyToRenderTimers) {
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.applyExternalWidgetIsReadyToRenderFunction(this, outstandingIsReadyToRenderTimers);
			});
		}
		
		if(question.type.externalWidget && question.type.externalWidget.isReadyToRenderFunktion != null){
			var isReadyToRenderChecker = function() {
				var isReadyToRender = false;
					
				try{
					isReadyToRender = eval(question.type.externalWidget.isReadyToRenderFunktion + ';' + question.type.externalWidget.isReadyToRenderFunktionName + '();');
				}catch(e){
					isReadyToRender = false;
				}
				
				if (isReadyToRender === true) {
					cc_Util.removeElement(outstandingIsReadyToRenderTimers, question.id); // question is ready to render so remove it as outstanding

				}else{
					if(outstandingIsReadyToRenderTimers.indexOf(question.id) == -1){ // new checker so add it to the list
						outstandingIsReadyToRenderTimers.push(question.id); // only add once
					}
					
					// retry so we know that we are in a position to render
					setTimeout(isReadyToRenderChecker, 200);
				}
			}
			
			isReadyToRenderChecker(); // start checking if the specific external widget question is ready to render
		}
	};
	
	cc_Renderer.applyExternalWidgetOnRenderingCompleteFunction = function (question) {
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.applyExternalWidgetOnRenderingCompleteFunction(this);
			});
		}
		
		if(question.type.externalWidget && question.type.externalWidget.onRenderingCompleteFunktion){
			eval(question.type.externalWidget.onRenderingCompleteFunktion + ';' + question.type.externalWidget.onRenderingCompleteFunktionName + '();');
		}
	};
	
	cc_Renderer.applyExternalWidgetGetEnteredFunction = function (question) {
		var entered = null;
		
		if(question.type.externalWidget && question.type.externalWidget.getEnteredFunktion){
			entered = eval(question.type.externalWidget.getEnteredFunktion + ';' + question.type.externalWidget.getEnteredFunktionName + '();');
		}
		
		if(entered === null){
			entered = [];
			
		}else{
			for (var i = 0; i < entered.length; i++){
				if (!entered[i]){
					// convert null to a string representation, because the rules engine cant accept null values in the entered array
					entered[i] = 'null';
				}
			}
		}
		
		return entered;
	};
	
	cc_Renderer.attachValidator = function (question) {
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.attachValidator(this);
			});
		}
		
		if (question.hasValidator) {
			// debounce is to stop the error being shown when a question is selected then the user presses the next button
			cc_View.findQuestionFieldById(question.id).bind("blur", $.debounce(1000, function () {
				var question = cc_Model.anyLevelQuestionMap[$(this).attr('cc-field')];

				// server side errors controlled by ???
				if(question && cc_Renderer.hasServerSideError(question.id) === false){
					cc_Renderer.detachError(question.id);
					
					var entered = cc_Renderer.getQuestionEnteredValue(question);
					
					// validator is only supported for questions with a single entered value
					if (entered && entered.length == 1 && entered[0].length > 0) {
						// in the entered value replace double quote with single quote 
						var validationCommand = question.validator.funktion + ';' + question.validator.funktionName + '("' + entered[0].replace(/"/g, "'") + '");';
						
						var validationError = eval(validationCommand);
						
						if (validationError) {
							cc_Model.allErrorsMap[question.id] = {
								id : question.id,
								message : validationError
							};
							
							cc_Renderer.attachError(question.id, validationError, "client");
						}
					}
				}
			}));
		} 
	};
	
	cc_Renderer.hasServerSideError = function (questionId) {
		return cc_View.findErrorPanelById(questionId).find('[data-raised-by=server]').length != 0;
	};
	
	cc_Renderer.updateIsQuestionPanelViewable = function (question, questionPanel) {
		if(cc_View.isViewableQuestion(question) == true){
			questionPanel.removeClass('hiddenQuestionPanel').addClass('shownQuestionPanel');
		}else{
			questionPanel.removeClass('shownQuestionPanel').addClass('hiddenQuestionPanel');
		}
	};
	
	cc_Renderer.updateTextValue = function (question) {
		var questionPanel = cc_View.findQuestionPanelById(question.id);
		
		// add document question returns a null text value when adding/removing a document
		var isAddDocumentQuestion = question.type.value == "add-document";
		
		if(questionPanel.length != 0 && isAddDocumentQuestion == false){
			var textPanel = cc_View.findQuestionTextById(question.id);
			var textSpan = textPanel.find('span').empty();
			
			if(question.text){
				textSpan.html(cc_View.createQuestionText(question));

				questionPanel.removeClass('hiddenQuestionTextPanel').addClass('shownQuestionTextPanel');
			}else{
				questionPanel.removeClass('shownQuestionTextPanel').addClass('hiddenQuestionTextPanel');
			}
			
			// this logic is required for typeless questions without a text value which
			// are have been attached but are not viewable. when setting a text value on them,
			// questions of this type need to be shown
			cc_Renderer.updateIsQuestionPanelViewable(question, questionPanel);
		}
	};
	
	cc_Renderer.updateResultValue = function (question) {
		if(cc_View.findQuestionPanelById(question.id).length != 0){
			var panel = cc_View.findResultPanelById(question.id).empty();
			
			if(question.result){
				panel.append(cc_View.createResultMessage(question.result));
			}
		}
	};
	
	cc_Renderer.updateValuesValue = function (question) {
		if(question.values){
			if (question.type.hasAnInputType) {
				
				switch (question.type.value) {	
					case 'single-select':
						// remove existing values and recreate
						if(question.type.styleName == 'radio'){
							$('[cc-group-question-id="' + question.id + '"]').empty().append(cc_View.createSingleSelectRadioOptionsHtml(question));
							
						}else if(question.type.styleName == 'list'){
							$('select[cc-field="' + question.id + '"]').empty().append(cc_View.createSingleSelectListOptionsHtml(question));
							
						}else if(question.type.styleName == 'auto-complete'){
							$('input[cc-field="' + question.id + '"]').setValue('');
							$('input[cc-field="' + question.id + '"]').autocomplete('option', 'source', question.values);
						}
						
						break;
					case 'multi-select':
						// remove existing values and recreate
						$('[cc-group-question-id="' + question.id + '"]').empty().append(cc_View.createMultiSelectOptionsHtml(question));
						break;
				}
				
				var previousQuestionState = cc_Model.getQuestionRenderedState(question);
				
				if(previousQuestionState){
					if(previousQuestionState.entered){
						// ensure the original entered state is applied (if option still exists)
						cc_Renderer.updateEnteredValue(question, previousQuestionState.entered);
					}
					
					// reapply correct disabled state
					cc_Renderer.updateDisabledValue(question, false);
				}
			}
		}
	};
	
	cc_Renderer.updateDisabledValue = function (question, updateSubQuestions) {
		var isDisabled = question.disabled === true || question.page.readOnly === true;
		
		if(question.type.value === 'search'){
			var isFieldDisabled = true;
			
			// an input restricted question has had its input stopped. even though the input is disabled this does not mean
			// the question is disabled from a CC.getQuestion().setDisabled() perspective. therefore if the question is input restricted
			// don't enable when CC.getQuestion().isDisabled() == false
			if(isDisabled === true){
				cc_View.findQuestionHideablePanelById(question.id).hide();
			}else{
				cc_View.findQuestionHideablePanelById(question.id).show();
				
				// only enable the search field when it is blank (ie no selected value and teh not match link has not been pressed)
				if(question.entered[0] == null){
					isFieldDisabled = false;
				}
			}
		}else{
			isFieldDisabled = isDisabled;
		}
		
		// we need to update all fields not just the enterable ones, for instance add-document upload button or button groups.
		// all disableable inputs of this type have the cc-disableable attribute
		var disableableQuestion = cc_View.findQuestionDisabledById(question.id);
		
		// prop is used for inputs and attr is used for labels (i.e. button group options)
		disableableQuestion.prop('disabled', isFieldDisabled).attr('disabled', isFieldDisabled);
		disableableQuestion.parent().find('.dropdown-toggle').prop('disabled', isFieldDisabled);
		
		if (updateSubQuestions === true && question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.updateDisabledValue(this, true);
			});
		}
	};
	
	cc_Renderer.updateEnteredValue = function (question, entered, updateSubQuestions) {
		var questionPanel = cc_View.findQuestionPanelById(question.id);
		
		if (question.type.hasAnInputType) {
			var currentEnteredValue = cc_Renderer.getQuestionEnteredValue(question); // current value on the DOM
			var hasChangedEnteredValue = cc_Util.areArraysEqual(currentEnteredValue, entered) === false;
			
			// only update the DOM when the updated entered value is different.
			// note: add document questions are rendered for the first time via updateFieldValue() not via the view.
			// so lets always update the field just to ensure its is rendered correctly
			if(hasChangedEnteredValue === true || question.type.value === "add-document"){
				cc_Renderer.updateFieldValue(question, entered);
			}
			
			cc_Model.updateQuestionEnteredRenderedState(question, entered);
		}
		
		if(typeof updateSubQuestions === "undefined" || updateSubQuestions === true){
			if (question.hasSubQuestions) {
				cc_Util.invokeOnElements(question.subQuestions, function () {
					cc_Renderer.updateEnteredValue(this, this.entered, true);
				});
			}
		}
		
		// ensure question is correctly shown
		cc_Renderer.updateIsQuestionPanelViewable(question, questionPanel);
	};
	
	cc_Renderer.updateFieldValue = function (question, entered) {
		if(question.type.value === 'add-document'){
			var questionPanel = cc_View.findQuestionPanelById(question.id);
			questionPanel.find('.questionContent').empty().append(cc_View.createAddDocumentQuestionContentHtml(question));
			
			cc_Renderer.attachAddDocumentButtonListeners(questionPanel, question);
			
		}else{
			var jField = cc_View.findQuestionFieldById(question.id);
			
			if(entered && entered.length > 0){
				switch (question.type.value) {
					case 'free-text':
					case 'number':
					case 'range':
					case 'boolean':	
					case 'single-select':
					case 'multi-select':
						if(jField.length > 1){
							var customStyle = cc_Model.getProperty(cc_Renderer.PROPERTY_STYLE, question);
							
							// radio buttons and check box groups have multiple fields which need to be selected by the value of the correct field
							$.each(jField, function(){
								var hasValue = $.inArray(this.value, entered) != -1;
								
								$(this).setValue(hasValue ? this.value : null);
								
								if(hasValue){
									if(customStyle != null && customStyle == 'ButtonGroup'){
										$(this).parent().addClass('active');
									}
								}
							});
						}else{
							// text boxes, drop downs etc which have a single value
							jField.setValue(entered[0]);
							
							if(question.type.value === 'number'){
								cc_Renderer.refreshDecoratedValue(question);
							}
						}
						break;
						
					case 'search':
						cc_Renderer.updatedSearchEnteredValue(question.id, entered[0], entered[1] ? entered[1] : null);
						break;
						
					case 'date':
						var date = entered[0].split('-'); 
						// parse segments as ints to remove leading zeros
						cc_View.findQuestionFieldById(question.id, ':eq(0)').setValue(parseInt(date[2]));
						cc_View.findQuestionFieldById(question.id, ':eq(1)').setValue(parseInt(date[1]));
						cc_View.findQuestionFieldById(question.id, ':eq(2)').setValue(parseInt(date[0]));
						break;
				}
				
			}else{
				jField.setValue(null);
				
				// clear active
				if(cc_Renderer.hasButtonGroupStyle(question)){
					cc_Renderer.clearActiveButtonGroup(question);
				}
				
				// clear decorated value
				if(question.type.value === 'number'){
					cc_Renderer.refreshDecoratedValue(question);
				}
			}
		}	
	}
	
	cc_Renderer.clearActiveButtonGroup = function (question){
		var jField = cc_View.findQuestionFieldById(question.id);
		var jLabel = cc_View.findQuestionLabelByField(jField);
		$(jLabel).removeClass('active');
	}
	
	cc_Renderer.refreshDecoratedValue = function (question){ 
		var jFieldRaw = cc_View.findQuestionFieldById(question.id);
		var jFieldDecorator = cc_View.findQuestionFieldDecoratorByField(jFieldRaw);
		
		// after updating the raw value execute a simulated blur to populated the decorated value
		cc_Renderer.handleQuestionFieldExit(question, jFieldRaw, jFieldDecorator);
	};	
	
	cc_Renderer.updatedSearchEnteredValue = function (questionId, selectionType, selectionResult) {
		var jPanel = $(cc_View.findQuestionPanelById(questionId));
		var jField = $(cc_View.findQuestionFieldById(questionId));
		var fieldValue = null;
		var restrictSearchAccess = null;
		
		if(selectionType === 'MATCH_SELECTED'){
			var selectionResultIsAString = (typeof selectionResult === 'string' || selectionResult instanceof String);
			var selectionResultAsString, selectionResultAsObject;
			
			if(selectionResultIsAString === true){
				selectionResultAsString = selectionResult;
				selectionResultAsObject	= JSON.parse(selectionResult);
			}else{
				selectionResultAsString = cc_Util.stringify(selectionResult);
				selectionResultAsObject	= selectionResult;
			}
			
			// the user has selected a value from the drop list so we set the type of MATCH_SELECTED and stringify the selected object.
			// these two items become the first and second elements in the entered value
			jField.attr('data-search-selection-type', 'MATCH_SELECTED').attr('data-search-selection-result', selectionResultAsString).blur();
			jPanel.find('.editSearchButton').show();
			jPanel.find('.searchNoMatchLink').hide();
			jPanel.find('.searchAgainLink').hide();
			jPanel.find('.ui-autocomplete-input').show();
			fieldValue = selectionResultAsObject.label;
			restrictSearchAccess = true;
			
		}else if(selectionType === 'NO_MATCH_SELECTED'){
			// set the entered type as NO_MATCH_SELECTED and clear the selected item result. this will lead to an enetred value length or 1.
			// note: blur is called to trigger the question field update listeners as the NO_MATCH_SELECTED is a valid entered value. so the
			// question is considered answered.
			jField.setValue('').attr('data-search-selection-type', 'NO_MATCH_SELECTED').attr('data-search-selection-result', '').blur();
			jPanel.find('.editSearchButton').hide();
			// once is search question has the no match link pressed the user no longer has the ability to search for a value
			jPanel.find('.searchNoMatchLink').hide();
			jPanel.find('.searchAgainLink').show();
			jPanel.find('.ui-autocomplete-input').hide();
			restrictSearchAccess = true;
			
		}else if(selectionType === null){
			// reset question back to its initial state
			jField.setValue('').attr('data-search-selection-type', '').attr('data-search-selection-result', '').focus();
			jPanel.find('.editSearchButton').hide();
			jPanel.find('.searchNoMatchLink').show();
			jPanel.find('.searchAgainLink').hide();
			jPanel.find('.ui-autocomplete-input').show();
			restrictSearchAccess = false;
		}
		
		// parse the json string to get the label property which contains the string to be shown in the dropdown
		jField.setValue(fieldValue).prop('disabled', restrictSearchAccess);
		jField.parent().find('.dropdown-toggle').prop('disabled', restrictSearchAccess);
	};
	
	cc_Renderer.attachAddDocumentButtonListeners = function (jQuestionPanel, question) {
		var jMissingDocumentPanel = jQuestionPanel.find('.missingDocumentPanel');
		if(jMissingDocumentPanel.length > 0){
			var documentFile = jMissingDocumentPanel.find('.uploadDocumentFile');
			if (documentFile.length > 0) {
				documentFile.change(function(){
					if (jQuestionPanel.find(".uploadDocumentFile")[0].value != "") {
						cc_EntityIntegration.addDocumentToQuestion(cc_Config.applicationId, question.id, jQuestionPanel.find('form')); 
					}
				});
			}
		}
		
		var jAddDocumentPanel = jQuestionPanel.find('.addedDocumentPanel');
		if(jAddDocumentPanel.length > 0){
			jAddDocumentPanel.find('.removeDocumentButton').click(function(){
				cc_EntityIntegration.removeDocumentFromQuestion(cc_Config.applicationId, question.id, $(this).attr('data-documentid')); 
			});
		}
	};
	
	cc_Renderer.bindSubQuestions = function (question, parent) {
		if (question.hasSubQuestions) {
			cc_Util.invokeOnElements(question.subQuestions, function () {
				cc_Renderer.bindSubQuestions(this, question);
			}, question);
		} 
		
		if (question.hasParentQuestion && parent != null ) {
			if (question.onlyAskIfParentIsAnyAnswer == true || question.onlyAskIfParentHasAnswer == true) {
				var parentId = question.parentQuestionId;
				
				cc_View.findQuestionFieldById(parentId).bind("change", [parent, question] , function (event) {
					cc_Renderer.handleParentChangeEvent(event.data[0], event.data[1]);
					
				}).bind("keydown", function (event){
					var code = event.charCode || event.keyCode;
					
					if(code && code == 9) { 
						// tab pressed so check if new sub questions are exposed
						// then refocus on the tabbed field and continue with tab
						$(this).change().focus();
					};
				});
			}
		}
	};
	
	cc_Renderer.handleParentChangeEvent = function (triggeringQuestion, listeningQuestion) {
		var parentEnteredValue = cc_Renderer.getQuestionEnteredValue(triggeringQuestion);

		var match = false;
		 
		if(listeningQuestion.concealed == false){
			if (parentEnteredValue && parentEnteredValue.length > 0) {
				if (listeningQuestion.onlyAskIfParentIsAnyAnswer == true) {
					$.each(parentEnteredValue, function () {
						if (listeningQuestion.onlyAskIfParentIsAnyAnswerValues == null) {
							match = true;
							
						}else if ($.isArray(listeningQuestion.onlyAskIfParentIsAnyAnswerValues)) {
							if ($.inArray(this.toString(), listeningQuestion.onlyAskIfParentIsAnyAnswerValues) != -1) {
								match = true;
								return false;
							}
						}else if (this.toString() == listeningQuestion.onlyAskIfParentIsAnyAnswerValues) {
							match = true;
							return false;
						}
						 
						return true;
					});
				}else if (listeningQuestion.onlyAskIfParentHasAnswer == true) {
					match = true;
				}
			}
			
			if (match) {
				cc_View.findQuestionPanelById(listeningQuestion.id).show();
			}else{
				cc_View.findQuestionPanelById(listeningQuestion.id).hide();
			}
		}
		
		// ensure inclusion state is kept up to date when question visibility is updated 
		cc_Model.updateQuestionInclusionRenderedState(listeningQuestion, match);
	};
	
	cc_Renderer.attachFieldChangeListeners = function () {
		var jAllFieldsOnPage = $('#' + cc_Model.getSelectedPageId() + '.questions')
			.find('input[cc-field]:enabled, button[cc-field]:enabled, select[cc-field]:enabled, textarea[cc-field]:enabled')
			.not('.cc-listener-attached');
		
		if(jAllFieldsOnPage.length > 0){	
			var callback = function(){
				cc_Renderer.handleFieldChange(this);
			};
			
			var onEvent = function(debounceHandler){
				return function(){
					var selectedPage = $("#" + cc_View.getPageDivId(cc_Model.getSelectedPageId()));
					var isShowingInterviewDialog = cc_View.isShowingDialogId("interviewDialog");
					
					// store the scroll top position when the user triggered field change the event
					cc_Renderer.lastQuestionChangedScrollTop = isShowingInterviewDialog === true ? selectedPage.offset().top : document.documentElement.scrollTop;
					
					debounceHandler.call(this);
				}
			};
			
			// do not change these values as focusing can become messed up
			// -> for example on entering a value then press tab, if the question has a server trigger, is the correct question focused once the throbber goes away?
			jAllFieldsOnPage.filter('input[type=text], input[type=number], textarea') // note number is used on mobile devices
				.bind('blur', onEvent($.debounce(250, callback))); // allow enough time to focus on the next question if the user has tabbed
			
			// tablet text field editor disappears on debounce trigger
			if(cc_UI.isMobileDevice() === false){
				jAllFieldsOnPage.filter('input[type=text], textarea')
					.bind('keydown', onEvent($.debounce(2500, callback))); // allow enough time for user to think and add more characters
			}
			
			jAllFieldsOnPage.filter('select, input[type=radio], input[type=checkbox]')
				.bind('change', onEvent($.debounce(75, callback))); // allow enough time to focus on the next question if the user has tabbed
			
			jAllFieldsOnPage.addClass('cc-listener-attached'); // ensure listener is only attached once
		}
	};
	
	cc_Renderer.handleFieldChange = function (field) {
		// if the field is not visible then it means the user has changed pages. therefore the 
		// change was already sent to the server and processed so when can ignore this event
		if(cc_View.findQuestionPanelByField(field).is(':visible') === true){
			var question = cc_Model.anyLevelQuestionMap[$(field).attr('cc-field')];
			var questionState = cc_Model.anyLevelQuestionRenderedStateMap[question.id];
			
			var isQuestionTriggerToAskAnotherQuestion = cc_Model.isQuestionTriggerToAskAnotherQuestion(question.id);
			
			if(questionState){
				var previousEnteredValue = questionState.entered;
				var updatedEnteredValue = cc_Renderer.applyEnteredSubstitution(question, cc_Renderer.getQuestionEnteredValue(question));
				
				var hasChangedEnteredValue = cc_Util.areArraysEqual(previousEnteredValue, updatedEnteredValue) === false;

				if(hasChangedEnteredValue === true){
					cc_Renderer.updateEnteredValue(question, updatedEnteredValue, false); // don't update sub questions
					
					if(isQuestionTriggerToAskAnotherQuestion === true){
						var quickfill = null;
						if (cc_View.getContainingDialogId(field) == "quickfillDialog") {
							var customOperationId = cc_OperatorPortalAPI._dialogs.quickfill.getQuickfillDialogCustomOperationId();
							quickfill = cc_OperatorPortalAPI._dialogs.quickfill.getQuickfillFromCustomOperationId(customOperationId);
							
						}
						
						cc_Controller.save("QUESTION_TRIGGER", null, question.id, null, null, null, quickfill);
						
					}else{
						cc_Renderer.refreshPageWizard();
					}
					
					if(cc_EntityIntegration.onPostChangedEnteredValue){
						cc_EntityIntegration.onPostChangedEnteredValue(question, updatedEnteredValue);
					}
				}
			}
		}
	};
	
	cc_Renderer.applyEnteredSubstitution = function (question, updatedEnteredValue) {
		if(question != null && question.type.value === 'free-text' && updatedEnteredValue != null && updatedEnteredValue.length > 0){
			var regexMatch = cc_Model.getProperty(cc_Renderer.PROPERTY_ENTERED_REGEX_MATCH, question);
			var regexSubstitution = cc_Model.getProperty(cc_Renderer.PROPERTY_ENTERED_REGEX_SUBSTITUTION, question);
			
			if(regexMatch != null && regexSubstitution != null){
				try{
					var substitutionUpdatedEnteredValue = updatedEnteredValue[0].replace(new RegExp(regexMatch, 'gm'), regexSubstitution)	
					
					if(updatedEnteredValue[0] !== substitutionUpdatedEnteredValue){
						cc_Renderer.updateFieldValue(question, [substitutionUpdatedEnteredValue]);
						updatedEnteredValue = cc_Renderer.getQuestionEnteredValue(question);
					}	
				}catch(e){
					// if we can't suppress then lets skip and move on
				}
			}
		}
		
		return updatedEnteredValue;
	};
	
	// TODO cc_Renderer.getCurrentFocusedQuestion() and cc_UI.getFocusedQuestionId() should be merged
	cc_Renderer.getCurrentFocusedQuestion = function () {
		var focused = cc_Util.getFocused();
		
		return (focused && focused.length > 0) ? $(focused).attr('cc-field') : null;
	};

	cc_Renderer.snapshotQuestionFocus = function () {
		cc_Renderer.focusedQuestionId = cc_Renderer.getCurrentFocusedQuestion();
		
		//cc_Util.log("cc_Renderer.snapshotQuestionFocus()", cc_Renderer.focusedQuestionId);
	};
	
	cc_Renderer.reinstateQuestionFocus = function () {
		var focused = cc_Util.getFocused();
		
		// only reinstate to the snapshoted focused question when their is no current focused item.
		// it is better to keep the users currently selected focus than revert to the last snapshoted question. 
		// the reinstatement is used when the throbber has been shown and focus was lost
		if(focused && focused.length == 0){
			cc_Util.log("cc_Renderer.reinstateQuestionFocus()", cc_Renderer.focusedQuestionId);
			
			if(cc_Renderer.focusedQuestionId && cc_Renderer.focusedQuestionId.length > 0){
				cc_View.findQuestionFieldById(cc_Renderer.focusedQuestionId).focus();
				cc_Renderer.focusedQuestionId = null;
			}
		}
	};
	
	cc_Renderer.refreshPageWizard = function(){
		$(".panel-collapse .panel-body").find(".buttonPanel").unbind().remove();
		var sectionContainer = $(".panel-collapse .panel-body .sections-container");

		$.each(sectionContainer, function(){
			var pageId = $(this).closest('[cc-page-id]').attr('cc-page-id');

			var buttonPanel = cc_View.createButtonPanel(cc_Model.isInterviewComplete,
					cc_EntityIntegration.createNextButtonText(cc_Model.isFirstPageSelected, cc_Model.isLastNonRestrictedPageSelected, cc_Model.isReadyToFinish, cc_Model.isInterviewComplete, cc_Model.treatInterviewAsCompletedOnLoad),
					cc_EntityIntegration.createPreviousButtonText(cc_Model.isFirstPageSelected,	cc_Model.isLastNonRestrictedPageSelected, cc_Model.isReadyToFinish, cc_Model.isInterviewComplete, cc_Model.treatInterviewAsCompletedOnLoad),
					cc_EntityIntegration.createSaveButtonText(cc_Model.isFirstPageSelected, cc_Model.isLastNonRestrictedPageSelected, cc_Model.isReadyToFinish, cc_Model.isInterviewComplete, cc_Model.treatInterviewAsCompletedOnLoad),
					pageId
			);

			$(this).before(buttonPanel);
			$(this).after(buttonPanel);

			var shouldDisableNext = false;

			if (pageId == "AffordabilityAssessmentChooseYourBanks") {
				// disable 'Next' button when no banks selected

				// Ensure that dataholders exist to allow continuation in event of error
				if ($('.dataholder-select-input').length !== 0) {
					shouldDisableNext = $('.dataholder-select-input:checked').length === 0;
				}
			}

			if (shouldDisableNext) {
				$("#" + pageId + " .buttonPanel").children("button.next").addClass("disabled");
			} else {
				$("#" + pageId + " .buttonPanel").children("button.next").removeClass("disabled");
			}
		});

		$(".panel-heading").unbind().click($.throttle(1500, function () {
			var tagName = $(this).tag();
			var a = null;

			if(tagName === "div"){
				a = $(this).find("a");
			}else if(tagName === "a"){
				a = $(this);
			}

			if(a){
				var pageId = a.attr("href").split("#")[1];
				cc_Controller.save("PAGE_SELECTION", pageId);
			}
		}));


		$(".buttonPanel").children("button.next").click($.throttle(2500, function(e) {
			// Prevent submission if button is disabled
			// Button is disabled by button selector widget
			if ($(this).hasClass('disabled')) {
				return;
			}

			e.preventDefault();
			cc_Controller.save("NEXT");
		}));
		$(".buttonPanel").children("button.previous").click($.throttle(2500, function(e) {
			e.preventDefault();
			cc_Controller.save("PREVIOUS");
		}));
		$(".buttonPanel").children("button.save").click($.throttle(2500, function(e) {
			e.preventDefault();
			cc_Controller.save("SAVE");
		}));
		$(".buttonPanel").children("button.change").click($.throttle(2500, function(e) {
			e.preventDefault();
			cc_Controller.save("PAGE_SELECTION", $(this).attr('data-page-id'));
		}));

		$('.collapse').unbind().on('show.bs.collapse', function(){
			$(this).parent().find(".panel-heading").addClass("selected");

		}).on('hide.bs.collapse', function(){
			$(this).parent().find(".panel-heading").removeClass("selected");
		});
	};
	
	cc_Renderer.scrollToCaptureUserAttention = function (result) {
		if(cc_Renderer.enableScrollToCaptureUserAttention === true){
		
			// don't scroll when new questions are added to current page
			var hasNewlyShownQuestionsOnSelectedPage = result.newlyShownQuestionsOnSelectedPage && result.newlyShownQuestionsOnSelectedPage.length > 0;
			
			var isScrollableTriggerType = hasNewlyShownQuestionsOnSelectedPage == false && (result.triggerType == "NEXT" || result.triggerType == "PREVIOUS" || result.triggerType == "PAGE_SELECTION");
			
			var firstQuestionInError = $('.questions:visible .errorText:first').closest('.shownQuestionPanel');
			
			// only scroll to error when there is an error and either save or next was pressed
			var hasChangedPage = cc_Model.selectedPageIdBeforeHandleResponse != cc_Model.getSelectedPageId();
			var scrollToFirstQuestionError = firstQuestionInError.length > 0 && hasChangedPage === false && (result.triggerType === "NEXT" || result.triggerType === "SAVE");
			
			if((isScrollableTriggerType === true || scrollToFirstQuestionError === true) && result.isFirstRequest === false){
				var doCaptureUserAttention = function(isAnimated){
					var isShowingInterviewDialog = cc_View.isShowingDialogId("interviewDialog");
					var elementToScrollTo;
					
					if(scrollToFirstQuestionError === true){
						elementToScrollTo = firstQuestionInError;
					}else if(isShowingInterviewDialog === true){
						elementToScrollTo = $('#interviewDialog');
					}else{
						elementToScrollTo = $(window);
					}
					
					if(cc_UI.hasVisibleDialog() === false || isShowingInterviewDialog === true){
						var selectedPageId = cc_Model.getSelectedPageId();
						var selectedPage = $("#" + cc_View.getPageDivId(selectedPageId));
						
						if(isAnimated === true){
							if(isShowingInterviewDialog === true){
								$('#interviewDialog').animate({scrollTop: elementToScrollTo.offset().top - selectedPage.offset().top}, 600, 'linear');
							}else{ 
								$('html,body').animate({scrollTop: elementToScrollTo.offset().top}, 600, 'linear');
							}
						}else{
							if(isShowingInterviewDialog === true){
								elementToScrollTo[0].scrollTo(elementToScrollTo.offset().top - selectedPage.offset().top, 0);
							}else{
								elementToScrollTo[0].scrollTo(0, 0);
							}
						}
					}
				};
						
				// always ensure the page is instantally at the top of the screen, dont animate it there
				if(scrollToFirstQuestionError === false){
					doCaptureUserAttention(false);
				}else{
					$.doTimeout(250, function(){
						doCaptureUserAttention(true);
					});
				}
			}
		}
	};
	
	cc_Renderer.isPageNavigatorVisible = function () {
		return $('#cloudcase-page-navigator').is(':visible');
	};
	
	cc_Renderer.attachNewErrors = function (invalidErrors) {
		cc_Util.invokeOnElements(invalidErrors, function () {
			cc_Renderer.attachError(this.id, this.message, "server");
		});
	};

	cc_Renderer.attachError = function (questionId, message, raisedBy) {
		var questionPanel = cc_View.findQuestionPanelById(questionId);
		
		if(questionPanel.length != 0){
			cc_View.findErrorPanelById(questionId).empty().append(cc_View.createErrorMessage(message, raisedBy));
		}
		
		var question = cc_Model.anyLevelQuestionMap[questionId];
		
		if(question){
			cc_Model.updateQuestionErrorRenderedState(question, message); // when attaching an error ensure the rendered state is up to date
			cc_Renderer.attachPageError(question.page.id);
		}
		
		cc_Renderer.updateIsQuestionPanelViewable(question, questionPanel);
	};
	
	cc_Renderer.attachPageCompletionIcons = function (pageId) {
		if($('#' + cc_View.getPageDivId(pageId) + ' .panel-heading .completedIcon').length == 0) {
			$('#' + cc_View.getPageDivId(pageId) + ' .panel-heading').append(cc_View.createCompletedIcon(pageId));
		}

		
		if ($('#' + cc_View.getPageNavigatorItemId(pageId) + ' .completedIcon').length == 0) {
			$('#' + cc_View.getPageNavigatorItemId(pageId)).addClass("completed");
			$('#' + cc_View.getPageNavigatorItemId(pageId)).prepend(cc_View.createCompletedIcon(pageId));
		}
	};
	
	cc_Renderer.attachPageError = function (pageId) {
		if($('#' + cc_View.getPageDivId(pageId) + ' .panel-heading .errorIcon').length == 0) {
			$('#' + cc_View.getPageDivId(pageId) + ' .panel-heading').append(cc_View.createErrorIcon(pageId));
		}

		if ($('#' + cc_View.getPageNavigatorItemId(pageId) + ' .errorIcon').length == 0) {
			$('#' + cc_View.getPageNavigatorItemId(pageId)).prepend(cc_View.createErrorIcon(pageId));
		}
	};
	
	cc_Renderer.attachPageWarning = function (pageId) {
		if($('#' + cc_View.getPageDivId(pageId) + ' .panel-heading .warningIcon').length == 0) {
			$('#' + cc_View.getPageDivId(pageId) + ' .panel-heading').append(cc_View.createWarningIcon(pageId));
		}

		if ($('#' + cc_View.getPageNavigatorItemId(pageId) + ' .warningIcon').length == 0) {
			$('#' + cc_View.getPageNavigatorItemId(pageId)).prepend(cc_View.createWarningIcon(pageId));
		}
	};
	
	cc_Renderer.detachPageWarning = function (pageId) {
		$('#' + cc_View.getPageDivId(pageId) + ' .panel-heading .warningIcon').remove();
		$('#' + cc_View.getPageNavigatorItemId(pageId) + ' .warningIcon').remove();
	};
	
	cc_Renderer.detachError = function (questionId) {
		var question = cc_Model.anyLevelQuestionMap[questionId];
		
		if (question) {
			cc_Model.updateQuestionErrorRenderedState(question, null); // when detaching an error ensure the rendered state is up to date
			cc_View.findErrorPanelById(question.id).empty();
	
			// if there are no question errors on the page then remove the page level errors
			if($('#' + cc_View.getPageDivId(question.page.id) + ' .errorText:visible').length === 0){			
				$('#' + cc_View.getPageDivId(question.page.id) + ' .errorIcon').remove();
				$('#' + cc_View.getPageNavigatorItemId(question.page.id) + ' .errorIcon').remove();
			}
		}
	};
	
	cc_Renderer.detachPageCompletionIcons = function (questionId) {
		$('.completedIcon').remove();		
	};
	
	cc_Renderer.getQuestionEnteredValue = function (question) {
		var entered = null;
		var jField = cc_View.findQuestionFieldById(question.id);
		
		if (question.type.hasAnInputType) {
			if(question.type.value == 'search'){
				var selectionType = jField.attr("data-search-selection-type")
				var selectionResult = jField.attr("data-search-selection-result");
				
				entered = [];
				if (selectionType && selectionType != '') {
					entered.push(selectionType);
				}
				if (selectionResult && selectionResult != '') {
					entered.push(selectionResult);
				}
				
			}else if (question.type.value == 'date') {
				var rawValue = jField.fieldArray();
				
				// if date segments have not been selected (Y/M/D) then the entered value is blank
				entered = [];
				if(rawValue.length > 0 && (rawValue[0].length > 0 && rawValue[1].length > 0 && rawValue[2].length > 0)){
					entered.push(rawValue[2] + '-' + rawValue[1] + '-' + rawValue[0]);
				}
				
			}else if (question.type.value == 'external-widget') {
				entered = cc_Renderer.applyExternalWidgetGetEnteredFunction(question);
				
			}else{
				var rawValue = jField.getValue();
				
				if (rawValue && rawValue != '') {
					entered = rawValue.split(cc_Config.fieldDelimiter);
				}else{
					entered = [];
				}
			}
		}
		
		return entered; // null can never be retruned
	};
	
	cc_Renderer.flashQuestions = function (questions) {
		cc_Util.invokeOnElements(questions, function(){
			var questionContent = $('[cc-panel=' + this.id + ']:visible .questionContent');
			
			if(questionContent){
				cc_UI.flash(questionContent, 2, 600);
			}
		});

	};
	
	cc_Renderer.flashErrors = function () {
		cc_UI.flash($('.warningIcon, .errorIcon, .errorText'), 1, 600);
	};
	
	cc_Renderer.toRequestData = function(allowFindingsGeneration, includeAllFields){
		return {
			environment: cc_Config.environment,
			rulebookName : cc_Config.rulebookName, 
			rulebookVersion : cc_Config.rulebookVersion, 
			applicationId : cc_Config.applicationId,
			workflowName : cc_Config.workflowName,
			answeredQuestions : cc_Util.stringify(cc_Renderer.dettachQuestions(includeAllFields), cc_Config.uploadCompression.answeredQuestions),
			interactionState : JSON.stringify(cc_Model.interactionState),
			allowFindingsGeneration : allowFindingsGeneration
		};
	};

	cc_Renderer.hasFilesToUpload = function () {
		var hasFilesToUpload = false;
		
		$.each($('input[type=file]:visible'), function(){
			var questionId = $(this).attr('cc-field');
			
			// if there is a value then it means the user has selected a file but not pressed upload
			// note: the value will be 
			if(questionId && $(this).getValue()){
				hasFilesToUpload = true;
			}
		});
		
		return hasFilesToUpload;
	};
	
	// override the default jquery autocomplete menu behaviour.
	// a rendered cloudcase autocomplete question menu should only be as wide as its input.
	// this is to provide a better responsive experience
	var existingAutocompleteResizeMenuFunction = jQuery.ui.autocomplete.prototype._resizeMenu;
	jQuery.ui.autocomplete.prototype._resizeMenu = function () {
		if($(this.menu.element).hasClass('cloudcase-form-autocomplete') === true){
			// make the width of the dropdown the same as the input field (inteview form questions only)
			var ul = this.menu.element;
			ul.outerWidth(this.element.outerWidth());
		}else{
			// or apply default behaviour where the dropdown is a wide as the largest menu item
			existingAutocompleteResizeMenuFunction.apply(this);
		}
	};

	cc_Renderer.hasButtonGroupStyle = function (question) {
		var hasButtonStyle = false;
		
		if (question && question.properties) {
			for (var i = 0; i < question.properties.length; i++) {
				if (question.properties[i].id === 'Style' && question.properties[i].value === 'ButtonGroup') {
					return true;
				}
			}
		}
		return hasButtonStyle;
	};

	/********************************************************************************************************/
	/**** @CC CLIENT_SPECIFIC_CUSTOMIZATION - START
	/**** - this is where functions that add new functionality which don't override default rendering engine functions go
	/**** 
	/**** below is an example of how you add new functionallity. noting the following:
	/**** 	-> the 'cip_Custom' object name needs to be used for all new properties and functions
	/**** 
	/**** 	cip_Custom.lastGetQuestionsTask = null;
	/**** 	
	/**** 	cip_Custom.getLastQuestionInSection = function(pageId, sectionName){
	/**** 		var lastQuestionInSection = null;
	/**** 		
	/**** 		$.each($("#" + cc_View.getSectionDivId(pageId, sectionName) + " .questionPanel:visible"), function(){
	/**** 			var questionId = $(this).attr('cc-panel');
	/**** 			
	/**** 			if(cc_Model.anyLevelQuestionMap[questionId].type.value != "type-less"){
	/**** 				lastQuestionInSection = cc_Model.anyLevelQuestionMap[questionId];
	/**** 			}
	/**** 		});
	/**** 		
	/**** 		return lastQuestionInSection;
	/**** 	};
	/********************************************************************************************************/


	cip_Custom.clientContinueLaterPage_Url = "https://www.regionalaustraliabank.com.au/thank-you/apply-continue-later ";
	// cip_Custom.clientSubmitPage_PersonalLoan_Url = "https://www.regionalaustraliabank.com.au/personal/products/thanks-for-applying---pl";
	cip_Custom.clientSubmitPage_PersonalLoan_202_Url = "http://www.regionalaustraliabank.com.au/thank-you/apply-202-pl";
	cip_Custom.clientSubmitPage_PersonalLoan_203_Url = "http://www.regionalaustraliabank.com.au/thank-you/apply-203-pl";
	cip_Custom.clientSubmitPage_PersonalLoan_403_Url = "http://www.regionalaustraliabank.com.au/thank-you/apply-403-pl";

	// cip_Custom.clientSubmitPage_CreditCard_Url = "https://www.regionalaustraliabank.com.au/personal/products/thanks-for-applying---cc";
	cip_Custom.clientSubmitPage_CreditCard_202_Url = "http://www.regionalaustraliabank.com.au/thank-you/apply-202-cc";
	cip_Custom.clientSubmitPage_CreditCard_203_Url = "http://www.regionalaustraliabank.com.au/thank-you/apply-203-cc";
	cip_Custom.clientSubmitPage_CreditCard_403_Url = "http://www.regionalaustraliabank.com.au/thank-you/apply-403-cc";

	cip_Custom.clientSubmitPage_PersonalCredit_202_Url = "https://www.regionalaustraliabank.com.au/thank-you/apply-202-pl";

	cip_Custom.clientSubmitPage_HomeLoan_202_Url = "https://www.regionalaustraliabank.com.au/thank-you/apply-202-hl-202001";

	cip_Custom.clientSubmitPage_Hardship = "https://www.regionalaustraliabank.com.au/Thank-You/Apply-Financial-hardship-assistance";

	// @CC Copied From: cc_Config.enableLazyQuestionRendering @ v12_1
	cc_Config.enableLazyQuestionRendering = true;

	// @CC Copied From: cc_Controller.save() @ v12_1
	cc_Controller.save = function (triggerType, manuallySelectedPageId, triggeringQuestionId, onQuestionsResponse, isLastNonRestrictedPageSelected) {
		// triggerType are: "PAGE_SELECTION", "SHOW_RESULTS", "QUESTION_TRIGGER", "ADD_DOCUMENT", "REMOVE_DOCUMENT, "NEXT", "PREVIOUS", "SAVE"

		var isUserDriven = triggerType == "PAGE_SELECTION" || triggerType == "NEXT" || triggerType == "PREVIOUS" || triggerType == "SAVE" || triggerType == "SHOW_RESULTS";
		var isExplictSave = triggerType === "SAVE" || triggerType === "NEXT";
		var enableMoveToRelativePage = triggerType == "NEXT" || triggerType == "PREVIOUS";
		var includeAdvancedInformation = triggerType == "SHOW_RESULTS";

		var isLastNonRestrictedPageSelectedOnSave = cc_Model.isLastNonRestrictedPageSelected;
		var isWritableRestrictedPageSelected = cc_Model.isWritableRestrictedPageSelected;

		var task = {
			triggerType : triggerType,
			manuallySelectedPageId : manuallySelectedPageId,
			enableMoveToRelativePage : enableMoveToRelativePage,
			isUserDriven : isUserDriven,
			isExplictSave : isExplictSave,
			triggeringQuestionId : triggeringQuestionId,
			focusedQuestionId : cc_UI.getFocusedQuestionId(),
			includeAdvancedInformation : includeAdvancedInformation,
		};

		// Cache override for CDR refresh
		if (triggeringQuestionId === "ApplicantLivingExpenseCDRRefresh") {
			task.isCDRPollingRequest = true;
		}

		if(cc_Renderer.hasFilesToUpload() === true){
			cc_UI.showWarningDialog("Please ensure you have uploaded all documents.", "Need to Upload Document");

		}else{
			// proactively select the page to give the user immediate feedback
			if(triggerType == "PAGE_SELECTION"){
				cc_Renderer.selectPageNavigatorItem(manuallySelectedPageId);
			}

			// if there are previous findings, then findings should be regenerated each time.
			// this way there isnt the situation where answers are changed but the findings are not regenderated
			cc_Controller.getQuestions(cc_Model.isInterviewComplete, task, function(result){
				if(result.isReadyToFinish == true){
					if(cc_Model.isInterviewInProgress() === true){

						// only perform the following logic when the submit / generate findings button has been pressed
						if(cc_Controller.hasUserRequestedSubmission(result.triggerType, result.isReadyToFinish, cc_Model.isInterviewComplete, isLastNonRestrictedPageSelectedOnSave, isWritableRestrictedPageSelected) === true){
							cc_EntityIntegration.onPreFindingsAssessment(function(){
								return cc_Controller.getQuestions(true, null, function(result){
									cc_Controller.handleSubmissionResult(result, function(){
										cc_EntityIntegration.onPostFindingsAssessment();
									});
								});
							});
						}

					}else if(result.hasRegeneratedFindings === true && isExplictSave == true){
						// only trigger this event when it is an explicit save otherwise it can become very annoying
						cc_EntityIntegration.onPostFindingsReassessment();
					}
				}

				if(onQuestionsResponse){
					onQuestionsResponse();
				}
			});
		}
	};

	// @CC Copied From: cc_Ajax.defaults @ v12_1
	cc_Ajax.communityOverride = {
		timeout: cc_Ajax.defaultTimeout,
		cache: false,
		throbber: true,
		useShortThrobberKey: false,
		throbberDelay: 800,
		throbberMinimumOpen: 1000,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		error: function (jqXHR, textStatus, errorThrown){
			// don't show error if we're navigating away
			$.doTimeout(1000, function(){
				var message = null;

				if (jqXHR.status === 0) {
					message = 'Cannot connect to server. Please ensure there is network connectivity then refresh page.';
				} else if (jqXHR.status == 404) {
					message = 'Requested resource not found. Please refresh page and try again';
				} else if (jqXHR.status == 500) {
					message = 'An internal server error has occured. Please refresh page and try again';
				} else if (jqXHR.status == 503) {
					message = 'Service temporarily unavailable. Please refresh page and try again';
				} else {
					message = 'Oops, it looks like something went wrong, please click Ok to continue with your application or call us on 1300 132 067 if you need our help.';
				}

				if(message){
					cc_UI.showErrorDialog(message, 'Error');
				}
			});
		},
		dataFilter : function (data, dataType) {
			if (dataType == "json" && data) {
				var json = JSON.parse(data);

				cc_Ajax.lastJsonResponse = json;

				// used by selenium to determine when a request is complete
				cc_Ajax.lastJsonResponseKey = cc_Util.generateRandomKey();

				if(data.indexOf("redirect") != -1 && json.redirect){
					// data.redirect contains the string URL to redirect to
					window.location.href = json.redirect;

					// update the data so that the success handler knows to ignore it.
					// please note that 'data = null' is not allowed in jquery 3.
					data = {"redirecting" : true};
				}
			}

			return data;
		},
		beforeSend: function(jqXHR, settings){
			cc_Ajax.attachCSRF(jqXHR);

			if(settings.throbber === true){
				cc_Throbber.show(settings);
			}
		},
		success: function (data, statusText, jqXHR) {
			if(data){
				if (data.redirecting === true){
					return; // do nothing to ensure handler isnt executed

				}else if (data.error){
					cc_Ajax.lastJsonError = data;

					var errorText = data.error;

//					var errorText = null;
//					if(data.isJsonRequest && data.isJsonRequest === true){
//						errorText = data.error;
//					}else{
//						errorText = cc_Util.decodeText(data.error);
//					}

					var width = null;
					if(data.cause == "SchemaValidationException" || data.cause == "RhinoScriptingException" ||
						data.cause == "SpelExpressionException" || data.cause == "DSLParsingException" ||
						data.cause == "RulesEngineException"){
						width = 1080;
					}

					cc_UI.showErrorDialog(errorText, data.title, width);

				}else if(this.handle){
					this.handle(data);
				}
			}
		},
		complete: function(){
			if(this.queued && this.queued === true){
				cc_Util.log('cc_Ajax.queue.next(): ' + this.key);

				// updated the last queue response so it can be used by the queue cache
				cc_Ajax.lastQueuedResponse = cc_Ajax.lastJsonResponse;

				cc_Ajax.queue.next();
			}

			// RIANF - patached back from v13_0 - start
			if(this.throbber === true){
				cc_Throbber.hide(this); // close the throbber if there is one
			}
			// RIANF - patached back from v13_0 - end
		}
	};
	$.ajaxSetup(cc_Ajax.communityOverride);

	window.addEventListener('resize', function(event){
		cc_UI.selectAccordionPage(cc_Model.getSelectedPageId());
	});
	window.addEventListener('orientationchange', function(event){
		cc_UI.selectAccordionPage(cc_Model.getSelectedPageId());
	});


	// CDR disable applicant cancel next step button in the status page
	if (window.cip_StatusWidget) {

		// @CC Copied From: cip_StatusWidget.createOverviewPanel() @ v12_1
		cip_StatusWidget.createOverviewPanel = function (applicationDetail) {
			var html = '<div id="applicationDetailsPanel" class="well well-light">' +
				'<div class="summaryLabel">Case Id</div>' +
				'<div class="summaryValue">' + applicationDetail.id + '</div>' +
				'<div class="summaryLabel">Status</div>' +
				'<div class="summaryValue">' + applicationDetail.stageText + '</div>' +
				'<div class="summaryLabel">Case Started</div>' +
				'<div class="summaryValue">' + dateFns.distanceInWordsStrict(new Date(applicationDetail.startDate), new Date()) + ' ago</div>' +
				'<div class="summaryValueNote">' + $.format.date(new Date(applicationDetail.startDate), cc_Config.dateFormat) + '</div>' +
				'<div class="summaryLabel">Last Updated</div>' +
				'<div class="summaryValue">' + dateFns.distanceInWordsStrict(new Date(applicationDetail.lastIdleResetActivityDate), new Date()) + ' ago</div>' +
				'<div class="summaryValueNote">' + $.format.date(new Date(applicationDetail.startDate), cc_Config.dateFormat) + '</div>' +
				'</div>';

			var hasEditInterviewOperation = applicationDetail.editInterviewOperation != null;
			var hasNextStepOperations = applicationDetail.nextStepOperations && applicationDetail.nextStepOperations.length > 0
			var hasAddCommentOperation = applicationDetail.addCommentOperation != null;
			var hasAddDocumentOperation = applicationDetail.addDocumentOperation != null;

			if (hasEditInterviewOperation === true || hasNextStepOperations === true || hasAddCommentOperation === true || hasAddDocumentOperation === true) {
				html += '<div id="nextStepOperationsPanel" class="well well-light">';

				if (hasEditInterviewOperation === true) {
					html += '<a id="editInterviewButton" class="btn btn-primary operation" target="_blank" href="' + cip_Common.toApplicationPageFromStatusPageUrl(applicationDetail.formId, applicationDetail.id) + '">' +
						applicationDetail.editInterviewOperation.description +
						'</a>';
				};

				if (hasNextStepOperations === true) {
					$.each(applicationDetail.nextStepOperations, function () {
						if (this.operationId !== "ApplicantCancel") {
							html += '<input type="button" class="btn btn-primary operation nextStepOperation" value="' + this.description + '" custom-operation-id="' + this.operationId + '" ';

							if (this.confirmation && this.confirmation.description) {
								html += 'custom-operation-confirmation-text="' + this.confirmation.description + '"';
							}

							html += '></input>';
						}
					});
				}

				if (hasAddDocumentOperation === true) {
					html += '<input name="addDocumentButton" type="button" class="btn btn-primary operation" value="Add Document">';
				}

				if (hasAddCommentOperation === true) {
					html += '<input name="addCommentButton" type="button" class="btn btn-primary operation" value="Add Comment">';
				}

				html += '</div>';
			}

			return html;
		};
	}
	
	cip_Custom.addCollapsibleNavigation = function() {
		// Add the ability to fold certain groups of pages together

		function getSubpages(navigator) {
			return Array.prototype.slice.call(navigator)
				.reduce(function(acc, item) {
					var prefix = item.querySelector("a").getAttribute("prefix");
					if (prefix) {
						if (acc[prefix] === undefined) {
							acc[prefix] = [];
						}
						acc[prefix].push(item);
					}
					return acc;
				}, {});
		}

		function deleteExistingSubpageParents(navigator) {
			$(navigator).filter(".subpageParent").remove();
		}

		function createSubpageParent(navigator, prefix, subpages) {
			// Create a container page navigator item to act as the parent for a prefix
			function createSubpageParentNavigatorItem(prefix) {
				function doesASubpageHaveError(subpages) {
					return $(subpages).find("i.errorIcon").length !== 0;
				}
				function doesASubpageHaveWarning(subpages) {
					return $(subpages).find("i.warningIcon").length !== 0;
				}
				function areAllSubpagesCompleted(subpages) {
					return $(subpages).find("i.completedIcon").length === $(subpages).length;
				}

				var navigatorItemId = cc_View.getPageNavigatorItemId(prefix);
				var icon = doesASubpageHaveError(subpages) ? cc_View.createErrorIcon(navigatorItemId) :
					doesASubpageHaveWarning(subpages) ? cc_View.createWarningIcon(navigatorItemId) :
					areAllSubpagesCompleted(subpages) ? cc_View.createCompletedIcon(navigatorItemId) : "";

				var subpageParent = $(
					'<li id="' + navigatorItemId + '" class="page_navigator_item subpageParent">' +
						'<a id="' + prefix + '_link">' + 
							prefix + 
						'</a>' + 
						icon +
					'</li>'
				);
				
				if (areAllSubpagesCompleted(subpages)) {
					subpageParent.addClass('completed');
				}

				if (isASubpageSelected(subpages)) {
					$(subpages).show();
					$(subpageParent).addClass("expanded");
				} else {
					$(subpages).hide();
					$(subpageParent).removeClass("expanded");
				}
				
				$(subpageParent).on("click", function() {
					if (!isASubpageSelected(subpages)) {
						if ($(subpageParent).hasClass("expanded")) {
							$(subpageParent).removeClass("expanded");
							$(subpages).hide();
						} else {
							$(subpageParent).addClass("expanded");
							$(subpages).show();
						}
					}
				});
				return subpageParent;
			}
			
			var subpageParentIndex = Math.min.apply(null, subpages.map(function(subpage) {
				return Array.from(navigator).indexOf(subpage);
			}));

			var subpageParent = createSubpageParentNavigatorItem(prefix);
			$(navigator[subpageParentIndex]).before(subpageParent);
		}

		function isASubpageSelected(subpages) {
			return $(subpages).filter(".selected").length !== 0;
		}

		deleteExistingSubpageParents(document.querySelectorAll("#cloudcase-page-navigator-unrestricted li"));
		var navigator = document.querySelectorAll("#cloudcase-page-navigator-unrestricted li");
		var subpagesByPrefix = getSubpages(navigator);
		Object.keys(subpagesByPrefix).forEach(function(prefix) {
			createSubpageParent(navigator, prefix, subpagesByPrefix[prefix]);
		});
	}
	
	
	/********************************************************************************************************/
	/**** CLIENT_SPECIFIC_CUSTOMIZATION - END
	/********************************************************************************************************/
	
}());