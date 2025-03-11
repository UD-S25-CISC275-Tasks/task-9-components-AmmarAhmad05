import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    let newList: Question[] = questions.filter(
        (singlequestion) => singlequestion.published,
    );
    return newList;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let newList: Question[] = questions.filter((singleQuestion) => {
        if (singleQuestion.type === "multiple_choice_question") {
            return !(
                singleQuestion.body === "" &&
                singleQuestion.expected === "" &&
                singleQuestion.options.length === 0
            );
        }
        return !(singleQuestion.body === "" && singleQuestion.expected === "");
    });

    return newList;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    for (let i = 0; i < questions.length; i++) {
        if (id === questions[i].id) {
            return questions[i];
        }
    }
    return null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    let newList: Question[] = questions.filter(
        (singleQuestion) => singleQuestion.id !== id,
    );
    return newList;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let namesList: string[] = [];
    for (let i = 0; i < questions.length; i++) {
        namesList.push(questions[i].name);
    }
    return namesList;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let sumTotal: number = 0;
    for (let i = 0; i < questions.length; i++) {
        sumTotal += questions[i].points;
    }
    return sumTotal;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    let sumTotal: number = 0;
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].published) {
            sumTotal += questions[i].points;
        }
    }
    return sumTotal;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let finalString: string = "id,name,options,points,published";
    for (let i = 0; i < questions.length; i++) {
        finalString += `\n${questions[i].id.toString()},${questions[i].name},${questions[i].options.length.toString()},${questions[i].points.toString()},${questions[i].published.toString()}`;
    }
    return finalString;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    let answers: Answer[] = [];
    for (let i = 0; i < questions.length; i++) {
        let singleAnswer: Answer = {
            questionId: questions[i].id,
            text: "",
            submitted: false,
            correct: false,
        };
        answers.push(singleAnswer);
    }
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    let newList: Question[] = [];
    for (let i = 0; i < questions.length; i++) {
        newList.push({ ...questions[i], published: true });
    }
    return newList;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) {
        return true;
    }
    let questType: string = questions[0].type;
    return questions.every((question) => question.type === questType);
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    let newQuestion: Question = makeBlankQuestion(id, name, type);
    let newList: Question[] = [...questions, newQuestion];
    return newList;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    let newList: Question[] = [];
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id === targetId) {
            newList.push({ ...questions[i], name: newName });
        } else {
            newList.push({ ...questions[i] });
        }
    }
    return newList;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    let newList: Question[] = [];
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id === targetId) {
            if (newQuestionType === "multiple_choice_question") {
                newList.push({ ...questions[i], type: newQuestionType });
            } else {
                newList.push({
                    ...questions[i],
                    type: newQuestionType,
                    options: [],
                });
            }
        } else {
            newList.push({ ...questions[i] });
        }
    }
    return newList;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    return questions.map((question) => {
        if (question.id !== targetId) {
            return question;
        }
        let updatedOptions: string[] = [...question.options];

        if (targetOptionIndex === -1) {
            updatedOptions.push(newOption);
        } else if (
            targetOptionIndex >= 0 &&
            targetOptionIndex < updatedOptions.length
        ) {
            updatedOptions[targetOptionIndex] = newOption;
        }
        return { ...question, options: updatedOptions };
    });
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    return questions.flatMap((question) =>
        question.id === targetId ?
            [
                question,
                { ...question, id: newId, name: `Copy of ${question.name}` },
            ]
        :   [question],
    );
}
