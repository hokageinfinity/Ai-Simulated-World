const KINGDOMS = ["Solaria", "Drakmoor", "Nythera"];

function assignKingdom() {
    return KINGDOMS[Math.floor(Math.random() * KINGDOMS.length)];
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

        kingdoms: {
            Solaria: { power: 50, stability: 70 },
            Drakmoor: { power: 60, stability: 40 },
            Nythera: { power: 40, stability: 80 }
        },

        tension: 30,
        era: "Age of Balance",

        historyBook: []
    };
}

// 📜 STORY WRITER
function writeStory(text) {

    const entry = `Y${world.year} D${Math.floor(world.day)} | ${text}`;

    world.historyBook.unshift(entry);

    const historyDiv = document.getElementById("history");

    const div = document.createElement("div");
    div.className = "log";
    div.textContent = entry;

    historyDiv.prepend(div);
}

// 🗣 CITIZEN AI WITH DIALOGUE
function citizenAI(c) {

    c.hunger += 0.4;

    if (c.hunger > 80) c.health -= 0.5;

    switch (c.job) {
        case "Farmer": world.food += 0.4; break;
        case "Hunter": world.food += 0.3; break;
        case "Builder": world.wood += 0.3; break;
        case "Miner": world.stone += 0.3; break;
        case "Merchant": world.gold += 0.2; break;
    }

    // 🗣 citizen dialogue system
    if (Math.random() < 0.0008) {

        const lines = [
            `${c.name}: Something feels wrong in ${c.kingdom}.`,
            `${c.name}: We need more food to survive.`,
            `${c.name}: The leaders are growing uneasy.`,
            `${c.name}: I sense change coming to our world.`,
            `${c.name}: Life in ${c.kingdom} is uncertain.`
        ];

        writeStory(lines[Math.floor(Math.random() * lines.length)]);
    }
}

// 🧠 AI DIRECTOR BRAIN
function worldBrain() {

    const roll = Math.random();

    let totalPower = 0;
    Object.values(world.kingdoms).forEach(k => totalPower += k.power);

    // WAR EVENT (AI DECIDED)
    if (world.tension > 60 && roll < 0.002) {

        const lost = Math.floor(Math.random() * 6) + 2;
        citizens.splice(0, lost);

        writeStory(
            `⚔️ The Great War begins as kingdoms clash over resources. ${lost} citizens were lost in the chaos.`
        );

        world.tension -= 20;
    }

    // FAMINE EVENT
    if (world.food < 200 && roll < 0.003) {

        const lost = Math.floor(Math.random() * 4) + 1;
        citizens.splice(0, lost);

        writeStory(
            `🌾 A famine spreads across all kingdoms, weakening civilization. ${lost} lives are lost.`
        );
    }

    // GOLDEN AGE EVENT
    if (world.tension < 20 && roll < 0.002) {

        world.gold += 80;

        writeStory(
            `✨ An era of peace begins. The kingdoms enter a Golden Age of prosperity.`
        );
    }

    // ERA EVOLUTION
    if (world.year % 5 === 0 && roll < 0.01) {

        world.era = "Age of Conflict";

        writeStory(
            `📜 A new era begins: ${world.era}. The world is shifting dramatically.`
        );
    }

    // KINGDOM POWER SHIFT
    Object.keys(world.kingdoms).forEach(k => {
        world.kingdoms[k].power += (Math.random() - 0.5);
    });
}

// 🌍 MAIN LOOP
function advanceWorld(days) {

    citizens.forEach(c => citizenAI(c));

    world.food -= citizens.length * 0.1;

    if (world.food < 0) {
        const lost = Math.floor(Math.random() * 3) + 1;
        citizens.splice(0, lost);
        world.food = 0;

        writeStory(`⚠️ Civilization starvation crisis claims ${lost} lives.`);
    }

    world.tension += (Math.random() - 0.5);

    worldBrain();

    world.day += days;

    while (world.day > 365) {
        world.day -= 365;
        world.year++;

        writeStory(`📜 Year ${world.year} begins in the ${world.era}.`);
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
function applyWorldPrompt(text) {

    const t = text.toLowerCase();

    writeStory(`🧠 Divine Influence: "${text}"`);

    // 🌾 PLAGUE / DISEASE
    if (t.includes("plague") || t.includes("disease")) {

        const loss = Math.floor(Math.random() * 10) + 5;
        citizens.splice(0, loss);

        world.food -= 100;

        writeStory(`☠️ A plague spreads across the land. ${loss} citizens perish.`);
        world.tension += 20;
    }

    // ⚔️ WAR
    if (t.includes("war") || t.includes("attack")) {

        world.brain.aggression += 25;
        world.tension += 30;

        const loss = Math.floor(Math.random() * 6) + 2;
        citizens.splice(0, loss);

        writeStory(`⚔️ War erupts due to external influence. ${loss} lives lost.`);
    }

    // ✨ GOLDEN AGE
    if (t.includes("golden age") || t.includes("peace")) {

        world.brain.stability += 25;
        world.gold += 100;

        writeStory(`✨ A Golden Age begins under divine influence.`);
    }

    // 🔥 REBELLION
    if (t.includes("rebellion") || t.includes("uprising")) {

        world.tension += 40;

        writeStory(`🔥 Rebellion spreads across kingdoms.`);
    }

    // 🐉 DRAGON EVENT
    if (t.includes("dragon")) {

        const loss = Math.floor(Math.random() * 5) + 3;
        citizens.splice(0, loss);

        world.food -= 150;

        writeStory(`🐉 A massive dragon descends upon the world.`);
    }

    // 💰 RESOURCE BOOST
    if (t.includes("wealth") || t.includes("gold")) {

        world.gold += 200;

        writeStory(`💰 Resources surge across the civilization.`);
    }
}
