const nameEl = document.getElementById("name");
const heightEl = document.getElementById("height");
const genderEl = document.getElementById("gender");
const birthYearEl = document.getElementById("birth-year");
const homeWorldEl = document.getElementById("home-world");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const button = document.getElementById("find-button");

button.addEventListener("click", getRandomCharacter);

async function getRandomCharacter() {
  const randomId = Math.floor(Math.random() * 83) + 1;
  showLoading(true);
  try {
    const res = await fetch(`https://www.swapi.tech/api/people/${randomId}`);
    if (!res.ok) throw new Error("Character fetch failed");
    const data = await res.json();
    const character = data.result.properties;

    // Fetch homeworld
    const homeworldRes = await fetch(character.homeworld);
    const homeworldData = await homeworldRes.json();

    displayCharacter(character, homeworldData.result.properties.name);
  } catch (err) {
    console.error(err);
    showError(true);
  } finally {
    showLoading(false);
  }
}

function displayCharacter(character, homeworld) {
  nameEl.textContent = character.name;
  heightEl.textContent = character.height;
  genderEl.textContent = character.gender;
  birthYearEl.textContent = character.birth_year;
  homeWorldEl.textContent = homeworld;
  errorEl.classList.add("hidden");
}

function showLoading(isLoading) {
  loadingEl.classList.toggle("hidden", !isLoading);
}

function showError(isError) {
  errorEl.classList.toggle("hidden", !isError);
}
