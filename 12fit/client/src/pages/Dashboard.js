import { useEffect, useState } from "react";
import { getUsersWithPlans, deleteUser } from "../services/userService";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await getUsersWithPlans(token);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      loadUsers();
    }
  }, [token]);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user account?")) {
      try {
        await deleteUser(userId, token);
        loadUsers(); // Refresh the list
      } catch (error) {
        alert("Failed to delete user: " + (error.response?.data?.message || "Something went wrong"));
      }
    }
  };

  return (
    <div className="container py-5">
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          padding: '40px',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          minHeight: '600px',
        }}
      >
        <div className="row g-4">
          {users.map((user) => (
            <div className="col-md-6 col-lg-4" key={user.id}>
              <div className="card shadow border-0 rounded-4 p-4 h-100">
                <h5 className="mb-3">{user.name}</h5>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                {user.workoutPlan && (
                  <div className="mb-2">
                    <strong>Workout Goal:</strong> {user.workoutGoal || 'N/A'}<br />
                    <strong>Workout Level:</strong> {user.workoutLevel || 'N/A'}<br />
                    <strong>Workout Plan:</strong>
                    <ul className="mt-1">
                      {user.workoutPlan.map((item, index) => (
                        <li key={index} className="small">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {user.dietPlan && (
                  <div className="mb-2">
                    <strong>Diet Goal:</strong> {user.dietGoal || 'N/A'}<br />
                    <strong>Diet Plan:</strong>
                    <ul className="mt-1">
                      {user.dietPlan.map((item, index) => (
                        <li key={index} className="small">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {user.progress && user.progress.length > 0 && (
                  <div className="mb-3">
                    <strong>Progress:</strong>
                    <ul className="mt-1">
                      {user.progress.map((item, index) => (
                        <li key={index} className="small">{item.day_name} - {item.weight} kg</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  className="btn btn-danger btn-sm mt-auto"
                  onClick={() => handleDelete(user.id)}
                >
                  Remove Account
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
