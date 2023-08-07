import { QuestionBase } from "./QuestionBase";

export class DropdownQuestion extends QuestionBase<string> {
    override controlType = 'dropdown';
}