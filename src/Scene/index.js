import React, { useRef, useState, useEffect } from "react";
import Matter, {
  Engine,
  Render,
  World,
  Runner,
  Bodies,
  Mouse,
  MouseConstraint,
  Events,
} from "matter-js";

import MatterAttractors from 'matter-attractors';

import { useDidUpdate } from "../shared-hooks/useDidUpdate";
import iconCrypto from "../assets/images/icon-crypto.png";

import {createCryptoBubble} from './createBodyFunction/createCryptoBubble'

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const Scene = () => {
  const scene = useRef(null);
  const engine = Engine.create({});
  const [bubbles, setBubbles] = useState([]);

  const ballCategory = 0x0002;
  const wallCategory = 0x0001;
  const world = engine.world;

   // *************** create gravity enviroment ********************* //
   engine.gravity.y = 0;

  //***************************Create wall*************************************
  const topWall = Bodies.rectangle(
    window.innerWidth / 2,
    0,
    window.innerWidth,
    3,
    {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    }
  );

  const bottomWall = Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight,
    window.innerWidth,
    3,
    {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    }
  );

  const leftWall = Bodies.rectangle(
    0,
    window.innerHeight / 2,
    3,
    window.innerHeight,
    {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    }
  );

  const rightWall = Bodies.rectangle(
    window.innerWidth,
    window.innerHeight / 2,
    50,
    window.innerHeight,
    {
      isStatic: true,
      render: {
        fillStyle: "transparent",
      },
    }
  );
   

  // *************** create movement for bubble *******************//
  useDidUpdate(() => {
    setInterval(() => {
      for (const bubble of bubbles) {
        Matter.Body.applyForce(bubble, bubble.position, {
          x: random(-0.003, 0.003),
          y: random(-0.003, 0.003),
        });
      }
    }, 1000);
  }, [bubbles]);

  useEffect(() => {
    // render global canvas
    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
      },
    });

    //create and constraint mouse
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 2,
        render: {
          visible: false,
        },
      },
    });

    const tempBubbles = [];
      for (let i = 0; i < 20; i++) {
        createCryptoBubble("SAFE", 12.5, iconCrypto, 60, (url) => {
          const bubble = Bodies.circle(
            random(0, window.innerWidth),
            random(0, window.innerHeight),
            60,
            {
              restitution: 0.8,
              force:{x:random(-0.01,0.01),y:random(-0.01,0.01)},
              // collisionFilter:{
                // category: ballCategory,
                // mask: wallCategory,
              // },
              collision: {
                depth: -10,
              },
              render: {
                sprite: {
                  texture: url,
                },
              },
            },
          );

          World.add(world, bubble);
          tempBubbles.push(bubble);
        });
      }
      setBubbles(tempBubbles);

    // **************** add all body into world ***************** //
    World.add(world, [
      mouseConstraint,
      topWall,
      bottomWall,
      leftWall,
      rightWall,
    ]);

    Events.on(engine,'collisionStart',function(event){
    console.log(event)
    const pair = event.pairs[0];
    Matter.Body.set(pair.bodyB,{depth: -5})
    })

    
    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
  }, []);

  return <div ref={scene} className="wall" />;
};

export default Scene;
