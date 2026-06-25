let timeAccumulator = 0;

// 1 real second = ~0.0833 in-game days (≈ 5 days per hour)
const DAYS_PER_SECOND = 0.0833;

function initWorld() {
    window.world = {
        year: 1,
        day: 1,

        food: 1000,
        wood: 500,
        stone: 250,
        gold: 100,
        houses: 25,
        population: 0
    };
}

function logEvent(text) {
    const history = document.getElementById("history");

    const div = document.createElement("div");
    div.className = "log";
    div.textContent = `Y${world.year} D${Math.floor(world.day)} | ${text}`;

    history.prepend(div);
}

function citizenAI(c) {

    c.hunger += 0.4;

    // Job production
    if (c.job === "Farmer") world.food += 0.6;
    if (c.job === "Hunter") world.food += 0.4;
    if (c.job === "Builder") world.wood += 0.3;
    if (c.job === "Miner") world.stone += 0.3;
    if (c.job === "Merchant") world.gold += 0.2;

    // Hunger effects
    if (c.hunger > 80) {
        c.health -= 0.5;
        c.happiness -= 0.3;
    }

    // Random small behaviors
    if (Math.random() < 0.0005) {
        c.happiness += 2;
    }

    if (Math.random() < 0.0003) {
        logEvent(`${c.name} experienced a personal moment.`);
    }
}

function worldEvents() {

    const roll = Math.random();

    if (roll < 0.001) {
        world.food -= 100;
        logEvent("🐉 Dragon raid destroyed supplies!");
    }

    if (roll >= 0.001 && roll < 0.0015) {
        world.stone += 80;
        logEvent("💎 Rich mineral discovery!");
    }

    if (roll >= 0.0015 && roll < 0.002) {
        const name = names[Math.floor(Math.random() * names.length)];
        citizens.push(createCitizen(citizens.length, name));
        logEvent("👶 A new citizen was born.");
    }
}

function advanceWorld(days) {

    // Run citizen AI
    citizens.forEach(c => citizenAI(c));

    // Consumption
    world.food -= citizens.length * 0.15;

    // Starvation system
    if (world.food < 0) {
        const deaths = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < deaths && citizens.length > 0; i++) {
            citizens.pop();
        }

        world.food = 0;
        logEvent(`⚠️ Starvation! ${deaths} citizens died.`);
    }

    // Events
    worldEvents();

    // Time progression
    world.day += days;

    while (world.day > 365) {
        world.day -= 365;
        world.year++;
    }

    world.population = citizens.length;
}

function startSimulation() {

    setInterval(() => {

        advanceWorld(DAYS_PER_SECOND);

        updateUI();
        renderCitizens();

    }, 1000);
}
