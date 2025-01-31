"use client";
import Particles from "react-tsparticles";

const AnimatedBackground = () => {
  return (
    <Particles
      options={{
        background: { color: "#0A0B0F" },
        particles: {
          number: { value: 80 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.3 },
          size: { value: 1.5 },
          move: { enable: true, speed: 0.5 },
        },
      }}
      className="tw-fixed tw-inset-0 tw-z-[-1]"
    />
  );
};

export default AnimatedBackground;
