export const drawLineBetweenPoints = (x1, x2, y1, y2) => {
  const line = document.createElement("div");
  line.className = "line";
  // Calculate the distance between the two points
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  // Calculate the angle in radians and convert it to degrees
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // Set the width (length) of the line based on the distance
  line.style.width = `${distance}px`;

  // Position the line at (x1, y1)
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.height = "2px";
  line.style.position = "absolute";
  line.style.background = "#0066FF";
  line.style.transformOrigin = "0 0";

  // Rotate the line to the correct angle
  line.style.transform = `rotate(${angle}deg)`;

  // Append the line to the container
  document.body.appendChild(line);
};
