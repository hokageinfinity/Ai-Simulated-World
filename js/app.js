const world = {

year:1,
day:1,

population:50,

food:500,
wood:200,
stone:100

};

const historyDiv =
document.getElementById("history");

function updateUI(){

document.getElementById("year")
.textContent = world.year;

document.getElementById("day")
.textContent = world.day;

document.getElementById("population")
.textContent = world.population;

document.getElementById("food")
.textContent = world.food;

document.getElementById("wood")
.textContent = world.wood;

document.getElementById("stone")
.textContent = world.stone;

}

function log(text){

const div =
document.createElement("div");

div.className = "log";

div.textContent = text;

historyDiv.prepend(div);

}

function nextDay(){

world.day++;

if(world.day > 365){

world.day = 1;
world.year++;

}

const foodGathered =
Math.floor(Math.random()*20)+10;

const woodGathered =
Math.floor(Math.random()*10)+5;

const stoneGathered =
Math.floor(Math.random()*8)+2;

world.food += foodGathered;
world.wood += woodGathered;
world.stone += stoneGathered;

world.food -= world.population;

if(world.food < 0){

world.population -= 2;

world.food = 0;

log(
"⚠️ Starvation! Population decreased."
);

}

if(Math.random() < 0.05){

world.population++;

log(
"👶 A child was born."
);

}

log(
`Day ${world.day}: Gathered ${foodGathered} food, ${woodGathered} wood, ${stoneGathered} stone.`
);

updateUI();

}

function createEvent(){

const input =
document.getElementById("eventInput");

const text =
input.value.trim();

if(text === "") return;

log("🌟 EVENT: " + text);

const lower =
text.toLowerCase();

if(lower.includes("dragon")){

world.population -= 5;

world.food -= 100;

log(
"🐉 Dragon attack! 5 citizens lost."
);

}

if(lower.includes("gold")){

world.stone += 100;

log(
"💰 Gold mine discovered."
);

}

if(lower.includes("meteor")){

world.population -= 10;

world.wood -= 50;

log(
"☄️ Meteor impact!"
);

}

if(world.population < 0)
world.population = 0;

if(world.food < 0)
world.food = 0;

if(world.wood < 0)
world.wood = 0;

updateUI();

input.value = "";

}

document
.getElementById("nextDayBtn")
.addEventListener(
"click",
nextDay
);

document
.getElementById("eventBtn")
.addEventListener(
"click",
createEvent
);

updateUI();

log(
"🌎 World created successfully."
);
