function saveWorld() {
    const saveData = {
        world: window.world,
        citizens: citizens
    };

    localStorage.setItem("hokageWorldSave", JSON.stringify(saveData));

    logEvent("💾 World saved successfully.");
}

function loadWorld() {
    const data = localStorage.getItem("hokageWorldSave");

    if (!data) {
        logEvent("⚠️ No save found.");
        return;
    }

    const saveData = JSON.parse(data);

    window.world = saveData.world;

    citizens.length = 0;
    saveData.citizens.forEach(c => citizens.push(c));

    logEvent("📂 World loaded successfully.");

    updateUI();
    renderCitizens();
}

function resetWorld() {
    localStorage.removeItem("hokageWorldSave");

    citizens.length = 0;

    generateCitizens(100);
    initWorld();

    logEvent("🔄 World reset complete.");

    updateUI();
    renderCitizens();
}
