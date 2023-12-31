let xp = 0;
let health = 100;
let gold = 50;
let camperbot="Bot";
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory =["stick"];

const button1 = document.getElementById("button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth"); 

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power:50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

// const locations=[]  --->> empty array
const locations=[
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],                              //access and use functions
        text: "You are in the town square. You see a sign that says \"Store\"."             //// \" ... \" 
    },          //Don't forget to seperate with commas every object
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth,buyWeapon,goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'    //If you want to add "" to specific area in string. Add single quates around the string, then add double quates around the string you want to add "...";
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
        name: "win",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
        name: "easter egg",
        "button text": ["2","8","Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];        //Objects are similar to arrays, but objects use properties, or keys, to access and modify data.

// initialize buttons

button1.onclick = goStore;              
button2.onclick = goCave;
button3.onclick = fightDragon;

//functions              // All function declarations are effectively at the top of the scope

function update(location) {             //When you have repetition in your code, this is a sign that you need another function.
    
    //at the beginning the codes below are in the goTown function, when we create objects, we shift these to here
    monsterStats.style.display = "none";

    button1.innerText = location["button text"][0];        //change text in the element
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];        //update(location) , use parameter to change button text automatically

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];      //bracket notation  
    
    text.innerText = location.text;                         //dot notation     
}

function goTown() {
    update(locations[0]);
}
function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}


function buyHealth() {
    if(gold>=10){
        gold -= 10;
        health += 10;
        goldText.innerText=gold;
        healthText.innerText=health;
    }
    else    text.innerText ="You do not have enough gold to buy health. Seller is staring at you."
    
}
function buyWeapon() {
    if(currentWeapon<(weapons.length-1)){
        if(gold>=30){
            gold-= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText= "You now have a "+newWeapon+".";
            text.innerText += /*use the += operator to add text to the end of the last text*/  " In your inventory you have: " + inventory;
            
        }
        else   text.innerText = "You do not have enough gold to buy weapon. The eye of the seller is on you.";
    }
    else{
      text.innerText = "You already have the most powerful weapon!";
      button2.innerText = "Sell your weapon for 15 gold" ;
      button2.onclick = sellWeapon; 
    }  
}

function sellWeapon() {
    if(inventory.length > 1){
        gold+=15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();         //The shift() method on an array removes the first element in the array and returns it. 
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText = " In your inventory you have: " + inventory;
    }
    else{
        text.innerText = "Don't sell your only weapon!!";
    }
}


function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting=2;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";           ////CSS UPDATE IN JS -->> Display the monsterStats element by updating the display property of the style property to block.
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    //health -= monsters[fighting].level; 
    health -= getMonsterAttackValue(monsters[fighting].level);      //This sets health equal to health minus the return value of the getMonsterAttackValue function, and passes the level of the monster as an argument.
    if(isMonsterHit()){
       monsterHealth -= (weapons[currentWeapon].power + (Math.floor(Math.random() * 5)+1));    //Generate a random number within a range. For example, this generates a random number between 1 and xp value;
    }else{
        text.innerText += " You miss."
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health<=0){
        lose();
    } 
    else if(monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster();         //--->>The strict equality operator(===) will check if the values are equal and if they are the same data type.
        //the ternary operator. This can be used as a one-line if-else expression. The syntax is: [ condition ? true : false; ]
    }

    if((Math.random() <= .1)&& (inventory.length !== 1)){        //chance that the player's weapon breaks. // !== not equal
        text.innerText += " Your " + inventory.pop() + " breaks.";          //.pop() function --> will remove the last item in the array AND return it so it appears in your string.
        currentWeapon--;
    }
}
function getMonsterAttackValue(level){
    const hit =(level*5)-(Math.floor(Math.random() * xp));      //This will set the monster's attack to five times their level minus a random number between 0 and the player's xp.
    //will prevent the monster from hitting the player the same amount each time.
    return hit > 0? hit: 0;  //Functions run specific blocks of code when they are called, but they can also return a value. This value can be assigned to a variable and used elsewhere in your code.

}
function isMonsterHit() {
    return (Math.random() > .2) || (health < 20);
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose(){
    update(locations[5]);
}
function winGame(){
    update(locations[6]);
}


function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg(){
    update(locations[7]);
}
function pick(guess){
    let numbers = [];
    while(numbers.length < 10){
        numbers.push(Math.floor(Math.random() * 11));       //add item to array with [ .push() ]   
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for(let i = 0; i<10 ; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if(numbers.indexOf(guess) !== -1){          //The indexOf() array method returns the "first index" at which a given element can be found in the array, or -1 if the element is not present.
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
        button1.innerText = "Go to the town square?";
        button2.innerText = "Go to the town square?";
        button1.onclick = goTown;
        button2.onclick = goTown;
    }
    else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if(health<=0) {
            lose();
        }
        else{
            button1.innerText = "Go to the town square?";
            button2.innerText = "Go to the town square?";
            button1.onclick = goTown;
            button2.onclick = goTown;
        }
            
        
    }
}
function pickTwo(){
    pick(2);
}
function pickEight() {
    pick(8);
}
