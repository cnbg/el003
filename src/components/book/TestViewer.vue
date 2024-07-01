<script setup lang="ts">
import { Model } from "survey-core";
import { Serializer } from "survey-core";
import { ref, onMounted } from 'vue';
import * as SurveyTheme from "survey-core/themes";

const props = defineProps(['test']);
const electron = (window as any).electron;
const json = ref<JSON>({});
const survey = new Model();
onMounted(async () => {
    try {
        const response = await electron.getSurvey(props.test);
        if (response.success) {
            survey.fromJSON(response.data);
            json.value = response.data;
            console.log(survey);

        }
    } catch (error) {
        console.error('Error initializing survey model:', error);
    }
});
survey.showCompletedPage = false;

const isSurveyCompleted = ref<boolean>(false);
const surveyResults = ref<string>("");

const rightCount = ref(0);
const wrongCount = ref(0);
const correctStr = "Правильно";
const inCorrectStr = "Неправильно";
const result = new Model();

survey.onComplete.add(sender => {
    surveyResults.value = JSON.stringify(sender.data, null, 3);
    isSurveyCompleted.value = true;
    result.fromJSON(json.value);
    console.log(result);
    result.applyTheme(SurveyTheme.ThreeDimensionalLight);
    result.data = sender.data;
    result.mode = "display";
    result.widthMode = "static";
    result.questionsOnPageMode = "singlePage";
    result.showNavigationButtons = "none";
    result.showProgressBar = "off";
    result.showTimerPanel = "none";
    result.maxTimeToFinishPage = 0;
    result.maxTimeToFinish = 0;
    result.showPageNumbers = false;
    result.showQuestionNumbers = true;
    result.showCompletedPage = false;

    function getTextHtml(text, str, isCorrect) {
        if (text.indexOf(str) < 0) return undefined;
        return text.substring(0, text.indexOf(str)) + "<span class='" + (isCorrect ? "correctAnswer" : "incorrectAnswer") + "'>" + str + "</span>";
    }

    function renderCorrectAnswer(question, index) {
        if (question.getType() != 'html' && question.getType() != 'image') {
            if (question.getNestedQuestions().length > 0) {
                question.getNestedQuestions().forEach(
                    (element) => {
                        if (!element) return;
                        const isCorrectEl = element.isAnswerCorrect();
                        if (isCorrectEl) {
                            rightCount.value++;
                        } else {
                            wrongCount.value++;
                        }

                        if (!element.prevTitle) {
                            element.prevTitle = element.title;
                        }

                        if (isCorrectEl === undefined) {
                            element.title = element.prevTitle;
                        }

                        element.title = element.prevTitle + ' ' + (isCorrectEl ? correctStr : inCorrectStr);
                    }
                );
            } else {
                if (!question) return;
                const isCorrect = question.isAnswerCorrect();

                if (isCorrect) {
                    rightCount.value++;
                } else {
                    wrongCount.value++;
                }

                if (!question.prevTitle) {
                    question.prevTitle = question.title;
                }

                if (isCorrect === undefined) {
                    question.title = question.prevTitle;
                }
                question.title = question.prevTitle + ' ' + (isCorrect ? correctStr : inCorrectStr);
            }
        }
    }

    result.onTextMarkdown.add((sender, options) => {
        var text = options.text;
        var html = getTextHtml(text, correctStr, true);

        if (!html) {
            html = getTextHtml(text, inCorrectStr, false);
        }
        if (!!html) {
            options.html = html;
        }
    });
    result.getAllQuestions().forEach((question, index) => renderCorrectAnswer(question, index));

});

</script>
<template>
    <div v-if="isSurveyCompleted">
      <div class="p-6 m-3 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div>
            <div class="text-lg font-medium text-lime-600">Правильных ответов: {{ rightCount }}</div>
            <div class="text-lg font-medium text-rose-600">Неправильных ответов: {{ wrongCount }}</div>
          </div>
      </div>
      <SurveyComponent :model="result"></SurveyComponent>
    </div>
    <SurveyComponent :model="survey"></SurveyComponent>
</template>

<style>
.correctAnswer {
    color: green;
}
.incorrectAnswer {
    color: red;
}
.sd-root-modern .sd-container-modern__title {
    display: none !important;
}
</style>