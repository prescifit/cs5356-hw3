async function fetchParks() {
    const apiUrl = "https://data.cityofnewyork.us/resource/4j29-i5ry.json"; // NYC Public Parks API
    const parkList = document.getElementById("park-list");

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Filter only parks in Manhattan (borough code: "M")
        const manhattanParks = data.filter(park => park.borough === "M");

        // Clear loading message
        parkList.innerHTML = "";

        // Display the first 5 Manhattan parks
        manhattanParks.slice(0, 5).forEach(park => {
            const parkDiv = document.createElement("div");
            parkDiv.classList.add("park-card");
            parkDiv.innerHTML = `
                <h3>${park.propname || "Unnamed Park"}</h3>
                <p>📍 <strong>Location:</strong> ${park.location || "Not available"}</p>
                <p>🏙️ <strong>Borough:</strong> Manhattan</p>
                <p>📌 <strong>Description:</strong> ${park.description || "No description available."}</p>
            `;
            parkList.appendChild(parkDiv);
        });

        // If no parks are found
        if (manhattanParks.length === 0) {
            parkList.innerHTML = "<p>No parks found in Manhattan.</p>";
        }

    } catch (error) {
        console.error("Error fetching park data:", error);
        parkList.innerHTML = "<p>Failed to load park data.</p>";
    }
}

fetchParks();