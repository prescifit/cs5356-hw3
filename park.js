async function fetchParks() {
const apiUrl = "https://data.cityofnewyork.us/resource/4j29-i5ry.json"; // NYC Public Parks API
const parkList = document.getElementById("park-list");

try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Clear loading message
    parkList.innerHTML = "";

    // Display the first 5 parks
    data.slice(0, 5).forEach(park => {
    const parkDiv = document.createElement("div");
    parkDiv.classList.add("park-card");
    parkDiv.innerHTML = `
        <h3>${park.propname || "Unnamed Park"}</h3>
        <p>📍 <strong>Location:</strong> ${park.location || "Not available"}</p>
        <p>🏙️ <strong>Borough:</strong> ${park.borough || "Unknown"}</p>
        <p>📌 <strong>Description:</strong> ${park.description || "No description available."}</p>
    `;
    parkList.appendChild(parkDiv);
    });

} catch (error) {
    console.error("Error fetching park data:", error);
    parkList.innerHTML = "<p>Failed to load park data.</p>";
}
}

fetchParks();
