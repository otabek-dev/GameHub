import { useState } from 'react'

const MyButton = () => {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Counter {count}
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
