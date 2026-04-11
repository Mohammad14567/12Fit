import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getUsersWithPlans, deleteUser, getRegisteredUsersCount, getOnlineUsersCount, checkApiStatus } from "../services/userService";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [registeredCount, setRegisteredCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiStatus, setApiStatus] = useState(null);
  const [apiStatusType, setApiStatusType] = useState("");
  const socketRef = useRef(null);

  const cardsPerPage = 3;

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const username = storedUser.name || "Admin";

  const loadUsers = useCallback(async () => {
    try {
      const res = await getUsersWithPlans(token);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const loadCounts = useCallback(async () => {
    try {
      const res = await getRegisteredUsersCount();
      setRegisteredCount(res.data.total || 0);
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await getOnlineUsersCount();
      setOnlineCount(res.data.online || 0);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCheckApiStatus = async () => {
    setApiStatus("Checking API status...");
    setApiStatusType("info");

    try {
      await checkApiStatus();
      setApiStatus("API is working: connection successful.");
      setApiStatusType("success");
    } catch (error) {
      console.error(error);
      setApiStatus("API is not working: unable to connect.");
      setApiStatusType("danger");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user account?")) {
      try {
        await deleteUser(userId, token);
        loadUsers();
      } catch (error) {
        alert("Failed to delete user: " + (error.response?.data?.message || "Something went wrong"));
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="container py-5">
      <div className="dashboard-welcome-card p-4 mb-4">
        <h2 className="mb-2">Welcome, {username}</h2>
        <p className="mb-1">Admin Access Features</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="dashboard-stat-card p-4 h-100 text-center">
            <h6 className="text-uppercase text-muted mb-3">Registered Users</h6>
            <p className="display-5 mb-2">{registeredCount}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-stat-card p-4 h-100 text-center">
            <h6 className="text-uppercase text-muted mb-3">Current Online Users</h6>
            <p className="display-5 mb-2">{onlineCount}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button
          type="button"
          className="btn btn-primary rounded-pill px-4 py-3"
          onClick={handleCheckApiStatus}
        >
          Check API Status
        </button>
      </div>

      {apiStatus && (
        <div className={`alert alert-${apiStatusType} rounded-4 py-3 mb-4`} role="alert">
          {apiStatus}
        </div>
      )}

      <h3 className="mb-4">Control Users Accounts</h3>
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
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            className="dashboard-search-input"
            placeholder="Search for users by username or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="row g-4">
          {displayedUsers.map((user) => (
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
        {filteredUsers.length > cardsPerPage && (
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-light"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-light"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={endIndex >= filteredUsers.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
