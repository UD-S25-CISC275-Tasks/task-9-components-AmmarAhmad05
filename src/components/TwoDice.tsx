import React, { useState } from "react";
import { Button } from "react-bootstrap";

function d6(): number {
    return Math.floor(Math.random() * 6) + 1;
}

export function TwoDice(): React.JSX.Element {
    const [leftDie, setLeftDie] = useState<number>(1);
    const [rightDie, setRightDie] = useState<number>(6);

    const hasWon = leftDie === rightDie && leftDie !== 1;
    const hasLost = leftDie === 1 && rightDie === 1;

    const rollLeftDie = () => {
        setLeftDie(d6());
    };

    const rollRightDie = () => {
        setRightDie(d6());
    };

    return (
        <div>
            <div>
                <span data-testid="left-die">{leftDie}</span>
                <span> | </span>
                <span data-testid="right-die">{rightDie}</span>
            </div>

            <Button onClick={rollLeftDie}>Roll Left</Button>
            <Button onClick={rollRightDie}>Roll Right</Button>

            {hasWon && <div>Win</div>}
            {hasLost && <div>Lose</div>}
        </div>
    );
}
