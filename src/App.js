import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import {useRef, useEffect} from 'react';

function App () {

  const sceneRef = useRef(null)
 
  useEffect(()=> {
    const Engine = Matter.Engine
    const Render = Matter.Render
    const  World = Matter.World
    const  Bodies = Matter.Bodies
    const  Runner = Matter.Runner
    const  Mouse = Matter.Mouse
    const  MouseConstraint = Matter.MouseConstraint;
    const Composite = Matter.Composite
    const Common = Matter.Common

  var engine = Engine.create({
    // positionIterations: 20
  });

  var render = Render.create({
    element: sceneRef.current,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false
    }
  });

  var ballA = Bodies.circle(window.innerWidth/2, 50, 30, { restitution: 0.7 },1000);
  var ballB = Bodies.circle(window.innerWidth/2, 50, 30, { restitution: 0.7 });
  var ballC = Bodies.circle(window.innerWidth/2, 50, 30, { restitution: 0.7 });
  var ballD = Bodies.circle(window.innerWidth/2, 50, 30, { restitution: 0.7 });
  var ballE = Bodies.circle(window.innerWidth/2, 50, 30, { restitution: 0.7 });
  Composite.add(engine.world, [
    // walls
    Bodies.rectangle(0, 0,5000, 50, { isStatic: true }),
    Bodies.rectangle(0, window.innerHeight, 5000, 50, { isStatic: true }),
    Bodies.rectangle(0, 0, 50, 5000, { isStatic: true }),
    Bodies.rectangle(window.innerWidth, 0, 100, 5000, { isStatic: true }),
  ]);

  Composite.add(engine.world, [ballA, ballB,ballC,ballD,ballE]);

  // add mouse control
  const mouse = Mouse.create(render.canvas)
  const  mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.8,
          render: {
            visible: false
          }
        }
      });

  Composite.add(engine.world, mouseConstraint);

  // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
  //   Composite.add(engine.world, Bodies.circle(window.innerWidth/2, 50, 30, { restitution: 0.7 }));
  // });

  function addMoreBalls () {
    const ball = Bodies.circle(window.innerWidth/2, 50, 30, { restitution: 0.7 });
    Composite.add(engine.world,[ball])
  }

  // setInterval(()=>{
  //   addMoreBalls()
  // },500)


  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
    Runner.run(runner, engine);
  },[])
  

  return <div ref={sceneRef} />;
}
export default App;

