const getGifs = async () => {
  const url =
    "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const container = document.getElementById("gif-container");

    data.data.forEach((gif) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url; // You can also use .original.url
      container.appendChild(img);
    });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};

getGifs();
