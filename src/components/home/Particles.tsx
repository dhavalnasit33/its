"use client";

import { useCallback } from "react";
import type { Engine, Container } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBg() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // console.log(container);
    },
    []
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="absolute inset-0 z-0 pointer-events-none"
      options={{
      fullScreen: {
        enable: false
      },
        detectRetina: true, 

      background: { color: "transparent" },

      particles: {
        number: { value: 50 },

        color: {
          value: ["#E3441B", "#cb6e43", "#D89D2E", "#0F3B50"]
        },
        

        shape: { type: "circle" },

        size: {
          value: { min: 1, max: 3.3 }
        },

        // opacity: {
        //   value: { min: 0.6, max: 1 }
        // },

        move: {
          enable: true,
          speed: 0.1,
          outModes: "out"
        },

        links: {
          enable: true,
          distance: 120,
          color: "#fc4a1a",
          opacity: 0.12,
          width: 1
        },

        collisions: {
          enable: false
        },

        shadow: { 
          enable: true, 
          color: "rgba(255,255,255,0.4)", 
          blur: 25 
        }
      },

      interactivity: {
        events: {
          onHover: {
            enable: false
          },
          onClick: {
            enable: false
          }
        },
        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 0.4
            }
          }
        }
      },

      responsive: [
        {
          maxWidth: 981,
          options: {
            particles: { number: { value: 25 } }
          }
        },
        {
          maxWidth: 768,
          options: {
            particles: { number: { value: 10 } }
          }
        }
      ]
    }}
    />
  );
}

