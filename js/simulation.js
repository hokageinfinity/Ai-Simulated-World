function initWorld() {
    window.world = {
        year: 1,
        day: 1,

        population: citizens.length,

        food: 1000,
        wood: 500,
        stone: 250,
        gold: 100,
        houses: 25
    };
}

function logEvent(text) {
    const history = document.getElementById("history");

    const div = document.createElement("div");
    div.className = "log";
    div.textContent = `Day ${world.day} | ${text}`;

    history.prepend(div);
}

function simulateDay() {

    // Basic consumption
    world.food -= citizens.length;

    // Production based on jobs
    citizens.forEach(c => {

        if (c.job === "Farmer") world.food += 3;
        if (c.job === "Hunter") world.food += 2;
        if (c.job === "Builder") world.wood += 2;
        if (c.job === "Miner") world.stone += 2;
        if (c.job === "Merchant") world.gold += 1;

        // small natural stat changes
        c.happiness += (Math.random() * 2 - 1);
        c.health += (Math.random() * 1 - 0.5);

        if (c.happiness > 100) c.happiness = 100;
        if (c.happiness < 0) c.happiness = 0;

        if (c.health > 100) c.health = 100;
        if (c.health < 0) c.health = 0;
    });

    // Starvation system
    if (world.food < 0) {
        const deaths = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < deaths; i++) {
            citizens.pop();
        }

        world.food = 0;
        logEvent(`⚠️ Starvation! ${deaths} citizens died.`);
    }

    // Random births
    if (Math.random() < 0.03) {
        const name = names[Math.floor(Math.random() * names.length)];
        const newId = citizens.length + 1;

        citizens.push(createCitizen(newId, name));
        logEvent("👶 A child was born.");
    }

    // Random world events
    const eventRoll = Math.random();

    if (eventRoll < 0.02) {
        world.food -= 100;
        logEvent("🐉 Dragon attack! Food destroyed.");
    }

    if (eventRoll >= 0.02 && eventRoll < 0.04) {
        world.stone += 100;
        logEvent("💎 Rich mineral discovery!");
    }

    if (eventRoll >= 0.04 && eventRoll < 0.06) {
        world.population += 5;
        logEvent("🧭 New travelers joined the village.");
    }

    // Advance time
    world.day++;

    if (world.day > 365) {
        world.day = 1;
        world.year++;
    }

    world.population = citizens.length;

    updateUI();
    renderCitizens();
}
