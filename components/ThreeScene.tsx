"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get dimensions with fallback
    let width = containerRef.current.clientWidth || window.innerWidth;
    let height = containerRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // Emerald Geometric Ring - Reduced opacity for subtle effect
    const ringGeo = new THREE.TorusGeometry(2, 0.005, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.2
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    group.add(ring);

    // Decorative inner glow ring - Even more subtle
    const innerRingGeo = new THREE.TorusGeometry(1.98, 0.002, 16, 100);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.1
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    group.add(innerRing);

    // High-Contrast Hands
    const handMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const subtleEmeraldMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.5
    });

    const hourHandGeo = new THREE.BoxGeometry(0.04, 1.2, 0.04);
    const hourHand = new THREE.Mesh(hourHandGeo, handMat);
    hourHand.position.y = 0.6;
    const hourPivot = new THREE.Group();
    hourPivot.add(hourHand);
    group.add(hourPivot);

    const minuteHandGeo = new THREE.BoxGeometry(0.02, 1.8, 0.02);
    const minuteHand = new THREE.Mesh(minuteHandGeo, subtleEmeraldMat);
    minuteHand.position.y = 0.9;
    const minutePivot = new THREE.Group();
    minutePivot.add(minuteHand);
    group.add(minutePivot);

    scene.add(group);
    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = new Date();
      const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      hourPivot.rotation.z = -hours * (Math.PI / 6);
      minutePivot.rotation.z = -minutes * (Math.PI / 30);

      // Smooth mouse parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y = mouseX * 0.3;
      group.rotation.x = -mouseY * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Cleanup Three.js resources
      ringGeo.dispose();
      ringMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      hourHandGeo.dispose();
      minuteHandGeo.dispose();
      handMat.dispose();
      subtleEmeraldMat.dispose();

      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full opacity-80 canvas-container pointer-events-none" />;

};

export default ThreeScene;
