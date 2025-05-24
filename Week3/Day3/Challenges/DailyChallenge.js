//ch
//Html
/* <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Challenge: Create a solar system</title>
        <style>
            body {
                background-color: black;
                padding: 10px;
            }
            .planet {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                text-align: center;
                padding: 10px;
                position: relative;
                border: 2px solid white;
            }
            .moon {
                position: absolute;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: rgb(237, 237, 237);
                border: 5px solid red;
            }
        </style>
    </head>
    <body>

    <section class="listPlanets"></section>

    <script src="testRun.js"></script>
    </body>
</html> */

//Js
const planets = [
  { name: "Mercury", moons: 0 },
  { name: "Venus", moons: 0 },
  { name: "Earth", moons: 1 },
  { name: "Mars", moons: 2 },
  { name: "Jupiter", moons: 79 },
  { name: "Saturn", moons: 83 },
  { name: "Uranus", moons: 27 },
  { name: "Neptune", moons: 14 }
];

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'pink', 'purple'];

const section = document.querySelector(".listPlanets");

planets.forEach((planet, index) => {
  // Create a div for the planet
  const planetDiv = document.createElement('div');
  planetDiv.classList.add('planet');

  // Set its background color based on index
  planetDiv.style.backgroundColor = colors[index];

  // Add moons to this planet div
  for (let i = 0; i < planet.moons; i++) {
    const moon = document.createElement('div');
    moon.classList.add('moon');
    // Position moons around the planet (you can customize this)
    moon.style.left = `${30 + i * 15}px`;
    moon.style.top = `${10 + i * 10}px`;
    planetDiv.appendChild(moon);
  }

  // Append this planet div (with moons) to the section
  section.appendChild(planetDiv);
});

