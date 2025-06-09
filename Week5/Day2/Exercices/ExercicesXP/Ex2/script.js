const getSunGifs = async () => {
  const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
  const url = `https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=${apiKey}`;

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

  } catch (err) {
    console.error("Fetch failed:", err);
  }
};

getSunGifs();
