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
  Collision,
  Pairs,
  Pair,
} from "matter-js";
import { useDidUpdate } from "../shared-hooks/useDidUpdate";

import iconCrypto from "../assets/images/icon-crypto.png";

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const Scene = () => {
  const scene = useRef(null);
  const engine = Engine.create({});
  const [bubbles, setBubbles] = useState([]);

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
    engine.gravity.y = 0;
    const world = engine.world;

    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
      },
    });

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

    //Create crypto Bubble
    function createCryptoBubble(
      cryptoName,
      percent,
      url,
      diameter,
      onSuccessImg
    ) {
      //create canvas
      const canvas = document.createElement("canvas");
      canvas.width = diameter * 2;
      canvas.height = diameter * 2;

      const ctx = canvas.getContext("2d");
      const img = new Image();

      //create bubble
      let gradient;
      ctx.arc(diameter, diameter, diameter * 0.85, 0, 2 * Math.PI);
      ctx.fillStyle = "rgb(55 31 31 / 75%)";
      ctx.fill();

      gradient = ctx.createRadialGradient(
        diameter,
        diameter,
        diameter * 0.8,
        diameter,
        diameter,
        diameter
      );
      gradient.addColorStop(0, "rgb(55 31 31 / 75%)");
      gradient.addColorStop(1, "red");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = diameter * 0.3;
      ctx.stroke();

      //create name crypto
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(cryptoName, diameter, diameter);

      //create percent crypto
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${percent}%`, diameter, diameter * 1.5);

      //create iconCrypto
      img.onload = function () {
        ctx.drawImage(
          img,
          diameter - diameter / 4,
          diameter / 5,
          diameter / 2,
          diameter / 2
        );
        onSuccessImg(canvas.toDataURL("image/png"));
      };

      img.src = url;
      img.crossOrigin = "anonymous";
    }

    const tempBubbles = [];

    (function renderBubbles() {
      for (let i = 0; i < 2; i++) {
        createCryptoBubble("SAFE", 12.5, iconCrypto, 60, (url) => {
          const bubble = Bodies.circle(
            random(0, window.innerWidth),
            random(0, window.innerHeight),
            60,
            {
              restitution: 0.5,
              render: {
                sprite: {
                  texture: url,
                },
              },
            }
          );

          World.add(world, bubble);
          tempBubbles.push(bubble);
        });
      }
      setBubbles(tempBubbles);
    })();

    //Create wall
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

    World.add(world, [
      mouseConstraint,
      topWall,
      bottomWall,
      leftWall,
      rightWall,
    ]);

    Events.on(mouseConstraint, "mousemove", function (event) {
      var chooseBubble = Matter.Query.point(tempBubbles, event.mouse.position);

      if (chooseBubble[0]) {
       console.log(chooseBubble[0])
      }
    });

     
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
