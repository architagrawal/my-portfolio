"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface Skill {
  name: string;
  category: string;
}

interface SkillNetworkProps {
  skills: Skill[];
  activeCategory: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  skill: Skill;
  color: string;
}

const COLORS = {
  languages: '#3b82f6', // blue-500
  frameworks: '#14b8a6', // teal-500
  'ai-ml': '#a855f7', // purple-500
  'cloud-devops': '#f97316', // orange-500
  default: '#64748b', // slate-500
};

export default function SkillNetwork({ skills, activeCategory }: SkillNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    // Create particles with random positions
    const newParticles: Particle[] = skills.map(skill => {
      // Estimate width based on text length (approximate 8px per char + padding)
      const estimatedWidth = skill.name.length * 8 + 20;
      return {
        x: Math.random() * (width - estimatedWidth),
        y: Math.random() * (height - 30),
        vx: (Math.random() - 0.5) * 0.3, // Slower movement for readability
        vy: (Math.random() - 0.5) * 0.3,
        width: estimatedWidth,
        height: 28, // Pill height
        skill,
        color: COLORS[skill.category as keyof typeof COLORS] || COLORS.default,
      };
    });

    setParticles(newParticles);
  }, [skills]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        // Highlight Logic
        const isMatch = activeCategory === 'all' || p.skill.category === activeCategory;
        const targetOpacity = isMatch ? 1 : 0.15; // Dim non-matching
        
        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x + p.width > width) p.vx *= -1;
        if (p.y < 0 || p.y + p.height > height) p.vy *= -1;

        // Mouse Interaction (Repel)
        const centerX = p.x + p.width / 2;
        const centerY = p.y + p.height / 2;
        const dx = mouseRef.current.x - centerX;
        const dy = mouseRef.current.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - dist) / 150;
          p.vx -= Math.cos(angle) * force * 0.2;
          p.vy -= Math.sin(angle) * force * 0.2;
        }

        // Friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Draw Pill shape
        ctx.globalAlpha = targetOpacity;
        
        // Background for tag
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(p.x, p.y, p.width, p.height, 14);
        } else {
            // Fallback for older browsers
            ctx.rect(p.x, p.y, p.width, p.height);
        }
        
        // Fill styling
        const isDark = theme === 'dark';
        
        // Create subtle gradient or solid fill based on theme and match status
        if (isMatch) {
            ctx.fillStyle = isDark ? `${p.color}20` : `${p.color}15`; // Low opacity bg
            ctx.fill();
            
            // Border
            ctx.lineWidth = 1;
            ctx.strokeStyle = isDark ? `${p.color}60` : `${p.color}40`;
            ctx.stroke();
        } else {
            // Dimmed state
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
            ctx.fill();
        }

        // Text
        ctx.font = '500 13px Inter, sans-serif';
        ctx.fillStyle = isMatch 
            ? (isDark ? '#fff' : '#0f172a') 
            : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)');
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.skill.name, p.x + p.width / 2, p.y + p.height / 2);
        
        // Reset Alpha
        ctx.globalAlpha = 1;

        // Draw Connections
        if (isMatch) {
            particles.slice(i + 1).forEach(p2 => {
              // Check if p2 is also a match before connecting
              const p2Match = activeCategory === 'all' || p2.skill.category === activeCategory;
              if (!p2Match) return;

              const dx = (p.x + p.width/2) - (p2.x + p2.width/2);
              const dy = (p.y + p.height/2) - (p2.y + p2.height/2);
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
                ctx.lineWidth = 1.5 * (1 - dist / 150);
                ctx.moveTo(p.x + p.width/2, p.y + p.height/2);
                ctx.lineTo(p2.x + p2.width/2, p2.y + p2.height/2);
                ctx.stroke();
              }
            });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [particles, activeCategory, theme]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[600px] relative overflow-hidden rounded-3xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-inner"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => mouseRef.current = { x: -1000, y: -1000 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}
