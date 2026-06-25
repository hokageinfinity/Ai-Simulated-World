const NATIONS = ["Solaria", "Drakmoor", "Wildlands"];

function assignNation() {
    return NATIONS[Math.floor(Math.random() * 2)];
}

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
            aggression: 0,
            stability: 100,
            prosperity: 100,
            fear: 0
        }
    };
}

function logEvent(text) {
    const history = document.getElementById("history");

    const div = document.createElement("div");
    div.className = "log";
    div.textContent = `Y${world.year} D${Math.floor(world.day)} | ${text}`;

    history.prepend(div);
}

// 🧠 CITIZEN AI
function citizenAI(c) {

    c.hunger += 0.4;

    if (c.hunger > 80) c.health -= 0.5;

    // job economy
    if (c.job === "Farmer") world.food += 0.5;
    if (c.job === "Hunter") world.food += 0.3;
    if (c.job === "Builder") world.wood += 0.3;
    if (c.job === "Miner") world.stone += 0.3;
    if (c.job === "Merchant") world.gold += 0.2;

    // nation influence
    if (c.nation === "Drakmoor") {
        world.brain.aggression += 0.0005;
    }

    if (c.nation === "Solaria") {
        world.brain.stability += 0.0003;
    }
}

// 🧠 WORLD BRAIN DECISION SYSTEM
function worldBrain() {

    const b = world.brain;

    // Normalize values
    b.stability = Math.max(0, Math.min(100, b.stability));
    b.aggression = Math.max(0, Math.min(100, b.aggression));

    const roll = Math.random();

    // WAR EVENT
    if (b.aggression > 60 && roll < 0.002) {
        const loss = Math.floor(Math.random() * 5) + 2;
        citizens.splice(0, loss);
        b.stability -= 10;

        logEvent(`⚔️ WAR erupted between kingdoms! ${loss} citizens lost.`);
    }

    // FAMINE EVENT
    if (world.food < 200 && roll < 0.003) {
        const loss = Math.floor(Math.random() * 3) + 1;
        citizens.splice(0, loss);

        logEvent(`🌾 Famine spreads across the land. ${loss} died.`);
    }

    // GOLDEN AGE
    if (b.stability > 80 && roll < 0.002) {
        world.gold += 50;
        logEvent(`✨ A Golden Age begins. Prosperity rises.`);
    }

    // REBIRTH EVENT
    if (roll < 0.002) {
        const name = names[Math.floor(Math.random() * names.length)];
        const c = createCitizen(citizens.length, name);
        c.nation = assignNation();

        citizens.push(c);

        logEvent(`👶 A new citizen joins ${c.nation}.`);
    }
}

// 🧠 MAIN SIMULATION
function advanceWorld(days) {

    citizens.forEach(c => citizenAI(c));

    world.food -= citizens.length * 0.1;

    // starvation
    if (world.food < 0) {
        const deaths = Math.floor(Math.random() * 3) + 1;
        citizens.splice(0, deaths);
        world.food = 0;
    }

    worldBrain();

    world.day += days;

    while (world.day > 365) {
        world.day -= 365;
        world.year++;
    }

    world.population = citizens.length;
}

function startSimulation() {

    setInterval(() => {

        advanceWorld(0.08); // real-time scaling

        updateUI();
        renderCitizens();

    }, 1000);
}
