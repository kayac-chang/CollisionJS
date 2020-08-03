import "./index.scss";

function draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
}

function main() {
  const canvas = document.createElement("canvas");

  document.body.append(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw `Your browser not support canvas api..`;
  }

  draw(ctx, canvas.clientWidth, canvas.clientHeight);
}

main();
