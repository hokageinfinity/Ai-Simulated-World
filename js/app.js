function updateUI() {

    document.getElementById("year").textContent = world.year;
    document.getElementById("day").textContent = world.day;

    document.getElementById("population").textContent = citizens.length;

    document.getElementById("food").textContent = world.food;
    document.getElementById("wood").textContent = world.wood;
    document.getElementById("stone").textContent = world.stone;
    document.getElementById("gold").textContent = world.gold;
    document.getElementById("houses").textContent = world.houses;
}

function setupTabs() {
    const buttons = document.querySelectorAll(".tabBtn");
    const tabs = document.querySelectorAll(".tab");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            tabs.forEach(t => t.classList.remove("active"));

            btn.classList.add("active");

            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });
}

function createEvent() {
    const input = document.getElementById("eventInput");
    const text = input.value.trim();

    if (!text) return;

    logEvent("🌟 PLAYER EVENT: " + text);

    const lower = text.toLowerCase();

    if (lower.includes("dragon")) {
        const deaths = Math.floor(Math.random() * 5) + 2;
        for (let i = 0; i < deaths && citizens.length > 0; i++) {
            citizens.pop();
        }
        world.food -= 100;
        logEvent(`🐉 Dragon attack! ${deaths} citizens lost.`);
    }

    if (lower.includes("gold")) {
        world.gold += 100;
        logEvent("💰 Gold discovered in the land!");
    }

    if (lower.includes("meteor")) {
        world.stone -= 80;
        world.food -= 50;
        logEvent("☄️ Meteor impact caused destruction!");
    }

    input.value = "";

    updateUI();
    renderCitizens();
}

function setupButtons() {

    document.getElementById("nextDayBtn")
        .addEventListener("click", simulateDay);

    document.getElementById("eventBtn")
        .addEventListener("click", createEvent);

    document.getElementById("saveBtn")
        .addEventListener("click", saveWorld);

    document.getElementById("loadBtn")
        .addEventListener("click", loadWorld);

    document.getElementById("resetBtn")
        .addEventListener("click", resetWorld);

    document.getElementById("citizenSearch")
        .addEventListener("input", (e) => {
            renderCitizens(e.target.value);
        });
}

function startGame() {

    generateCitizens(100);
    initWorld();

    setupTabs();
    setupButtons();

    updateUI();
    renderCitizens();

    logEvent("🌎 Civilization initialized.");
}

startGame();
