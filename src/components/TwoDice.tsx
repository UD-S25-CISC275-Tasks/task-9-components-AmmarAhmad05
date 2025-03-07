import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [leftDie, setLeftDie] = useState<number>(() => d6());
    const [rightDie, setRightDie] = useState<number>(() => d6());

    const hasWon = leftDie === rightDie && leftDie !== 1;
    const hasLost = leftDie === 1 && rightDie === 1;

    return (
        <div>
            <div>
                <span data-testid="left-die">{leftDie}</span>
                <span> | </span>
                <span data-testid="right-die">{rightDie}</span>
            </div>

            <Button
                onClick={() => {
                    setLeftDie(d6());
                }}
            >
                Roll Left
            </Button>
            <Button
                onClick={() => {
                    setRightDie(d6());
                }}
            >
                Roll Right
            </Button>

            {hasWon && <div>Win</div>}
            {hasLost && <div>Lose</div>}
        </div>
    );
}
