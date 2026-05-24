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

    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    // Create engine and runner if they don't exist
    if (!engineRef.current) {
      engineRef.current = Engine.create({
        gravity: { x: 0, y: 1.5 },
        enableSleeping: true,
      });
    }
    const engine = engineRef.current;
    const world = engine.world;
    World.clear(world, false); // Clear world for re-initialization

    if (!runnerRef.current) {
      runnerRef.current = Runner.create();
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

    // Ensure elements are rendered to measure them, then hide them instantly
    // We give them a small tick to measure if needed, but since they rendered
    // before Matter initialized, we can measure right away.

    childNodes.forEach((child, i) => {
      const elRect = child.getBoundingClientRect();
      const elW = elRect.width || 100;
      const elH = elRect.height || 40;

      // Start position (randomized near top center)
      const x = width / 2 + (Math.random() - 0.5) * (width * 0.4);
      const y = -100 - (i * 60);

      const body = Bodies.rectangle(x, y, elW, elH, {
        restitution: 0.3,
        friction: 0.8,
        frictionAir: 0.04,
        render: { visible: false },
      });

      bodies.push(body);
      World.add(world, body);
    });

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
        // e.preventDefault(); // allow default to scroll, unless interacting with a body?
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

    // Audio setup
    let allowSound = false;
    const soundTimeout = setTimeout(() => {
      allowSound = true;
    }, 1500);

    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      if (allowSound) playGrabSound();
    });

    Matter.Events.on(engine, 'collisionStart', (event) => {
      if (!allowSound) return;
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
        playCollisionSound(maxRelativeVel);
      }
    });

    // Sync DOM to Physics bodies
    let isVisible = false;
    let visibilitySet = false;

    const update = () => {
      // Only do heavy physics/DOM updates if visible
      if (!isVisible && visibilitySet) {
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
