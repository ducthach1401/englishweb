import { IQuest } from "../model/model.question";

export function serializerQuestionsInfo(model: IQuest): any {
    return {
        english: model.english,
        vietnamese: model.vietnamese,
        meaning: model.meaning,
        type: model.type,
        exampleEnglish: model.exampleEnglish,
        exampleVietnamese: model.exampleVietnamese
    }
}