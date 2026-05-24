import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { playGrabSound, playCollisionSound } from '../lib/audio';

interface PhysicsProps {
  children: React.ReactNode;
}

export function Physics({ children }: PhysicsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const isMobile = window.innerWidth < 768 || 
      ('ontouchstart' in window && navigator.maxTouchPoints > 0);

    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // Create engine and runner if they don't exist
    if (!engineRef.current) {
      engineRef.current = Engine.create({
        // Lower gravity on mobile for gentler cascading drops (less violent collisions)
        gravity: { x: 0, y: isMobile ? 0.8 : 1.5 },
        enableSleeping: true,
        // Reduce solver iterations on mobile for less CPU usage
        ...(isMobile && { positionIterations: 4, velocityIterations: 3 }),
      });
    }
    const engine = engineRef.current;
    const world = engine.world;
    World.clear(world, false); // Clear world for re-initialization

    if (!runnerRef.current) {
      // Lower delta on mobile = fewer physics steps per second
      runnerRef.current = Runner.create(isMobile ? { delta: 1000 / 30 } : {});
    }
    const runner = runnerRef.current;


    const rect = container.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;

    // Add boundaries (walls and ground)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);

    World.add(world, [ground, leftWall, rightWall]);

    // Setup interactive bodies from DOM children
    const childNodes = Array.from(container.children) as HTMLElement[];
    const bodies: Matter.Body[] = [];

    childNodes.forEach((child, i) => {
      const elRect = child.getBoundingClientRect();
      const elW = elRect.width || 100;
      const elH = elRect.height || 40;

      // Start position (randomized near top center)
      const x = width / 2 + (Math.random() - 0.5) * (width * 0.4);
      // On mobile: stagger bodies much further apart vertically for a cascading waterfall effect
      // This prevents all bodies from hitting the ground simultaneously (collision storm)
      const ySpacing = isMobile ? 120 : 60;
      const y = -100 - (i * ySpacing);

      const body = Bodies.rectangle(x, y, elW, elH, {
        restitution: isMobile ? 0.2 : 0.3, // Less bounce on mobile = fewer secondary collisions
        friction: 0.8,
        frictionAir: isMobile ? 0.1 : 0.04, // Higher on mobile = settle faster = sleep sooner
        render: { visible: false },
      });

      bodies.push(body);
      World.add(world, body);
    });

    // On mobile, ramp gravity back up after initial cascade settles
    // This gives a gentle entry but normal interaction weight afterward
    let gravityRampTimeout: ReturnType<typeof setTimeout> | null = null;
    if (isMobile) {
      gravityRampTimeout = setTimeout(() => {
        engine.gravity.y = 1.2;
      }, 2500);
    }

    // Add mouse interaction
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);

    // Keep normal scroll behavior by removing mousewheel listeners
    const m = mouse as any;
    m.element.removeEventListener('mousewheel', m.mousewheel);
    m.element.removeEventListener('DOMMouseScroll', m.mousewheel);
    // Allow touch scrolling to some extent
    m.element.removeEventListener('touchstart', m.mousedown);
    m.element.removeEventListener('touchmove', m.mousemove);
    m.element.removeEventListener('touchend', m.mouseup);
    
    // Add custom passive listeners for touch to prevent blocking scroll outside interactive objects
    container.addEventListener('touchstart', m.mousedown, { passive: true });
    container.addEventListener('touchmove', (e) => {
      if (mouseConstraint.body) {
        m.mousemove(e);
      }
    }, { passive: false });
    container.addEventListener('touchend', (e) => {
      if (mouseConstraint.body) {
        m.mouseup(e);
      }
    });


    // Run engine
    Runner.run(runner, engine);

    // Audio setup — delay sound activation longer on mobile to skip the initial cascade noise
    let allowSound = false;
    const soundDelay = isMobile ? 3000 : 1500;
    const soundTimeout = setTimeout(() => {
      allowSound = true;
    }, soundDelay);

    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      if (allowSound) playGrabSound();
    });

    // Throttle collision sounds on mobile to prevent audio processing storms
    let lastCollisionSoundTime = 0;
    const collisionSoundThrottle = isMobile ? 150 : 50; // ms between collision sounds

    Matter.Events.on(engine, 'collisionStart', (event: any) => {
      if (!allowSound) return;
      
      const now = performance.now();
      if (now - lastCollisionSoundTime < collisionSoundThrottle) return;

      let maxRelativeVel = 0;
      
      for (let i = 0; i < event.pairs.length; i++) {
        const { bodyA, bodyB } = event.pairs[i];
        const dx = bodyA.velocity.x - bodyB.velocity.x;
        const dy = bodyA.velocity.y - bodyB.velocity.y;
        const relativeVelocity = Math.sqrt(dx * dx + dy * dy);
        
        if (relativeVelocity > maxRelativeVel) {
          maxRelativeVel = relativeVelocity;
        }
      }

      if (maxRelativeVel > 1.5) {
        lastCollisionSoundTime = now;
        playCollisionSound(maxRelativeVel);
      }
    });

    // Sync DOM to Physics bodies
    let isVisible = false;
    let visibilitySet = false;
    let frameCount = 0;

    const update = () => {
      // Only do heavy physics/DOM updates if visible
      if (!isVisible && visibilitySet) {
        renderFrameRef.current = requestAnimationFrame(update);
        return;
      }

      // On mobile, only sync DOM every other frame (30fps) to reduce paint cost
      frameCount++;
      if (isMobile && frameCount % 2 !== 0 && visibilitySet) {
        renderFrameRef.current = requestAnimationFrame(update);
        return;
      }

      bodies.forEach((body, index) => {
        const child = childNodes[index];
        if (child && body) {
          const x = body.position.x - child.offsetWidth / 2;
          const y = body.position.y - child.offsetHeight / 2;
          
          // Use translate3d for hardware acceleration
          child.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
          
          // Set visibility only once instead of every frame
          if (!visibilitySet) {
            child.style.visibility = 'visible';
          }
        }
      });
      visibilitySet = true;
      renderFrameRef.current = requestAnimationFrame(update);
    };

    update();

    // Optimize with IntersectionObserver to only compute when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          Runner.run(runner, engine);
        } else {
          Runner.stop(runner);
        }
      });
    }, { threshold: 0 });

    if (container) {
      observer.observe(container);
    }

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newRect = container.getBoundingClientRect();
      width = newRect.width;
      height = newRect.height;
      Matter.Body.setPosition(ground, { x: width / 2, y: height + 25 });
      Matter.Body.setPosition(rightWall, { x: width + 25, y: height / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(soundTimeout);
      if (gravityRampTimeout) clearTimeout(gravityRampTimeout);
      Matter.Events.off(mouseConstraint, 'startdrag', undefined as any);
      Matter.Events.off(engine, 'collisionStart', undefined as any);
      cancelAnimationFrame(renderFrameRef.current);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {React.Children.map(children, (child) => (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            visibility: 'hidden',
            willChange: 'transform', // Promote to GPU layer for smoother compositing
            touchAction: 'none' // Better touch handling when dragging
          }}
          className="inline-block cursor-interactive"
        >
          {child}
        </div>
      ))}
    </div>
  );
}

