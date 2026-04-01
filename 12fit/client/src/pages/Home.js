import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>

      <section className="hero-section py-5 bg-light">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-primary">12Fit</h1>
              <p className="lead mt-3 text-muted">
                AI Powered Sports & Fitness platform that helps users create
                personalized workout and diet plans in a simple and smart way.
              </p>

              <div className="mt-4">
                {!user ? (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg me-3">
                      Start Your Plan
                    </Link>
                    <Link to="/login" className="btn btn-outline-dark btn-lg">
                      Login
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard" className="btn btn-primary btn-lg">
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-box bg-white shadow rounded-4 p-5 text-center">
                <h2 className="text-primary fw-bold">12Fit Platform</h2>
                <p className="mb-0 text-muted">
                  Personalized fitness and nutrition plans for beginners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Why Choose 12Fit?</h2>
          <p className="text-muted mb-5">
            The platform focuses on simplicity, personalization, and helping
            users improve their fitness journey.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 feature-card">
                <div className="card-body p-4">
                  <h4 className="text-primary">AI Workout Plans</h4>
                  <p className="text-muted">
                    Generate personalized workout programs based on your goals
                    and fitness level.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 feature-card">
                <div className="card-body p-4">
                  <h4 className="text-success">Diet Recommendations</h4>
                  <p className="text-muted">
                    Get diet suggestions and healthy meal plans tailored to your
                    body and goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 feature-card">
                <div className="card-body p-4">
                  <h4 className="text-dark">Easy to Use</h4>
                  <p className="text-muted">
                    Clean and simple interface designed for students and
                    beginners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Ready to start your fitness journey?</h2>
          <p className="mt-3 text-light">
            Join 12Fit and create your own personalized plan now.
          </p>

          {!user ? (
            <Link to="/register" className="btn btn-primary mt-3 px-4">
              Create Account
            </Link>
          ) : (
            <Link to="/dashboard" className="btn btn-primary mt-3 px-4">
              Open Dashboard
            </Link>
          )}
        </div>
      </section>

    </>
  );
}

export default Home;