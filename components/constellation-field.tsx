"use client";

import { useEffect, useRef } from "react";

export function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];
    const pointer = { x: -1000, y: -1000 };
    const isDark = () => document.documentElement.classList.contains("dark");

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      nodes = Array.from({ length: width < 768 ? 40 : 85 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.4 + 1.8,
      }));
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const clearPointer = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      context.lineCap = "butt";
      context.lineJoin = "miter";

      const color = isDark() ? "#f2f4fb" : "#111318";
      context.strokeStyle = color;
      context.lineWidth = 1;

      for (let index = 0; index < nodes.length; index += 1) {
        for (
          let nextIndex = index + 1;
          nextIndex < nodes.length;
          nextIndex += 1
        ) {
          const node = nodes[index];
          const nextNode = nodes[nextIndex];
          const distance = Math.hypot(node.x - nextNode.x, node.y - nextNode.y);

          if (distance < 160) {
            context.globalAlpha = 0.08 + (1 - distance / 160) * 0.24;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(nextNode.x, nextNode.y);
            context.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const pointerDistance = Math.hypot(
          node.x - pointer.x,
          node.y - pointer.y,
        );
        if (pointerDistance < 220) {
          node.x -= (node.x - pointer.x) * 0.005;
          node.y -= (node.y - pointer.y) * 0.005;
        }

        const pulse = 0.62 + Math.sin(time * 0.001 + node.x) * 0.2;
        context.fillStyle = color;
        context.globalAlpha = pulse * 0.12;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = pulse * 0.7;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("blur", clearPointer);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", clearPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-15 dark:opacity-20"
    />
  );
}
