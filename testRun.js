const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
planets.forEach(planet => {
  const div = document.createElement("div");
  div.className = "planet";
});

planets.forEach(planet => {
  div = document.querySelector("div");
  div.innerText("color = red")
})