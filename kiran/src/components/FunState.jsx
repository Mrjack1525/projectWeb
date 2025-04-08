import React, { useState } from 'react'
import Button from '@mui/material/Button'

const FunState = () => {

    const [count, setCount] = useState(0)
    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    }
    const decrementCount = () => {
        setCount(prevCount => prevCount - 1)
    }

    return (
        <div>

            <h1> Welcome arrow function component</h1>
            <Button variant='contained' onClick={incrementCount}>Increment</Button> <br/>
            <Button variant='outlined' onClick={decrementCount}>Decrement</Button> <br/>
            <Button variant='contained' onClick={() => setCount(0)}>Reset</Button> <br/>
            <p>Count: {count}</p>
        
        </div>
    )
}

export default FunState