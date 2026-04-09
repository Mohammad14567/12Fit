import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { getProgress, addProgress } from "../services/progressService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardContent() {
  const user = JSON.parse(localStorage.getItem("user")) || name:"Guest";
  const token = localStorage.getItem("token");

  const [progressData, setProgressData] = useState([]);
  const [dayName, setDayName] = useState("");
  const [weight, setWeight] = useState("");

  const loadProgress = async () => {
    try {
      const res = await getProgress(token);
      setProgressData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

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
    <>
      

      <div className="container py-5">
        <div className="bg-primary text-white rounded-4 shadow p-4 mb-4">
          <h2 className="fw-bold">Welcome back, {user?.name} 👋</h2>
          <p className="mb-0">
            Track your progress and manage your fitness journey.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="mb-3">Add Progress</h4>

              <form onSubmit={handleAddProgress}>
                <div className="mb-3">
                  <label className="form-label">Day</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Mon"
                    value={dayName}
                    onChange={(e) => setDayName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Weight</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    placeholder="e.g. 79.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary">Save Progress</button>
              </form>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="mb-3">Weight Progress Chart</h4>

              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day_name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#0d6efd" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="alert alert-warning mt-4">
            You are logged in as Admin. You can manage protected admin features.
          </div>
        )}
      </div>

      
    </>
  );
}

function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

export default Dashboard;
