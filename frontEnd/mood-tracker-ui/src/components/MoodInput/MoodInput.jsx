import { useState } from "react";

const MoodInput = ({ addMood }) => {
  const [mood, setMood] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood === "" || mood > 10) {
      setError("Please enter a value between 1 and 10");
    } else {
      setError(null);
      addMood(mood);
      setMood("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mood-form">
      <label htmlFor="mood-input">
        On a scale of 1-10, how are you feeling today?
      </label>
      <input
        id="mood-input"
        type="number"
        min="1"
        max="10"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default MoodInput;
