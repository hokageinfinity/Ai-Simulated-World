function updateUI() {

    document.getElementById("year").textContent = world.year;
    document.getElementById("day").textContent = Math.floor(world.day);

    document.getElementById("population").textContent = citizens.length;

    document.getElementById("food").textContent = Math.floor(world.food);
    document.getElementById("wood").textContent = Math.floor(world.wood);
    document.getElementById("stone").textContent = Math.floor(world.stone);
    document.getElementById("gold").textContent = Math.floor(world.gold);
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

function startGame() {

    generateCitizens(100);
    initWorld();

    setupTabs();

    updateUI();
    renderCitizens();

    writeStory("🌍 Civilization awakens.");

    startSimulation();
}

startGame();
