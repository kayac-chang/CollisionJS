import "./index.scss";
import { Game, IElement, Context, ICircle } from "../lib/core";
import { hitTest, RigidBody, isCircle, elastic_collision } from "../src";

function updatePosition(delta: number, body: RigidBody) {
  const [x, y] = body.position;
  const [vx, vy] = body.velocity;
  body.position = [x + vx * delta, y + vy * delta];
}

function collision(o1: RigidBody, o2: RigidBody) {
  let hit = false;
  if (isCircle(o1) && isCircle(o2)) {
    hit = hitTest.circle_circle(o1, o2);
  }

  o1.style = hit ? "#ff8080" : "#0099b0";
  o2.style = hit ? "#ff8080" : "#0099b0";

  if (!hit) {
    return;
  }

  const v1 = elastic_collision(o1.velocity, o2.velocity, o1.mass, o2.mass);
  const v2 = elastic_collision(o2.velocity, o1.velocity, o2.mass, o1.mass);

  o1.velocity = v1;
  o2.velocity = v2;
}

function main({ canvas }: Context) {
  const background = {
    type: "rect",
    style: "#ffffff",
    position: [0, 0],
    size: [canvas.width, canvas.height],
  };

  const c1: ICircle & RigidBody = {
    type: "circle",
    style: "#0099b0",
    position: [100, 250],
    radius: 20,
    velocity: [100, 0],
    acceleration: [0, 0],
    mass: 1,
  };

  const c2: ICircle & RigidBody = {
    type: "circle",
    style: "#0099b0",
    position: [400, 250],
    radius: 20,
    velocity: [0, 0],
    acceleration: [0, 0],
    mass: 1,
  };

  return function (delta: number) {
    collision(c1, c2);

    [c1, c2].forEach((body) => updatePosition(delta, body));

    return [background, c1, c2] as IElement[];
  };
}

const view = document.getElementById("root") as HTMLCanvasElement;
Game(view, main);
