import { Topic } from './Questions';

// tslint:disable-next-line: no-empty-interface
export interface ComplexityOption extends Topic {}

export interface Setting {
    QuizQuestionsCount: number;
    IsRandom: boolean;
    ComplexityOptions: ComplexityOption;
}

export interface Instruction {
    CMS: string;
}
