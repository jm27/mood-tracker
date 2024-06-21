import { useState } from "react";
import {
  updateMoodAPI,
  deleteMoodAPI,
} from "../../services/apiService/moodService";

const MoodList = ({ moods, deleteMood, updateMood }) => {
  const [editingMoodId, setEditingMoodId] = useState(null);
  const [editingMoodValue, setEditingMoodValue] = useState("");

  const handleUpdateMood = async (id) => {
    try {
      const updated = await updateMoodAPI(id, { mood: editingMoodValue });
      updateMood(id, updated);
      setEditingMoodId(null);
      setEditingMoodValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMood = async (id) => {
    try {
      await deleteMoodAPI(id);
      deleteMood(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mood-list">
      <ul>
        {moods?.map((mood, index) => (
          <li key={index}>
            {index}-
            {editingMoodId === mood.id ? (
              <>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editingMoodValue}
                  onChange={(e) => setEditingMoodValue(e.target.value)}
                />
                <button onClick={() => handleUpdateMood(mood.id)}>Save</button>
              </>
            ) : (
              <>
                {mood.mood}
                <button
                  onClick={() => {
                    setEditingMoodId(mood.id);
                    setEditingMoodValue(mood.mood);
                  }}
                >
                  Edit
                </button>
              </>
            )}
            <button onClick={() => handleDeleteMood(mood.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodList;
// Path: src/components/MoodList/MoodList.jsx
