const getStarship = async () => {
  const url = "https://www.swapi.tech/api/starships/9/";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    consolr.log(data.result);
    
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};
