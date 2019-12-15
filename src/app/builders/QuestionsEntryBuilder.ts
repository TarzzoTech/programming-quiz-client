import { QuestionsEntry, Question, DEFAULT_SCORE } from '../models';
export class QuestionsEntryBuilder {
    questionsEntry: QuestionsEntry = {
        TopicId: '',
        Title: '',
        Description: '',
        OptionA: '',
        OptionB: '',
        OptionC: '',
        OptionD: '',
        Answer: '',
        Score: DEFAULT_SCORE
    };
    constructor(defaultEntry?: Question | null) {
        if (defaultEntry) {
            this.questionsEntry.TopicId = defaultEntry.TopicId;
            this.questionsEntry.Answer = defaultEntry.Answer;
            this.questionsEntry.Description = defaultEntry.Description;
            this.questionsEntry.OptionA = defaultEntry.Options.A;
            this.questionsEntry.OptionB = defaultEntry.Options.B;
            this.questionsEntry.OptionC = defaultEntry.Options.C;
            this.questionsEntry.OptionD = defaultEntry.Options.D;
            this.questionsEntry.Title = defaultEntry.Title;
            this.questionsEntry.Score = defaultEntry.Score;
        }
    }
    then(cb) {
        cb(this.questionsEntry);
    }
}
