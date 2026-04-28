import { useEffect, useRef, useState } from "react";
import campusImg from "../assets/campus-aerial.jpg";

/**
 * WaterBackground — An animated, dreamy water-ripple background
 * that uses the campus-aerial.jpg image with fluid wave distortions.
 *
 * Props:
 *  - opacity   : overall layer opacity (default 0.12)
 *  - speed     : animation speed multiplier (default 1)
 *  - className : extra wrapper classes
 *  - overlay   : extra overlay tint color (default "rgba(15,23,42,0.7)")
 */
const WaterBackground = ({
  opacity = 0.12,
  speed = 1,
  className = "",
  overlay = "rgba(15,23,42,0.55)",
}) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const animRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = campusImg;
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
    };
    return () => {
      img.onload = null;
    };
  }, []);

  useEffect(() => {
    if (!loaded || !canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const draw = () => {
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

      ctx.clearRect(0, 0, w, h);

      // Draw multiple slightly-displaced copies of the image for a water caustic effect
      const layers = 3;
      ctx.globalAlpha = opacity / layers * 1.8;

      for (let i = 0; i < layers; i++) {
        ctx.save();

        // Each layer has a different wave offset
        const phase = (i / layers) * Math.PI * 2;
        const dx = Math.sin(t * 0.4 * speed + phase) * 12;
        const dy = Math.cos(t * 0.35 * speed + phase * 0.7) * 8;
        const scale = 1.05 + Math.sin(t * 0.2 * speed + phase) * 0.03;

        // Center-scale transform
        ctx.translate(w / 2 + dx, h / 2 + dy);
        ctx.scale(scale, scale);
        ctx.translate(-w / 2, -h / 2);

        // Draw image cover-fit
        const imgAspect = img.width / img.height;
        const canvasAspect = w / h;
        let sw, sh, sx, sy;

        if (canvasAspect > imgAspect) {
          sw = img.width;
          sh = img.width / canvasAspect;
          sx = 0;
          sy = (img.height - sh) / 2;
        } else {
          sh = img.height;
          sw = img.height * canvasAspect;
          sx = (img.width - sw) / 2;
          sy = 0;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
        ctx.restore();
      }

      ctx.globalAlpha = 1;

      // Draw animated water ripple overlay
      const gradient1 = ctx.createRadialGradient(
        w / 2 + Math.sin(t * 0.3 * speed) * w * 0.2,
        h / 2 + Math.cos(t * 0.25 * speed) * h * 0.15,
        0,
        w / 2,
        h / 2,
        w * 0.7
      );
      gradient1.addColorStop(0, "rgba(99,102,241,0.06)");
      gradient1.addColorStop(0.5, "rgba(139,92,246,0.03)");
      gradient1.addColorStop(1, "transparent");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      // Animated light caustics
      for (let i = 0; i < 5; i++) {
        const cx = (w / 6) * (i + 1) + Math.sin(t * 0.5 * speed + i * 1.3) * 50;
        const cy = h / 2 + Math.cos(t * 0.4 * speed + i * 0.9) * h * 0.3;
        const r = 80 + Math.sin(t * 0.3 * speed + i) * 30;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, "rgba(255,255,255,0.04)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      t += 0.016;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [loaded, opacity, speed]);

  return (
    <div className={`water-bg ${className}`}>
      <canvas ref={canvasRef} className="water-bg__canvas" />
      {/* Overlay tint */}
      <div className="water-bg__overlay" style={{ background: overlay }} />
      {/* Animated wave SVG strips */}
      <div className="water-bg__waves">
        <svg
          className="water-bg__wave water-bg__wave--1"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L0,320Z"
            fill="rgba(99,102,241,0.06)"
          />
        </svg>
        <svg
          className="water-bg__wave water-bg__wave--2"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,186.7C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L0,320Z"
            fill="rgba(139,92,246,0.04)"
          />
        </svg>
        <svg
          className="water-bg__wave water-bg__wave--3"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L0,320Z"
            fill="rgba(99,102,241,0.03)"
          />
        </svg>
      </div>
      {/* Floating particle dots */}
      <div className="water-bg__particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="water-bg__particle"
            style={{
              left: `${(i * 5.3 + 2) % 100}%`,
              top: `${(i * 7.1 + 5) % 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaterBackground;
