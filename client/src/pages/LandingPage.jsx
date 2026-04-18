import { Link } from "react-router-dom";
import heroImg from "../assets/hero-illustration.png";
import uploadImg from "../assets/upload-feature.png";
import searchImg from "../assets/search-feature.png";
import voteImg from "../assets/vote-feature.png";
import communityImg from "../assets/community-feature.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100/50">
        {/* Decorative background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column — text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/80 text-primary-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                University Notes Exchange Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-gray-900">Share & Access</span>
                <br />
                <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
                  University Notes
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Upload your study materials, discover high-quality notes from peers, and ace your exams together. The ultimate student knowledge hub.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="px-8 py-3.5 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3.5 rounded-2xl text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 shadow-sm hover:shadow-md transition-all duration-300 text-center"
                >
                  Sign In
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {["P", "A", "R", "S"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-sm"
                      style={{
                        background: [
                          "linear-gradient(135deg, #6366f1, #4f46e5)",
                          "linear-gradient(135deg, #818cf8, #6366f1)",
                          "linear-gradient(135deg, #a5b4fc, #818cf8)",
                          "linear-gradient(135deg, #c7d2fe, #a5b4fc)",
                        ][i],
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Trusted by Students</p>
                  <p className="text-xs text-gray-400">Across multiple universities</p>
                </div>
              </div>
            </div>

            {/* Right column — hero image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-3xl blur-2xl transform rotate-3" />
                <img
                  src={heroImg}
                  alt="University students sharing notes and studying together"
                  className="relative w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl shadow-primary-200/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Excel
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A complete platform designed to help university students share, discover, and organize study materials effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                img: uploadImg,
                title: "Easy Upload",
                desc: "Drag & drop your PDFs and images. Share notes with your fellow students in seconds.",
              },
              {
                img: searchImg,
                title: "Smart Search",
                desc: "Filter by semester, branch, or subject code. Find exactly the notes you need, fast.",
              },
              {
                img: voteImg,
                title: "Vote & Rate",
                desc: "Upvote the best notes and downvote poor ones. Quality rises to the top organically.",
              },
              {
                img: communityImg,
                title: "Student Community",
                desc: "Join a growing community of learners helping each other succeed in university.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-primary-100/40 hover:border-primary-200 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-5 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Create Account",
                desc: "Sign up with your email in seconds. No credit card required — completely free for students.",
                gradient: "from-primary-500 to-primary-600",
              },
              {
                step: "02",
                title: "Upload or Browse",
                desc: "Share your study materials or search through notes uploaded by your peers across all branches.",
                gradient: "from-primary-600 to-primary-700",
              },
              {
                step: "03",
                title: "Learn & Succeed",
                desc: "Download the best notes, vote on quality, and help build a knowledge base for everyone.",
                gradient: "from-primary-700 to-primary-800",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                {/* Step number */}
                <div
                  className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-primary-200 mb-6`}
                >
                  {item.step}
                </div>

                {/* Connector line (visible on md+, not on last step) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-200 to-primary-100" />
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-10 sm:p-16 text-center">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to Start Sharing?
              </h2>
              <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
                Join UniDocs today and be part of the student community that helps each other achieve academic excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-8 py-3.5 rounded-2xl text-base font-semibold text-primary-700 bg-white hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3.5 rounded-2xl text-base font-semibold text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
