const jobs = ["Farmer", "Hunter", "Builder", "Miner", "Merchant"];

const citizens = [];
window.citizens = citizens;

function createCitizen(id, name) {
    return {
        id,
        name,
        job: jobs[Math.floor(Math.random() * jobs.length)],

        hunger: 50,
        health: 100,

        // 🧠 EMOTIONS
        happiness: 60,
        fear: 10,
        stress: 10,
        trust: 50,

        // 🤝 RELATIONSHIPS
        relations: {},

        // 📜 PERSONAL MEMORY
        memories: [],
        achievements: []
    };
}

function generateCitizens(amount = 100) {
    for (let i = 0; i < amount; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        citizens.push(createCitizen(i, name));
    }
}

function renderCitizens() {

    const list = document.getElementById("citizensList");
    list.innerHTML = "";

    citizens.forEach(c => {

        list.innerHTML += `
        <div class="citizen" onclick="openCitizenProfile(${c.id})">
            <b>${c.name}</b> (${c.job})<br>
            ❤️ ${c.happiness} 😨 ${c.fear} ⚡ ${c.stress}
        </div>
        `;
    });
}
