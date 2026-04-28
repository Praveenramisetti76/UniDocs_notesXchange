import { Link } from "react-router-dom";
import WaterBackground from "../components/WaterBackground";
import uploadImg from "../assets/upload-feature.png";
import searchImg from "../assets/search-feature.png";
import voteImg from "../assets/vote-feature.png";
import communityImg from "../assets/community-feature.png";
import iconSecurity from "../assets/icons/icon-security.png";
import iconResponsive from "../assets/icons/icon-responsive.png";
import iconSpeed from "../assets/icons/icon-speed.png";
import iconDesign from "../assets/icons/icon-design.png";
import iconDashboard from "../assets/icons/icon-dashboard.png";
import iconNotification from "../assets/icons/icon-notification.png";
import iconPreview from "../assets/icons/icon-preview.png";
import iconOrganize from "../assets/icons/icon-organize.png";

const features = [
  {
    img: uploadImg,
    title: "Smart Upload System",
    desc: "Upload PDFs, images, and documents with our intuitive drag & drop interface. Tag with semester, branch, and subject code for easy discovery by your peers.",
    highlights: ["Drag & Drop Upload", "Auto-tagging", "Multiple Formats", "Cloud Storage"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    img: searchImg,
    title: "Advanced Search & Filter",
    desc: "Find exactly the notes you need in seconds. Filter by semester, branch, subject code, or popularity. Our smart search understands what you're looking for.",
    highlights: ["Subject Code Search", "Semester Filter", "Branch Filter", "Popularity Sort"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    img: voteImg,
    title: "Community Voting System",
    desc: "Quality rises to the top organically. Upvote the best notes and downvote low-quality content. The community decides what's worth studying.",
    highlights: ["Upvote/Downvote", "Quality Ranking", "Trust Score", "Top Contributors"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    img: communityImg,
    title: "Student Community Hub",
    desc: "Join a vibrant community of SRM AP students. Track your contributions, build your academic reputation, and help fellow students succeed.",
    highlights: ["User Profiles", "Contribution Tracking", "Leaderboards", "Activity Feed"],
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

const moreFeatures = [
  { img: iconSecurity, title: "Secure Authentication", desc: "JWT-based security ensures your data stays safe and private." },
  { img: iconResponsive, title: "Fully Responsive", desc: "Access UniDocs from any device — desktop, tablet, or mobile." },
  { img: iconSpeed, title: "Lightning Performance", desc: "Optimized loading with cloud storage for instant access." },
  { img: iconDesign, title: "Beautiful Interface", desc: "Modern glassmorphism design that's a pleasure to use." },
  { img: iconDashboard, title: "Personal Dashboard", desc: "Track your uploads, votes, and contribution statistics." },
  { img: iconNotification, title: "Smart Notifications", desc: "Get notified when your notes get upvoted or commented on." },
  { img: iconPreview, title: "Detailed Note View", desc: "Full preview with metadata, vote count, and uploader info." },
  { img: iconOrganize, title: "Organized Categories", desc: "Notes organized by semester, branch, and subject for easy navigation." },
];

const FeaturesPage = () => {
  return (
    <div className="features-page">
      {/* Hero */}
      <section className="features-hero">
        <WaterBackground
          opacity={0.14}
          speed={0.7}
          overlay="rgba(30,27,75,0.6)"
        />
        <div className="features-hero__bg">
          <div className="features-hero__orb features-hero__orb--1" />
          <div className="features-hero__orb features-hero__orb--2" />
        </div>
        <div className="features-hero__content">
          <span className="phome-section__tag">Features</span>
          <h1 className="features-hero__title">
            Packed with{" "}
            <span className="features-hero__title-accent">Powerful Features</span>
          </h1>
          <p className="features-hero__subtitle">
            Every feature in UniDocs is designed to make academic life at SRM AP easier, 
            more collaborative, and more successful.
          </p>
        </div>
        <div className="features-hero__wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 80L60 72C120 64 240 48 360 44C480 40 600 48 720 56C840 64 960 72 1080 68C1200 64 1320 48 1380 40L1440 32V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Main Features */}
      <section className="features-main">
        <div className="phome-section__container">
          {features.map((f, i) => (
            <div key={i} className={`features-main__row ${i % 2 !== 0 ? "features-main__row--reverse" : ""}`}>
              <div className="features-main__visual">
                <div className="features-main__img-wrap" style={{ background: f.gradient }}>
                  <img src={f.img} alt={f.title} className="features-main__img" />
                </div>
              </div>

              <div className="features-main__content">
                <h3 className="features-main__title">{f.title}</h3>
                <p className="features-main__desc">{f.desc}</p>
                <div className="features-main__highlights">
                  {f.highlights.map((h, j) => (
                    <span key={j} className="features-main__chip">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More Features Grid */}
      <section className="features-more">
        <div className="phome-section__container">
          <div className="phome-section__header">
            <span className="phome-section__tag">And More...</span>
            <h2 className="phome-section__title">
              Everything You{" "}
              <span className="phome-section__title-accent">Need to Succeed</span>
            </h2>
          </div>

          <div className="features-more__grid">
            {moreFeatures.map((f, i) => (
              <div key={i} className="features-more__card" style={{ animationDelay: `${i * 0.06}s` }}>
                <img src={f.img} alt={f.title} className="features-more__icon-img" />
                <h4 className="features-more__title">{f.title}</h4>
                <p className="features-more__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="phome-cta">
        <div className="phome-cta__inner">
          <div className="phome-cta__orbs">
            <div className="phome-cta__orb phome-cta__orb--1" />
            <div className="phome-cta__orb phome-cta__orb--2" />
          </div>
          <div className="phome-cta__content">
            <h2 className="phome-cta__title">Experience All Features Today</h2>
            <p className="phome-cta__subtitle">
              Create your free account and unlock the full power of UniDocs.
            </p>
            <div className="phome-cta__btns">
              <Link to="/register" className="phome-cta__btn-primary">Get Started Free</Link>
              <Link to="/contact" className="phome-cta__btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
