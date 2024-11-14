// Function to load XML file using Fetch API
function loadXMLDoc(filename) {
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(str => {
            // Parse the XML data
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");

            // Log XML data to see if it loaded
            console.log("Loaded XML data:", xmlDoc);

            if (xmlDoc) {
                // Call to parse and render menu
                parseMenu(xmlDoc);
            }
        })
        .catch(error => console.error("Error loading XML file:", error));
}

// Function to parse XML data and render menu items
function parseMenu(xmlDoc) {
    const groups = xmlDoc.getElementsByTagName("GRUP");

    console.log("Parsing menu groups:", groups.length); // Check if groups are found

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const groupName = group.getElementsByTagName("NOM")[0].textContent;

        const dishes = group.getElementsByTagName("PLAT");
        for (let j = 0; j < dishes.length; j++) {
            const dish = dishes[j];
            const name = dish.getElementsByTagName("NOM")[0].textContent;
            const description = dish.getElementsByTagName("DESCRIPCIO")[0].textContent;
            const allergens = dish.getElementsByTagName("ALERGENOS")[0].textContent;
            const picante = dish.getElementsByTagName("PICANTE")[0].textContent;
            const imageUrl = dish.getElementsByTagName("IMATGE")[0].textContent;

            console.log(`Rendering dish: ${name}, Image URL: ${imageUrl}`);

            renderMenuItem(groupName, name, description, allergens, picante, imageUrl);
        }
    }
}

// Function to render a single menu item on the page
function renderMenuItem(groupName, name, description, allergens, picante, imageUrl) {
    const menuContainer = document.getElementById("menu");

    // Create group section if it doesn't already exist
    let groupSection = document.querySelector(`section[data-group="${groupName}"]`);
    if (!groupSection) {
        groupSection = document.createElement("section");
        groupSection.dataset.group = groupName;
        groupSection.innerHTML = `<h2>${groupName}</h2>`;
        menuContainer.appendChild(groupSection);
    }

    // Create dish container
    const dishContainer = document.createElement("div");
    dishContainer.classList.add("menu-item");

    // Populate dish content
    dishContainer.innerHTML = `
        <img src="img/${imageUrl}" alt="${name}" onerror="this.src='img/default.jpg';">
        <h3>${name}</h3>
        <p>${description}</p>
        <p><strong>Allergens:</strong> ${allergens}</p>
        <p><strong>Spicy:</strong> ${picante}</p>
    `;

    // Append dish to group section
    groupSection.appendChild(dishContainer);
}

// Initialize menu loading on page load
document.addEventListener("DOMContentLoaded", () => {
    loadXMLDoc("data.xml");
});

//this shit aint working, so i reached a point i have just started adding stuff and stuff to see if anything woud work, 
//im going insane. completly crazy 