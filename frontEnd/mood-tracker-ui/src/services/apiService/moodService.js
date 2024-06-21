const API_URL = "http://localhost:3001";

export const getMoodsAPI = async () => {
  const response = await fetch(`${API_URL}/moods`);
  const data = await response.json();
  return data;
};

export const addMoodAPI = async (mood) => {
  const reponse = await fetch(`${API_URL}/moods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mood }),
  });
  const data = await reponse.json();
  return data;
};

// Update mood
export const updateMoodAPI = async (id, updatedMood) => {
  const response = await fetch(`${API_URL}/moods/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedMood),
  });

  if (!response.ok) {
    throw new Error("Failed to update mood");
  }

  return response.json();
};

// Delete mood
export const deleteMoodAPI = async (id) => {
  const response = await fetch(`${API_URL}/moods/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete mood");
  }

  return response.json();
};
