import { useState } from "react"

function init() {
    console.log("Init was executed")
    return Math.random();
}


export default function Counter() {
    let [count, setCount] = useState(init) //initialization
    console.log("Component was rendered")

    let incCount = () => {
        setCount((currCount) => {
            return currCount + 1;
        });
        // setCount((currCount) => {
        //     return currCount + 1
        // });

    }

    return (
        <div>
            <h3>Count = {count}</h3>
            <button onClick={incCount}>Increase Count</button>
        </div>
    )
}