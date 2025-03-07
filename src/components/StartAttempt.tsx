import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(5);
    const [isQuizRunning, setIsQuizRunning] = useState<boolean>(false);

    function startQuiz(): void {
        if (attempts > 0) {
            setAttempts(attempts - 1);
            setIsQuizRunning(true);
        }
    }

    function stopQuiz(): void {
        setIsQuizRunning(false);
    }

    function addAttempt(): void {
        setAttempts(attempts + 1);
    }

    return (
        <div>
            <div>Attempts: {attempts}</div>
            <Button
                onClick={startQuiz}
                disabled={isQuizRunning || attempts === 0}
            >
                Start Quiz
            </Button>
            <Button onClick={stopQuiz} disabled={!isQuizRunning}>
                Stop Quiz
            </Button>
            <Button onClick={addAttempt} disabled={isQuizRunning}>
                Mulligan
            </Button>
        </div>
    );
}
