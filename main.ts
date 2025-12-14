/**
 * @author Nicholas Sun
 * @version 1.0.0
 * @date 2025-12-14
 * @fileoverview This program keeps track of car stats.
 */

let odometer: number = 65000.0;
const oilChangeKM: number = 65000.0;
const carMake: string = "Nissan";
const carModel: string = "Altima";
let carColor: string = "Red";
const initialFillUpCost: number = 75.0;

let newMileage: number = 0.0;
let fillUpCount: number = 1;
const gasCost: number[] = new Array(10);

gasCost[0] = initialFillUpCost;

function oilChange(mileage: number, oilChangeKM: number): boolean {
  const requiredOilChangeInterval: number = 5000;
  const kmSinceLastChange: number = mileage - oilChangeKM;

  if (kmSinceLastChange >= requiredOilChangeInterval) {
    console.log(`An oil change was done at ${mileage.toFixed(1)} km.`);
    oilChangeKM = mileage;
    return true;
  } else {
    return false;
  }
}

function carStats(): string {
  return `
Car Stats
--------------------------------
Make/Model:    ${carMake} ${carModel}
Color:         ${carColor}
Odometer:      ${odometer.toFixed(1)} km
Last Oil Change: ${oilChangeKM.toFixed(1)} km
KM Since Last Change: ${(odometer - oilChangeKM).toFixed(1)} km
Last Drive:    ${newMileage.toFixed(1)} km
Total Fill-ups: ${fillUpCount}
--------------------------------
`;
}

function wrapCar(): string {
  const newColor: string = prompt("Enter the new color for your car wrap:") ||
    "Unknown";
  return newColor;
}

function drive(): number {
  const minDrive: number = 100;
  const maxDrive: number = 1000;

  // Generate a random number between minDrive and maxDrive (inclusive)
  const randomDistance = Math.floor(Math.random() * (maxDrive - minDrive + 1)) +
    minDrive;

  odometer += randomDistance;

  return randomDistance;
}

function fillUp(): void {
  let cost: number = 0;
  let input: string;

  do {
    input = prompt(
      `Enter the cost to fill up your car (Fill-up #${fillUpCount + 1}).`,
    ) || "0";

    cost = parseFloat(input);

    if (cost <= 0) {
      console.log(
        "Invalid input. Please enter a positive number for the cost.",
      );
      cost = 0; // Setting the cost to 0 keeps the loop running.
    }
  } while (cost == 0);

  gasCost[fillUpCount] = cost;
  fillUpCount++;
  console.log(`\nNew fill-up cost of $${cost.toFixed(2)} recorded.`);
}

function displayCostToFillUp(): number {
  console.log("\nGas Fill-up Costs");
  console.log("----------------------------");

  let totalCost: number = 0;
  let fillUps: number = 0;

  for (let i = 0; i < fillUpCount; i++) {
    const cost = gasCost[i];
    if (cost > 0) {
      console.log(`Fill-up #${i + 1}: $${cost.toFixed(2)}`);
      totalCost += cost;
      fillUps++;
    }
  }

  let averageCost: number = 0;
  if (fillUps > 0) {
    averageCost = totalCost / fillUps;
  }

  console.log("----------------------------");
  console.log(`Total Fill-ups: ${fillUps}`);
  console.log(`Total Cost: $${totalCost.toFixed(2)}`);
  console.log(`Average Cost: $${averageCost.toFixed(2)}`);
  console.log("----------------------------");

  return averageCost;
}

console.log("Welcome to the Car Stats Program!");
console.log(carStats());

console.log("Attempting to wrap the car...");
carColor = wrapCar();
console.log(`Car color updated to: ${carColor}`);
console.log(carStats());

newMileage = drive();
console.log(`You drove ${newMileage.toFixed(1)} km.`);
console.log(carStats());

fillUp();

const needsOilChange: boolean = oilChange(odometer, oilChangeKM);
if (!needsOilChange) {
  console.log("Your car does not need an oil change.");
}

console.log(carStats());

const averageFillUpCost: number = displayCostToFillUp();
console.log(
  `Average cost to fill up your car: $${
    averageFillUpCost.toFixed(2)
  }`,
);

console.log("\nDone.");
