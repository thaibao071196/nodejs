import React, { useRef, useState, useEffect } from "react";
import Matter, { Body } from "matter-js";
import UseInterval from "use-interval";

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const Scene = () => {
  const scene = useRef(null);
  const [engine, setEngine] = useState(null);

  UseInterval(() => {
    engine.world.gravity.x = random(-0.1, 0.1);
    engine.world.gravity.y = random(-0.1, 0.1);
    engine.world.gravity.scale = random(-0.001, 0.0001);
  }, 1000);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies;

    var engine = Engine.create({});
    setEngine(engine);

    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false
      }
    });
     
    World.add(engine.world, [
      // walls
      Bodies.rectangle(200, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(600, 300, 50, 800, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 800, { isStatic: true }),
      Bodies.circle(70, 100, 30, { restitution: 0.5 }),
      Bodies.circle(70, 100, 30, { restitution: 0.5 }),
      Bodies.circle(70, 100, 30, { restitution: 0.5 }),
      Bodies.circle(70, 100, 30, { restitution: 0.5 }),
      Bodies.circle(70, 100, 30, { restitution: 0.5 }),
    ]);


    Render.run(render);

    Render.run(render);

    const runner = Runner.create();

    Runner.run(runner, engine);
  }, []);
  return <div ref={scene} />;
};

export default Scene;
