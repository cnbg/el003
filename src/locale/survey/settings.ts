import { surveyLocalization} from 'survey-core';
import { editorLocalization } from "survey-creator-core";
import './ky';
import './ru';

surveyLocalization.defaultLocale = "ru";
// localization.currentLocale = "ky";
editorLocalization.currentLocale = "ru";
// editorLocalization.defaultLocale = "ru";
surveyLocalization.supportedLocales = ['ru', 'ky', 'en'];
