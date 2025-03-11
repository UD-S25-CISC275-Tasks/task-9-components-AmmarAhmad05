import React, { useState } from "react";
import { Button } from "react-bootstrap";

// Define a fixed list of holidays
const holidays = [
    { name: "Christmas 🎄", year: 12 },
    { name: "Eid al-Fitr 🌙", year: 4 },
    { name: "Halloween 🎃", year: 10 },
    { name: "New Year's Day 🎆", year: 1 },
    { name: "Thanksgiving 🦃", year: 11 },
];

const alphabetSorted = [...holidays].sort((a, b) =>
    a.name.localeCompare(b.name),
);
const yearSorted = [...holidays].sort((a, b) => a.year - b.year);

export function CycleHoliday(): React.JSX.Element {
    const [currentHoliday, setCurrentHoliday] = useState(holidays[0]);

    function cycleAlphabet(): void {
        const currentIndex = alphabetSorted.findIndex(
            (holiday) => holiday.name === currentHoliday.name,
        );
        const nextIndex = (currentIndex + 1) % alphabetSorted.length;
        setCurrentHoliday(alphabetSorted[nextIndex]);
    }

    function cycleYear(): void {
        const currentIndex = yearSorted.findIndex(
            (holiday) => holiday.name === currentHoliday.name,
        );
        const nextIndex = (currentIndex + 1) % yearSorted.length;
        setCurrentHoliday(yearSorted[nextIndex]);
    }

    return (
        <div>
            <div>Holiday: {currentHoliday.name}</div>
            <Button onClick={cycleAlphabet}>Alphabet</Button>
            <Button onClick={cycleYear}>Year</Button>
        </div>
    );
}
