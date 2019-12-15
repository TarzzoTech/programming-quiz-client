import { Topic } from './Questions';

// tslint:disable-next-line: no-empty-interface
export interface ComplexityOption extends Topic {}

export interface Setting {
    Id: string;
    QuizQuestionsCount: number;
    IsRandom: boolean;
    ComplexityOptions: ComplexityOption;
    CreatedDate: Date;
}

export interface Instruction {
    Id: string;
    CMS: string;
    CreatedDate: Date;
}
