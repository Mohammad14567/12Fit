import { useState } from "react";
import { generateWorkout } from "../services/workoutService";

function Workout() {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    activity: "Sedentary (little to no exercise)",
    goal: "Lose Weight",
    diet: "",
  });

  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      const res = await generateWorkout(formData, token);
      setResult(res.data.workoutPlan);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card p-4 shadow-sm border-0 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h4 className="text-center mb-4">Generate Your Personalized Plan</h4>

        <form onSubmit={handleGenerate}>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="e.g. 30"
              onChange={handleChange}
              value={formData.age}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              className="form-control"
              placeholder="e.g. 70"
              onChange={handleChange}
              value={formData.weight}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Height (cm)</label>
            <input
              type="number"
              name="height"
              className="form-control"
              placeholder="e.g. 175"
              onChange={handleChange}
              value={formData.height}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Activity Level</label>
            <select
              name="activity"
              className="form-control"
              onChange={handleChange}
              value={formData.activity}
            >
              <option>Sedentary (little to no exercise)</option>
              <option>Moderate</option>
              <option>Active</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Goal</label>
            <select
              name="goal"
              className="form-control"
              onChange={handleChange}
              value={formData.goal}
            >
              <option>Lose Weight</option>
              <option>Gain Muscle</option>
              <option>Maintain</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Dietary Preferences (optional)</label>
            <input
              type="text"
              name="diet"
              className="form-control"
              placeholder="e.g. Vegetarian"
              onChange={handleChange}
              value={formData.diet}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Generate Workout Plan
          </button>
        </form>
      </div>

      {message && (
        <div className="alert alert-info mt-4 text-center">{message}</div>
      )}

      {result.length > 0 && (
        <div className="card p-4 shadow-sm border-0 mt-4">
          <h5 className="mb-3 text-center">Your Workout Plan</h5>
          <ul className="mb-0">
            {result.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Workout;