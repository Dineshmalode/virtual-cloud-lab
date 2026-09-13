import Navbar from "../../components/layout/Navbar";
import "../../components/layout/Navbar.css";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>
            Master <span>AWS Cloud</span> Through Hands-on Practice
          </h1>

          <p>
            CloudLab AI helps students learn AWS by completing real-world labs,
            participating in competitions, and tracking their cloud journey in
            one platform.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Start Practicing</button>

            <button className="secondary-btn">Explore Labs</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;