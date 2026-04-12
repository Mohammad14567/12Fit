import { useEffect, useState, useCallback } from "react";
import { getProgress, addProgress } from "../services/progressService";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"))|| {
  name: "Guest User",
  email: "guest@example.com",
  role: "user",
};

  const token = localStorage.getItem("token");

  const [progressData, setProgressData] = useState([]);
  const [dayName, setDayName] = useState("");
  const [weight, setWeight] = useState("");

  const loadProgress = useCallback(async () => {
    try {
      const res = await getProgress(token);
      setProgressData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const handleAddProgress = async (e) => {
    e.preventDefault();

    try {
      await addProgress({ day_name: dayName, weight }, token);
      setDayName("");
      setWeight("");
      loadProgress();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow border-0 rounded-4 p-4 mb-4">
        <h2 className="fw-bold">Welcome, {user?.name}</h2>
        <p className="mb-0">Track your fitness progress here.</p>
      </div>

      <div className="card shadow border-0 rounded-4 p-4 mb-4">
        <h4 className="mb-3">Add Progress</h4>
        <form onSubmit={handleAddProgress}>
          <div className="mb-3">
            <label className="form-label">Day</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Monday"
              value={dayName}
              onChange={(e) => setDayName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Weight</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 75"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <button className="btn btn-primary">Save Progress</button>
        </form>
      </div>

      <div className="card shadow border-0 rounded-4 p-4">
        <h4 className="mb-3">Progress Data</h4>

        {progressData.length === 0 ? (
          <p className="text-muted mb-0">No progress data yet.</p>
        ) : (
          <ul className="list-group">
            {progressData.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.day_name} - {item.weight} kg
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
