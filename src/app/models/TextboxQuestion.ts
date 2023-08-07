import { QuestionBase } from './QuestionBase';

export class TextboxQuestion extends QuestionBase<string> {
    override controlType = 'textbox';
}