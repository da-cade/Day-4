

// TODO Part One
//format page [x]
//format data [x]
//give them health [x]
//add marquee classes as unique animations (health bars, pointer actions)
//on-click activies - reduces boss's health by 5 -value should stop at 0 [x]
  //modify pointer [x]
  //modify selectability of fields [x]

// TODO Part Two
// Boss fights back. Hits on an Interval at 3 seconds - damage reduces hero's health by 5 [x]
// NOTE STRETCH -- It can be fun to give the boss a bit of variable damage: either use a random number between two values [x]
  //or for better use in a later step, add an attack property to the boss object. [x]

//TODO Part Three
// Once our boss is defeated, instead of letting them die and locking their health at 0, we want to have the boss "level up". 
  // instead double all the values of the boss (health, and if you did attack value)
//NOTE Stretch -- add some fun text, alerts, or indications that show how many monsters have been defeated / what level the monster is on

//TODO Part Four
// Add a value to the monster to represent the 'gold' reward for slaying the monster. 
  //Value should be stored and displayed.

//TODO Part Five
//After a few rounds the hero will lose every time. Add a sort of 'health pack' that the hero can buy with gold
  // this health pack will need to have a specific cost, that the hero can only buy if they have the gold to spend.

//TODO Stretch -- create a companion animal that does additional damage every time the hero attacks. Use a dictionary.
  //Add a button to the page that will allow the user to purchase this companion when they have enough gold. Flips bool val to purchased
  //Next, write a conditional to check if the wolf has been purchased to reduce the extra damage from the boss when the hero attacks.
  //Once you get this working try adding multiple companions to the list for the hero to purchase, mixing up the cost and the damage.


const heroStart = {
  name: "Scooby",
  id: "scooby",
  health: 100,
  damage: 7
}
const villainStart = {
  name: "Miner 49er",
  id: "miner",
  health: 100,
  damage: 5
}

let workingVillain = JSON.parse(JSON.stringify(villainStart))
let workingHero = JSON.parse(JSON.stringify(heroStart))
let timerId

function attack(attacker, defender) {
  let elem = document.getElementById(defender.id+'-health')
  let progressBar = elem.querySelector(".progress-bar")
  defender.health -= calculateDamage(attacker)
  console.log(defender.health)
  if (defender.health <= 0) {
    defender.health = 0
    console.log(defender)
    console.log(defeated(defender))
    defeated(defender)
  }
  progressBar.style.width = defender.health + '%'
}

function calculateDamage(attacker) {
  return Math.floor(Math.random()*(2 * attacker.damage + 1))
}

function defeated(loser) {
  if (loser === workingVillain){
    console.log(loser, workingVillain)
    resetGame()
    levelUp()
  }
  if (loser === workingHero){
    console.log("Hero Defeated")
    resetGame()
  }
}

function levelUp(){
  console.log("leveled up")
  workingVillain.health *= 2
  workingVillain.damage *= 2
  workingVillain.name += 2
}

function startGame() {
  timerId = setInterval(attack, 3000, workingVillain, workingHero);
}

function resetGame() {
  workingVillain = JSON.parse(JSON.stringify(villainStart))
  workingHero = JSON.parse(JSON.stringify(heroStart))
  console.log('Resetting game')
  clearInterval(timerId)
  let minerElem = document.getElementById(workingVillain.id+'-health')
  let heroElem = document.getElementById(workingHero.id+'-health')
  let minerProgressBar = minerElem.querySelector(".progress-bar")
  let heroProgressBar = heroElem.querySelector(".progress-bar")
  console.log(minerProgressBar)
  console.log(heroProgressBar)
  minerProgressBar.style.width = workingVillain.health + '%'
  heroProgressBar.style.width = workingHero.health + '%'
  console.log('reset', minerProgressBar)
  console.log('reset', heroProgressBar)
}