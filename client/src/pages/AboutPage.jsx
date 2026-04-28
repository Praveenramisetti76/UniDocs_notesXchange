import { Link } from "react-router-dom";
import WaterBackground from "../components/WaterBackground";
import srmLogo from "../assets/srm-logo.png";
import campusImg from "../assets/campus-aerial.jpg";
import libraryImg from "../assets/library-knowledge.png";
import iconInnovation from "../assets/icons/icon-innovation.png";
import iconCommunity from "../assets/icons/icon-community.png";
import iconExcellence from "../assets/icons/icon-excellence.png";
import iconGrowth from "../assets/icons/icon-growth.png";

const milestones = [
  { year: "2017", event: "SRM University AP established in Amaravati, Andhra Pradesh" },
  { year: "2019", event: "First batch of students graduate with flying colors" },
  { year: "2022", event: "Campus expands to 200+ acres with world-class facilities" },
  { year: "2025", event: "UniDocs launched as the official student notes exchange platform" },
  { year: "2026", event: "5000+ active users and 12K+ notes shared across all branches" },
];

const team = [
  { name: "Student Development Team", role: "Core Platform Development", img: iconInnovation },
  { name: "Academic Advisory", role: "Content Quality & Standards", img: iconExcellence },
  { name: "Design & UX Team", role: "User Experience & Interface", img: iconCommunity },
  { name: "Community Moderators", role: "Content Moderation & Support", img: iconGrowth },
];

const values = [
  {
    img: iconInnovation,
    title: "Innovation",
    desc: "We constantly evolve our platform using cutting-edge technology to deliver the best experience.",
    gradient: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
  },
  {
    img: iconCommunity,
    title: "Collaboration",
    desc: "Learning is better together. We foster a culture of sharing and mutual support among students.",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    img: iconExcellence,
    title: "Excellence",
    desc: "We're committed to maintaining high-quality content through community-driven verification.",
    gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
  },
  {
    img: iconGrowth,
    title: "Growth",
    desc: "Every note shared helps a fellow student grow. Together, we create a knowledge ecosystem.",
    gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  },
];

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <WaterBackground
          opacity={0.15}
          speed={0.7}
          overlay="rgba(30,27,75,0.6)"
        />
        <div className="about-hero__bg">
          <div className="about-hero__orb about-hero__orb--1" />
          <div className="about-hero__orb about-hero__orb--2" />
          <div className="about-hero__orb about-hero__orb--3" />
        </div>
        <div className="about-hero__content">
          <span className="phome-section__tag">About Us</span>
          <h1 className="about-hero__title">
            Empowering Students at{" "}
            <span className="about-hero__title-accent">SRM University AP</span>
          </h1>
          <p className="about-hero__subtitle">
            UniDocs is more than a platform — it's a movement to democratize academic knowledge 
            sharing among the bright minds of SRM University AP, Amaravati.
          </p>
        </div>
        <div className="about-hero__wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 80L60 72C120 64 240 48 360 44C480 40 600 48 720 56C840 64 960 72 1080 68C1200 64 1320 48 1380 40L1440 32V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="phome-section__container">
          <div className="about-mission__grid">
            <div className="about-mission__images">
              <img src={campusImg} alt="SRM AP Campus" className="about-mission__img about-mission__img--main" />
              <img src={libraryImg} alt="SRM AP Library" className="about-mission__img about-mission__img--secondary" />
              <div className="about-mission__img-badge">
                <img src={srmLogo} alt="SRM AP" />
                <span>Est. 2017</span>
              </div>
            </div>

            <div className="about-mission__content">
              <span className="phome-section__tag">Our Mission</span>
              <h2 className="phome-section__title" style={{ textAlign: "left" }}>
                Bridging the{" "}
                <span className="phome-section__title-accent">Knowledge Gap</span>
              </h2>
              <p className="about-mission__text">
                At SRM University AP, academic excellence is a tradition. But we noticed that 
                students often struggled to find reliable study materials across semesters and branches. 
                WhatsApp groups got messy, Google Drive links expired, and quality notes were scattered.
              </p>
              <p className="about-mission__text">
                <strong>UniDocs was born to solve exactly this.</strong> We built a centralized platform where 
                SRM AP students can upload, discover, and rate study materials — creating a self-curating 
                knowledge base that gets better with every contribution.
              </p>
              <div className="about-mission__quote">
                <span className="about-mission__quote-mark">"</span>
                <p>Knowledge shared is knowledge multiplied. UniDocs makes sharing effortless.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="phome-section__container">
          <div className="phome-section__header">
            <span className="phome-section__tag">Our Values</span>
            <h2 className="phome-section__title">
              What Drives{" "}
              <span className="phome-section__title-accent">UniDocs Forward</span>
            </h2>
          </div>

          <div className="about-values__grid">
            {values.map((v, i) => (
              <div key={i} className="about-values__card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="about-values__icon" style={{ background: v.gradient }}>
                  <img src={v.img} alt={v.title} className="about-values__icon-img" />
                </div>
                <h3 className="about-values__card-title">{v.title}</h3>
                <p className="about-values__card-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline">
        <div className="phome-section__container">
          <div className="phome-section__header">
            <span className="phome-section__tag">Our Journey</span>
            <h2 className="phome-section__title">
              Key{" "}
              <span className="phome-section__title-accent">Milestones</span>
            </h2>
          </div>

          <div className="about-timeline__list">
            {milestones.map((m, i) => (
              <div key={i} className="about-timeline__item" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="about-timeline__dot" />
                <div className="about-timeline__year">{m.year}</div>
                <div className="about-timeline__event">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="phome-section__container">
          <div className="phome-section__header">
            <span className="phome-section__tag">The Team</span>
            <h2 className="phome-section__title">
              Meet the People{" "}
              <span className="phome-section__title-accent">Behind UniDocs</span>
            </h2>
            <p className="phome-section__desc">
              Built with love by SRM AP students who understand student needs.
            </p>
          </div>

          <div className="about-team__grid">
            {team.map((t, i) => (
              <div key={i} className="about-team__card">
                <div className="about-team__avatar">
                  <img src={t.img} alt={t.name} className="about-team__avatar-img" />
                </div>
                <h3 className="about-team__name">{t.name}</h3>
                <p className="about-team__role">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="phome-cta" style={{ paddingTop: "2rem" }}>
        <div className="phome-cta__inner">
          <div className="phome-cta__orbs">
            <div className="phome-cta__orb phome-cta__orb--1" />
            <div className="phome-cta__orb phome-cta__orb--2" />
          </div>
          <div className="phome-cta__content">
            <h2 className="phome-cta__title">Want to Be Part of Our Story?</h2>
            <p className="phome-cta__subtitle">
              Join thousands of SRM AP students who are already making a difference through UniDocs.
            </p>
            <div className="phome-cta__btns">
              <Link to="/register" className="phome-cta__btn-primary">Join UniDocs Today</Link>
              <Link to="/contact" className="phome-cta__btn-secondary">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
