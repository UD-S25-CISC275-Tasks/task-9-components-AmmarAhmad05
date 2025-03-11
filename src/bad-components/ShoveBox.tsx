import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function ShoveBox(): React.JSX.Element {
    const [position, setPosition] = useState<number>(10);

    function shoveBox() {
        setPosition((prevPosition) => prevPosition + 4);
    }

    return (
        <div>
            <h3>Shove Box</h3>
            <span>The box is at: {position}px</span>
            <div>
                <Button onClick={shoveBox}>Shove the Box</Button>
                <div
                    data-testid="moveable-box"
                    style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "lightblue",
                        border: "1px solid blue",
                        display: "inline-block",
                        verticalAlign: "bottom",
                        marginLeft: position + "px",
                    }}
                ></div>
            </div>
        </div>
    );
}
