const jobs = [
    "Hunter",
    "Farmer",
    "Builder",
    "Miner",
    "Merchant"
];

const citizens = [];

function createCitizen(id, name) {
    return {
        id: id,
        name: name,
        age: Math.floor(Math.random() * 40) + 18,
        job: jobs[Math.floor(Math.random() * jobs.length)],
        happiness: 50 + Math.floor(Math.random() * 50),
        health: 70 + Math.floor(Math.random() * 30)
    };
}

// Generate starting population
function generateCitizens(amount = 100) {
    for (let i = 0; i < amount; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        citizens.push(createCitizen(i, name));
    }
}

// Render citizens in UI
function renderCitizens(filter = "") {
    const list = document.getElementById("citizensList");
    list.innerHTML = "";

    citizens
        .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
        .slice(0, 50)
        .forEach(c => {
            const div = document.createElement("div");
            div.className = "citizen";

            div.textContent =
                `${c.name} | ${c.job} | Age ${c.age} | HP ${c.health} | Happy ${c.happiness}`;

            list.appendChild(div);
        });
}
