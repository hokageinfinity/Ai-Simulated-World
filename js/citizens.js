const jobs = ["Farmer", "Hunter", "Builder", "Miner", "Merchant"];

const citizens = [];
window.citizens = citizens;

function createCitizen(id, name) {
    return {
        id,
        name,
        age: Math.floor(Math.random() * 40) + 18,
        job: jobs[Math.floor(Math.random() * jobs.length)],

        hunger: Math.floor(Math.random() * 50),
        happiness: 50 + Math.floor(Math.random() * 50),
        health: 70 + Math.floor(Math.random() * 30)
    };
}

function generateCitizens(amount = 100) {
    for (let i = 0; i < amount; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        citizens.push(createCitizen(i, name));
    }
}

function renderCitizens(filter = "") {
    const list = document.getElementById("citizensList");
    list.innerHTML = "";

    citizens
        .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
        .slice(0, 80)
        .forEach(c => {

            list.innerHTML += `
            <div class="citizen">
                <b>${c.name}</b> (${c.job})<br>
                Age:${c.age} | HP:${Math.floor(c.health)} | Happy:${Math.floor(c.happiness)} | Hunger:${Math.floor(c.hunger)}
            </div>
            `;
        });
}
