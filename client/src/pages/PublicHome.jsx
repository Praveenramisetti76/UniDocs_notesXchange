import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import srmLogo from "../assets/srm-logo.png";
import campusImg from "../assets/campus-aerial.jpg";
import libraryImg from "../assets/library-knowledge.png";
import iconSpeed from "../assets/icons/icon-speed.png";
import iconCommunity from "../assets/icons/icon-community.png";
import iconSecurity from "../assets/icons/icon-security.png";
import iconDashboard from "../assets/icons/icon-dashboard.png";
import WaterBackground from "../components/WaterBackground";

const stats = [
  { value: "5000+", label: "Students Active" },
  { value: "12K+", label: "Notes Shared" },
  { value: "50+", label: "Subjects Covered" },
  { value: "98%", label: "Satisfaction Rate" },
];

const PublicHome = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="phome">
      {/* ── HERO ── */}
      <section className="phome-hero">
        <WaterBackground
          opacity={0.18}
          speed={0.8}
          overlay="rgba(15,23,42,0.6)"
        />
        <div className="phome-hero__bg-orbs">
          <div className="phome-hero__orb phome-hero__orb--1" />
          <div className="phome-hero__orb phome-hero__orb--2" />
          <div className="phome-hero__orb phome-hero__orb--3" />
          <div className="phome-hero__orb phome-hero__orb--4" />
        </div>

        <div className="phome-hero__grid">
          <div className={`phome-hero__text ${visible ? "phome-hero__text--visible" : ""}`}>
            <div className="phome-hero__badge">
              <span className="phome-hero__badge-dot" />
              <span>SRM University AP — Official Platform</span>
            </div>

            <h1 className="phome-hero__title">
              Your Notes,{" "}
              <span className="phome-hero__title-grad">Your Community,</span>
              <br />
              Your Success Story
            </h1>

            <p className="phome-hero__subtitle">
              UniDocs brings SRM AP students together to share, discover, and organize 
              study materials. Upload your notes, find peer-reviewed content, and excel in your academics.
            </p>

            <div className="phome-hero__cta-row">
              <Link to="/register" className="phome-hero__cta-primary">
                <span>Get Started — It's Free</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link to="/features" className="phome-hero__cta-secondary">
                Explore Features
              </Link>
            </div>

            {/* Stats strip */}
            <div className="phome-hero__stats">
              {stats.map((s, i) => (
                <div key={i} className="phome-hero__stat">
                  <div>
                    <span className="phome-hero__stat-value">{s.value}</span>
                    <span className="phome-hero__stat-label">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`phome-hero__visual ${visible ? "phome-hero__visual--visible" : ""}`}>
            <div className="phome-hero__card-stack">
              <div className="phome-hero__card phome-hero__card--1">
                <img src={campusImg} alt="SRM AP Campus" />
              </div>
              <div className="phome-hero__card phome-hero__card--2">
                <img src={libraryImg} alt="SRM AP Library" />
              </div>
              <div className="phome-hero__floating-badge phome-hero__floating-badge--1">
                <img src={iconSpeed} alt="" className="phome-hero__floating-img" />
                Notes Uploaded Today: 47
              </div>
              <div className="phome-hero__floating-badge phome-hero__floating-badge--2">
                <img src={iconCommunity} alt="" className="phome-hero__floating-img" />
                Trending: CS201 Notes
              </div>
            </div>
          </div>
        </div>

        <div className="phome-hero__wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L48 52C96 44 192 28 288 24C384 20 480 28 576 40C672 52 768 68 864 72C960 76 1056 68 1152 56C1248 44 1344 28 1392 20L1440 12V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── WHY UNIDOCS ── */}
      <section className="phome-why">
        <div className="phome-section__container">
          <div className="phome-section__header">
            <span className="phome-section__tag">Why UniDocs?</span>
            <h2 className="phome-section__title">
              Built by SRM AP Students,{" "}
              <span className="phome-section__title-accent">For SRM AP Students</span>
            </h2>
            <p className="phome-section__desc">
              We know the struggles of finding quality study material. UniDocs solves that by creating a centralized,
              student-driven knowledge exchange platform exclusively for our campus.
            </p>
          </div>

          <div className="phome-why__grid">
            {[
              {
                img: iconSpeed,
                title: "Lightning Fast Access",
                desc: "Find notes by semester, branch, or subject code in seconds. No more hunting through WhatsApp groups.",
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              },
              {
                img: iconCommunity,
                title: "Peer-Verified Quality",
                desc: "Community voting ensures the best notes rise to the top. Quality content gets recognized and rewarded.",
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              },
              {
                img: iconSecurity,
                title: "Secure & Private",
                desc: "Your uploads, your control. Authentication ensures only SRM AP community members can access the platform.",
                gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              },
              {
                img: iconDashboard,
                title: "Personal Dashboard",
                desc: "Track your contributions, monitor engagement on your uploads, and see your impact on the community.",
                gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
              },
            ].map((item, i) => (
              <div key={i} className="phome-why__card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="phome-why__card-icon" style={{ background: item.gradient }}>
                  <img src={item.img} alt={item.title} className="phome-why__card-icon-img" />
                </div>
                <h3 className="phome-why__card-title">{item.title}</h3>
                <p className="phome-why__card-desc">{item.desc}</p>
                <div className="phome-why__card-glow" style={{ background: item.gradient }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPUS SHOWCASE ── */}
      <section className="phome-campus">
        <div className="phome-section__container">
          <div className="phome-campus__grid">
            <div className="phome-campus__images">
              <div className="phome-campus__img-main">
                <img src={campusImg} alt="SRM University AP Campus" />
                <div className="phome-campus__img-overlay">
                  <span>SRM University AP</span>
                  <span>Amaravati, Andhra Pradesh</span>
                </div>
              </div>
              <div className="phome-campus__img-secondary">
                <img src={libraryImg} alt="SRM AP Library" />
              </div>
            </div>

            <div className="phome-campus__content">
              <span className="phome-section__tag">Our Campus</span>
              <h2 className="phome-section__title" style={{ textAlign: "left" }}>
                A World-Class Campus,{" "}
                <span className="phome-section__title-accent">Now Digitally Connected</span>
              </h2>
              <p className="phome-campus__text">
                SRM University AP is located in Amaravati, the heart of Andhra Pradesh, 
                spanning over 200 acres of cutting-edge infrastructure. UniDocs bridges 
                the gap between classrooms and study rooms, making knowledge accessible anytime, anywhere.
              </p>

              <div className="phome-campus__highlights">
                {[
                  { label: "200+ Acres", sub: "World-class campus" },
                  { label: "10,000+", sub: "Students enrolled" },
                  { label: "Top Ranked", sub: "NIRF & QS Ranked" },
                  { label: "500+", sub: "Faculty members" },
                ].map((h, i) => (
                  <div key={i} className="phome-campus__highlight">
                    <span className="phome-campus__highlight-val">{h.label}</span>
                    <span className="phome-campus__highlight-sub">{h.sub}</span>
                  </div>
                ))}
              </div>

              <Link to="/about" className="phome-campus__cta">
                Learn More About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="phome-steps">
        <div className="phome-section__container">
          <div className="phome-section__header">
            <span className="phome-section__tag">How It Works</span>
            <h2 className="phome-section__title">
              Get Started in{" "}
              <span className="phome-section__title-accent">3 Simple Steps</span>
            </h2>
          </div>

          <div className="phome-steps__grid">
            {[
              {
                num: "01",
                title: "Create Your Account",
                desc: "Sign up with your SRM AP email in seconds. Completely free, no strings attached.",
                color: "#6366f1",
              },
              {
                num: "02",
                title: "Upload or Browse",
                desc: "Share your study materials or search through peer-uploaded notes across all branches and semesters.",
                color: "#f59e0b",
              },
              {
                num: "03",
                title: "Learn & Succeed",
                desc: "Download top-rated notes, vote on quality, and become part of a thriving academic community.",
                color: "#10b981",
              },
            ].map((step, i) => (
              <div key={i} className="phome-steps__card">
                <div className="phome-steps__num" style={{ color: step.color }}>{step.num}</div>
                <h3 className="phome-steps__card-title">{step.title}</h3>
                <p className="phome-steps__card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="phome-cta">
        <div className="phome-cta__inner">
          <div className="phome-cta__orbs">
            <div className="phome-cta__orb phome-cta__orb--1" />
            <div className="phome-cta__orb phome-cta__orb--2" />
          </div>
          <div className="phome-cta__content">
            <img src={srmLogo} alt="SRM AP" className="phome-cta__logo" />
            <h2 className="phome-cta__title">Ready to Join the UniDocs Community?</h2>
            <p className="phome-cta__subtitle">
              Thousands of SRM AP students are already sharing notes and acing their exams. Don't miss out.
            </p>
            <div className="phome-cta__btns">
              <Link to="/register" className="phome-cta__btn-primary">
                Create Free Account
              </Link>
              <Link to="/login" className="phome-cta__btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
