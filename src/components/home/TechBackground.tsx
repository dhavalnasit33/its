"use client";

import React, { useEffect, useRef } from "react";

export default function TechBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const numParticles = isMobile ? 30 : 90; // 3x fewer particles on mobile
    const connectionDistance = isMobile ? 90 : 150; // Shorter connection mesh on mobile
    let isVisible = true;

    const resize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2, // Constant smooth speed
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
        // Mix of your specific #D68029 Orange and #0EA5E9 Sky Blue
        color: Math.random() > 0.5 ? "rgba(214, 128, 41, " : "rgba(14, 165, 233, ",
        baseAlpha: Math.random() * 0.5 + 0.3,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (!isVisible) return;

      // Fully clear canvas every frame to prevent the "worm" trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls smoothly
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw connections (The Data Mesh)
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Lines fade out as they get further apart
            let opacity = 1 - (dist / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Default to a subtle blue/white for the connecting lines
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Mouse Interaction: Subtle repel and brighten
        let mouseDx = mouseRef.current.x - p.x;
        let mouseDy = mouseRef.current.y - p.y;
        let mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        let currentAlpha = p.baseAlpha;

        if (mouseRef.current.active && mouseDist < 200) {
          const force = (200 - mouseDist) / 200;
          p.x -= (mouseDx / mouseDist) * force * 1.5;
          p.y -= (mouseDy / mouseDist) * force * 1.5;
          currentAlpha = Math.min(1, p.baseAlpha + force * 0.5); // Brighten near mouse

          // Draw line to mouse
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(214, 128, 41, ${force * 0.4})`; // Orange line to cursor
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw the soft outer glow (high-performance circle overlay instead of expensive ctx.shadowBlur)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha * 0.15})`;
        ctx.fill();

        // Draw the solid particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Pause animation when the section is not in view to save CPU/GPU cycles
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          // Restart loop
          animate();
        }
      },
      { threshold: 0.01 }
    );

    const parent = containerRef.current;
    if (parent) {
      observer.observe(parent);
    }

    // Start loop
    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (parent && observer) observer.unobserve(parent);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    // Fixed: z-0 applied to the container so it stays completely behind your EngagementModels cards
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto bg-[#12203D] z-0">

      {/* Ambient static lighting for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0EA5E9]/10 blur-[130px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#D68029]/10 blur-[130px] pointer-events-none mix-blend-screen" />

      {/* Fixed: Canvas is now z-0 instead of z-10 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-80" />
    </div>
  );
}