const form = document.getElementById("gif-form");
const input = document.getElementById("search-input");
const gifContainer = document.getElementById("gif-container");
const deleteAllBtn = document.getElementById("delete-all");

const fetchRandomGif = async (tag) => {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My&tag=${tag}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const gifUrl = data.data.images.fixed_height.url;

    // Create container div for img + delete button
    const gifWrapper = document.createElement("div");

    // Create img element
    const img = document.createElement("img");
    img.src = gifUrl;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";

    // When delete button clicked, remove the whole gifWrapper div
    deleteBtn.addEventListener("click", () => {
      gifWrapper.remove();
    });

    // Append img and delete button to gifWrapper
    gifWrapper.appendChild(img);
    gifWrapper.appendChild(deleteBtn);

    // Append gifWrapper to gifContainer on page
    gifContainer.appendChild(gifWrapper);

  } catch (error) {
    console.error("Error fetching GIF:", error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm) {
    fetchRandomGif(searchTerm);
    input.value = "";
  }
});

// When DELETE ALL button clicked, remove all GIFs
deleteAllBtn.addEventListener("click", () => {
  gifContainer.innerHTML = "";
});
