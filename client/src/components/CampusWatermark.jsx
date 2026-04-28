import { useMemo } from "react";
import campusAerialImg from "../assets/campus-aerial.jpg";
import campusGroundImg from "../assets/campus-ground.png";

/**
 * CampusWatermark — Premium animated background for Browse & Upload pages.
 *
 * Uses two different SRM AP campus images:
 *   - Browse  → ground-level campus view with Indian flag
 *   - Upload  → aerial campus view
 *
 * Layers (bottom → top):
 *  1. Campus image with Ken Burns drift animation
 *  2. Gradient mesh overlay (keeps text readable)
 *  3. Animated gradient orbs (4 large blurred circles)
 *  4. Floating luminous particles (14 randomised)
 *  5. Diagonal shimmer sweep
 *  6. Subtle grid pattern overlay
 */
const CampusWatermark = ({ variant = "browse" }) => {
  // Generate random particles once
  const particles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.35,
    }));
  }, []);

  const isUpload = variant === "upload";
  const campusImage = isUpload ? campusAerialImg : campusGroundImg;

  return (
    <div className="campus-wm" aria-hidden="true">
      {/* Layer 1 — Campus image with Ken Burns */}
      <img
        src={campusImage}
        alt=""
        className="campus-wm__img"
        loading="eager"
      />

      {/* Layer 2 — Gradient mesh overlay */}
      <div
        className="campus-wm__mesh"
        style={{
          background: isUpload
            ? `linear-gradient(
                160deg,
                rgba(238, 242, 255, 0.82) 0%,
                rgba(224, 231, 255, 0.78) 25%,
                rgba(237, 233, 254, 0.80) 50%,
                rgba(238, 242, 255, 0.84) 75%,
                rgba(248, 250, 252, 0.88) 100%
              )`
            : `linear-gradient(
                160deg,
                rgba(248, 250, 252, 0.82) 0%,
                rgba(238, 242, 255, 0.78) 25%,
                rgba(224, 231, 255, 0.76) 50%,
                rgba(238, 242, 255, 0.80) 75%,
                rgba(248, 250, 252, 0.84) 100%
              )`,
        }}
      />

      {/* Layer 3 — Animated gradient orbs */}
      <div className="campus-wm__orb campus-wm__orb--1" />
      <div className="campus-wm__orb campus-wm__orb--2" />
      <div className="campus-wm__orb campus-wm__orb--3" />
      <div className="campus-wm__orb campus-wm__orb--4" />

      {/* Layer 4 — Floating luminous particles */}
      <div className="campus-wm__particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="campus-wm__particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--particle-opacity": p.opacity,
            }}
          />
        ))}
      </div>

      {/* Layer 5 — Diagonal shimmer sweep */}
      <div className="campus-wm__shimmer" />

      {/* Layer 6 — Subtle dot grid pattern */}
      <div className="campus-wm__grid" />
    </div>
  );
};

export default CampusWatermark;
