import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): React.JSX.Element {
    const [questionType, setQuestionType] = useState<QuestionType>(
        "short_answer_question",
    );

    function changeType(): void {
        setQuestionType((prevType) =>
            prevType === "short_answer_question" ?
                "multiple_choice_question"
            :   "short_answer_question",
        );
    }

    const typeLabel =
        questionType === "short_answer_question" ? "Short Answer" : (
            "Multiple Choice"
        );

    return (
        <div>
            <Button onClick={changeType}>Change Type</Button>
            <div>{typeLabel}</div>
        </div>
    );
}
