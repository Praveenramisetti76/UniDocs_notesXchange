import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import campusImg from "../assets/campus-aerial.jpg";
import iconLocation from "../assets/icons/icon-location.png";
import iconEmail from "../assets/icons/icon-email.png";
import iconPhone from "../assets/icons/icon-phone.png";
import iconWeb from "../assets/icons/icon-web.png";
import WaterBackground from "../components/WaterBackground";

const contactInfo = [
  {
    img: iconLocation,
    title: "Visit Us",
    lines: ["SRM University AP", "Neerukonda, Mangalagiri Mandal", "Guntur District, Andhra Pradesh 522240"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    img: iconEmail,
    title: "Email Us",
    lines: ["praveen_ramisetti@srmap.edu.in"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    img: iconPhone,
    title: "Call Us",
    lines: ["+91 866 242 8000", "Mon-Fri: 9:00 AM - 5:00 PM IST"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    img: iconWeb,
    title: "Online",
    lines: ["srmap.edu.in"],
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];

const faq = [
  {
    q: "Is UniDocs free to use?",
    a: "Yes! UniDocs is completely free for all SRM AP students. Create an account and start sharing notes instantly.",
  },
  {
    q: "Who can access the platform?",
    a: "Currently, UniDocs is open to all SRM University AP students and faculty members. You just need to register with a valid email.",
  },
  {
    q: "What file formats are supported?",
    a: "You can upload PDFs and images (JPG, PNG). We're working on adding support for more formats like DOCX and PPT.",
  },
  {
    q: "How does the voting system work?",
    a: "Each user can upvote or downvote a note once. The net vote count determines the note's ranking and visibility in search results.",
  },
  {
    q: "Can I delete my uploaded notes?",
    a: "Yes! You have full control over your uploads. Visit your Dashboard to manage and delete any notes you've shared.",
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Build mailto link and open it
    const mailtoLink = `mailto:praveen_ramisetti@srmap.edu.in?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
    window.open(mailtoLink, "_blank");
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client...");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <WaterBackground
          opacity={0.15}
          speed={0.6}
          overlay="rgba(30,27,75,0.65)"
        />
        <div className="contact-hero__bg">
          <div className="contact-hero__orb contact-hero__orb--1" />
          <div className="contact-hero__orb contact-hero__orb--2" />
        </div>
        <div className="contact-hero__content">
          <span className="phome-section__tag">Contact Us</span>
          <h1 className="contact-hero__title">
            We'd Love to{" "}
            <span className="contact-hero__title-accent">Hear From You</span>
          </h1>
          <p className="contact-hero__subtitle">
            Got questions, feedback, or suggestions? Reach out to the UniDocs team
            and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="contact-hero__wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 80L60 72C120 64 240 48 360 44C480 40 600 48 720 56C840 64 960 72 1080 68C1200 64 1320 48 1380 40L1440 32V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info">
        <div className="phome-section__container">
          <div className="contact-info__grid">
            {contactInfo.map((c, i) => (
              <div key={i} className="contact-info__card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="contact-info__icon" style={{ background: c.gradient }}>
                  <img src={c.img} alt={c.title} className="contact-info__icon-img" />
                </div>
                <h3 className="contact-info__title">{c.title}</h3>
                {c.lines.map((line, j) => (
                  <p key={j} className="contact-info__line">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="contact-form-section">
        <div className="phome-section__container">
          <div className="contact-form__grid">
            {/* Form */}
            <div className="contact-form__card">
              <h2 className="contact-form__title">Send Us a Message</h2>
              <p className="contact-form__subtitle">
                Fill out the form below — your message will be sent to{" "}
                <strong>praveen_ramisetti@srmap.edu.in</strong>
              </p>

              <form onSubmit={handleSubmit} className="contact-form__form">
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="contact-name" className="contact-form__label">Full Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="contact-form__input"
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-email" className="contact-form__label">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@srmap.edu.in"
                      className="contact-form__input"
                    />
                  </div>
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-subject" className="contact-form__label">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="contact-form__input"
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-message" className="contact-form__label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="contact-form__input contact-form__textarea"
                  />
                </div>

                <button type="submit" disabled={sending} className="contact-form__submit">
                  {sending ? (
                    <span className="contact-form__submit-loading">
                      <span className="contact-form__spinner" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Campus Image & Map */}
            <div className="contact-form__side">
              <div className="contact-form__campus-img">
                <img src={campusImg} alt="SRM AP Campus" />
                <div className="contact-form__campus-overlay">
                  <h3>SRM University AP</h3>
                  <p>Amaravati, Andhra Pradesh</p>
                </div>
              </div>

              <div className="contact-form__map">
                <iframe
                  title="SRM AP Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.6185768583504!2d80.46389831487486!3d16.4725079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a073957f%3A0x73a7c520a1f2b2b4!2sSRM%20University%2C%20AP!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: "1rem" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <div className="phome-section__container">
          <div className="phome-section__header">
            <span className="phome-section__tag">FAQ</span>
            <h2 className="phome-section__title">
              Frequently Asked{" "}
              <span className="phome-section__title-accent">Questions</span>
            </h2>
          </div>

          <div className="contact-faq__list">
            {faq.map((item, i) => (
              <div
                key={i}
                className={`contact-faq__item ${openFaq === i ? "contact-faq__item--open" : ""}`}
              >
                <button
                  className="contact-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="contact-faq__chevron">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div className="contact-faq__answer">
                  <p>{item.a}</p>
                </div>
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
            <h2 className="phome-cta__title">Still Have Questions?</h2>
            <p className="phome-cta__subtitle">
              Join UniDocs and experience the platform yourself — it's completely free!
            </p>
            <div className="phome-cta__btns">
              <Link to="/register" className="phome-cta__btn-primary">Create Free Account</Link>
              <Link to="/login" className="phome-cta__btn-secondary">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
