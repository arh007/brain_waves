// ========================================================
// BRAIN WAVES — 3D NEURAL SPHERE & LIVING CANVAS ENGINE
// High-performance GPU Canvas simulation
// ========================================================

(function() {
  const canvas = document.getElementById('neural-3d-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let animationId;
  let isVisible = true;

  // 3D Sphere Parameters
  const NODE_COUNT = 130;
  const SPHERE_RADIUS = 280;
  const FOV = 420;
  const CAMERA_DIST = 580;
  const MAX_CONNECT_DIST = 95;

  // Rotational state
  let rotX = 0.2;
  let rotY = 0.3;
  let targetRotX = 0.2;
  let targetRotY = 0.3;
  let mouseX = 0;
  let mouseY = 0;

  // Nodes & Pulses
  const nodes = [];
  const pulses = [];

  // Generate 3D Fibonacci Sphere Nodes
  const phi = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = 2 * Math.PI * i / phi;
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    nodes.push({
      baseX: x * SPHERE_RADIUS,
      baseY: y * SPHERE_RADIUS,
      baseZ: z * SPHERE_RADIUS,
      x: 0, y: 0, z: 0,
      projX: 0, projY: 0, projScale: 0,
      radius: 1.8 + Math.random() * 2.2,
      pulseEnergy: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      isCore: Math.random() > 0.85
    });
  }

  // Window Resize
  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.parentElement.clientWidth || window.innerWidth;
    height = canvas.parentElement.clientHeight || window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Mouse Interaction (Parallax)
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / width - 0.5;
    mouseY = (e.clientY - rect.top) / height - 0.5;

    targetRotY = mouseX * 1.5;
    targetRotX = -mouseY * 1.2;
  });

  // Touch Interaction
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouseX = (touch.clientX - rect.left) / width - 0.5;
      mouseY = (touch.clientY - rect.top) / height - 0.5;
      targetRotY = mouseX * 1.4;
      targetRotX = -mouseY * 1.0;
    }
  }, { passive: true });

  // Spawn dynamic synaptic energy pulses
  setInterval(() => {
    if (!isVisible) return;
    if (pulses.length < 8 && nodes.length > 2) {
      const fromIdx = Math.floor(Math.random() * nodes.length);
      // find nearest neighbor
      let toIdx = -1;
      let minDist = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (j === fromIdx) continue;
        const dx = nodes[fromIdx].baseX - nodes[j].baseX;
        const dy = nodes[fromIdx].baseY - nodes[j].baseY;
        const dz = nodes[fromIdx].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < MAX_CONNECT_DIST && dist < minDist) {
          minDist = dist;
          toIdx = j;
        }
      }
      if (toIdx !== -1) {
        pulses.push({
          from: fromIdx,
          to: toIdx,
          progress: 0,
          speed: 0.035 + Math.random() * 0.03
        });
      }
    }
  }, 400);

  // Intersection Observer to stop render loop when out of viewport
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !animationId) {
      render();
    }
  }, { threshold: 0.05 });
  observer.observe(canvas);

  // Main Render Loop
  let frame = 0;
  function render() {
    if (!isVisible) {
      animationId = null;
      return;
    }

    frame++;

    // Clear with slight trailing fade
    ctx.clearRect(0, 0, width, height);

    // Dynamic rotation with momentum damping
    rotX += (targetRotX - rotX) * 0.04;
    rotY += (targetRotY - rotY) * 0.04;

    // Ambient spin
    const currentRotY = rotY + frame * 0.003;
    const currentRotX = rotX + Math.sin(frame * 0.005) * 0.1;

    const cosY = Math.cos(currentRotY);
    const sinY = Math.sin(currentRotY);
    const cosX = Math.cos(currentRotX);
    const sinX = Math.sin(currentRotX);

    const centerX = width * 0.62; // Center slightly to the right to frame hero headline
    const centerY = height * 0.52;

    // 1. Transform Nodes into 3D Coordinates
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.pulseEnergy += n.pulseSpeed;

      // Slight breathing oscillation
      const breath = 1 + Math.sin(n.pulseEnergy) * 0.04;
      const rx = n.baseX * breath;
      const ry = n.baseY * breath;
      const rz = n.baseZ * breath;

      // Rotate Y
      const x1 = rx * cosY + rz * sinY;
      const y1 = ry;
      const z1 = -rx * sinY + rz * cosY;

      // Rotate X
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      n.x = x2;
      n.y = y2;
      n.z = z2;

      // Perspective projection
      const scale = FOV / (CAMERA_DIST + z2);
      n.projX = centerX + x2 * scale;
      n.projY = centerY + y2 * scale;
      n.projScale = scale;
    }

    // 2. Draw Synaptic Connections
    for (let i = 0; i < nodes.length; i++) {
      const ni = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const nj = nodes[j];
        const dx = ni.x - nj.x;
        const dy = ni.y - nj.y;
        const dz = ni.z - nj.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_CONNECT_DIST) {
          const depthAlpha = Math.max(0.08, ((ni.z + nj.z) / 2 + SPHERE_RADIUS) / (SPHERE_RADIUS * 2));
          const lineAlpha = (1 - dist / MAX_CONNECT_DIST) * 0.45 * depthAlpha;

          ctx.beginPath();
          ctx.moveTo(ni.projX, ni.projY);
          ctx.lineTo(nj.projX, nj.projY);

          // Gradient color between cyan and electric violet
          const grad = ctx.createLinearGradient(ni.projX, ni.projY, nj.projX, nj.projY);
          grad.addColorStop(0, `rgba(101, 245, 255, ${lineAlpha})`);
          grad.addColorStop(1, `rgba(155, 107, 255, ${lineAlpha})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1 * Math.min(ni.projScale, nj.projScale);
          ctx.stroke();
        }
      }
    }

    // 3. Draw Synaptic Energy Pulses
    for (let p = pulses.length - 1; p >= 0; p--) {
      const pulse = pulses[p];
      pulse.progress += pulse.speed;

      if (pulse.progress >= 1) {
        pulses.splice(p, 1);
        continue;
      }

      const nFrom = nodes[pulse.from];
      const nTo = nodes[pulse.to];

      const px = nFrom.projX + (nTo.projX - nFrom.projX) * pulse.progress;
      const py = nFrom.projY + (nTo.projY - nFrom.projY) * pulse.progress;
      const pScale = nFrom.projScale + (nTo.projScale - nFrom.projScale) * pulse.progress;

      ctx.beginPath();
      ctx.arc(px, py, 3 * pScale, 0, Math.PI * 2);
      ctx.fillStyle = '#65F5FF';
      ctx.shadowColor = '#65F5FF';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    // 4. Draw Nodes (Sort back to front)
    nodes.sort((a, b) => a.z - b.z);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const depthFactor = (n.z + SPHERE_RADIUS) / (SPHERE_RADIUS * 2);
      const alpha = Math.max(0.18, depthFactor);
      const drawRadius = Math.max(1, n.radius * n.projScale);

      ctx.beginPath();
      ctx.arc(n.projX, n.projY, drawRadius, 0, Math.PI * 2);

      if (n.isCore) {
        ctx.fillStyle = `rgba(155, 107, 255, ${alpha})`;
        ctx.shadowColor = 'rgba(155, 107, 255, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = `rgba(101, 245, 255, ${alpha * 0.9})`;
        ctx.fill();
      }

      // Draw faint halo around foreground nodes
      if (depthFactor > 0.75) {
        ctx.beginPath();
        ctx.arc(n.projX, n.projY, drawRadius * 2.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(101, 245, 255, ${0.15 * depthFactor})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    animationId = requestAnimationFrame(render);
  }

  // Initial trigger
  render();
})();
