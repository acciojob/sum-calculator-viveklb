
import React, { useEffect, useState } from "react";

const App = () => {
  const [numbers, setNumbers] = useState("");
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const numberPattern = /[^\s,]+/g;
    let total = 0;
    let timer;
    let cancelled = false;

    const addNextChunk = () => {
      let processed = 0;
      let match;
      let done = false;

      while (processed < 1000) {
        match = numberPattern.exec(numbers);
        if (match === null) {
          done = true;
          break;
        }

        const value = Number(match[0]);
        if (Number.isFinite(value)) {
          total += value;
        }
        processed += 1;
      }

      if (!done) {
        timer = setTimeout(addNextChunk, 0);
      } else if (!cancelled) {
        setSum(total);
      }
    };

    timer = setTimeout(addNextChunk, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [numbers]);

  return (
    <div>
      <h1>Sum Calculator</h1>
      <label htmlFor="numbers">Numbers</label>
      <textarea
        id="numbers"
        value={numbers}
        onChange={(event) => setNumbers(event.target.value)}
        placeholder="Enter numbers separated by commas or spaces"
      />
      <p>Sum: <output aria-live="polite">{sum}</output></p>
    </div>
  )
}

export default App
