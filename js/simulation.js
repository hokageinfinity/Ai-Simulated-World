function initWorld() {

    window.world = {
        year: 1,
        day: 1,

        food: 1000,
        wood: 500,
        stone: 250,
        gold: 100,
        population: 0,

        brain: {
            stability: 80,
            aggression: 20,
            fear: 10,
            prosperity: 60
        },

        history: []
    };
}

function writeStory(text) {

    const entry = `Y${world.year} D${Math.floor(world.day)} | ${text}`;

    world.history.unshift(entry);

    const historyDiv = document.getElementById("history");

    const div = document.createElement("div");
    div.className = "log";
    div.textContent = entry;

    historyDiv.prepend(div);
}

function citizenAI(c) {

    c.hunger += 0.4;

    if (c.hunger > 85) c.health -= 0.6;

    switch (c.job) {
        case "Farmer": world.food += 0.5; break;
        case "Hunter": world.food += 0.3; break;
        case "Builder": world.wood += 0.3; break;
        case "Miner": world.stone += 0.3; break;
        case "Merchant": world.gold += 0.2; break;
    }
}

function storyBrain() {

    const b = world.brain;
    const roll = Math.random();

    if (b.aggression > 55 && roll < 0.002) {
        const lost = Math.floor(Math.random() * 5) + 2;
        citizens.splice(0, lost);

        writeStory(`⚔️ War erupted after rising tensions. ${lost} citizens were lost.`);
    }

    if (world.food < 200 && roll < 0.003) {
        const lost = Math.floor(Math.random() * 4) + 1;
        citizens.splice(0, lost);

        writeStory(`🌾 A famine spreads across the land. ${lost} citizens perish.`);
    }

    if (b.stability > 75 && roll < 0.002) {
        world.gold += 50;

        writeStory(`✨ A Golden Age brings prosperity and peace.`);
    }

    if (roll < 0.002) {
        const name = names[Math.floor(Math.random() * names.length)];
        const newCitizen = createCitizen(citizens.length, name);

        citizens.push(newCitizen);

        writeStory(`👶 ${name} joins the civilization.`);
    }
}

function advanceWorld(days) {

    citizens.forEach(c => citizenAI(c));

    world.food -= citizens.length * 0.1;

    if (world.food < 0) {
        const lost = Math.floor(Math.random() * 3) + 1;
        citizens.splice(0, lost);

        world.food = 0;
        writeStory(`⚠️ Starvation crisis kills ${lost} citizens.`);
    }

    world.brain.stability = Math.max(0, world.brain.stability + 0.01);
    world.brain.aggression = Math.min(100, world.brain.aggression + 0.01);

    storyBrain();

    world.day += days;

    while (world.day > 365) {
        world.day -= 365;
        world.year++;
        writeStory(`📜 Year ${world.year} begins a new era.`);
    }

    world.population = citizens.length;
}

function startSimulation() {

    setInterval(() => {

        advanceWorld(0.08);

        updateUI();
        renderCitizens();

    }, 1000);
}
