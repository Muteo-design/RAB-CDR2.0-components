<template>
	<question cc-name="Q2" cc-type="free-text" cc-style="text-area">
		This is a text area
		<template v-slot:content="{ ccName }">
			<textarea class="text form-control cc-listener-attached" :cc-field="ccName" :cc-disableable="ccName"></textarea>
		</template>
	</question>
</template>

<script>
import Question from '@/stories/templates/Question';

export default {
	components: { Question },
	name: 'question-textarea',
};
</script>
