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

export {createCryptoBubble}