import React from "react";
import { Button } from "react-bootstrap";
import { useDoubleHalfState } from "./DoubleHalfState";

function Doubler({
    value,
    setValue,
}: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <Button
            onClick={() => {
                setValue(2 * value);
            }}
        >
            Double
        </Button>
    );
}

function Halver({
    value,
    setValue,
}: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <Button
            onClick={() => {
                setValue(0.5 * value);
            }}
        >
            Halve
        </Button>
    );
}

export function DoubleHalf(): React.JSX.Element {
    const [dhValue, setDhValue] = useDoubleHalfState(); // Using custom hook

    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{dhValue}</span>
            </div>
            <Doubler value={dhValue} setValue={setDhValue} />
            <Halver value={dhValue} setValue={setDhValue} />
        </div>
    );
}
