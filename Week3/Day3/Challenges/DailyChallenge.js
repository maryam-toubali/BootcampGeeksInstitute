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
const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

const section = document.querySelector(".listPlanets");

const colors = ["gray", "goldenrod", "blue", "red", "orange", "khaki", "lightblue", "darkblue"];

planets.forEach((planet, index) => {
  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet");
  planetDiv.style.backgroundColor = colors[index];
  planetDiv.textContent = planet;
  section.appendChild(planetDiv);
});


