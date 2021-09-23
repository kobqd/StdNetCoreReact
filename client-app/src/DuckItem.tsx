import React from "react";
import { Duck } from "./demo";

interface Props {
    duck:Duck;
}

const DuckItem = ({duck}:Props) => {
    return(
        <div>
            <span>{duck.name}</span>
            <button onClick={() => duck.makeSound(duck.name + ' quack')}>Make Sound</button>
        </div>
    )
}

export default DuckItem