function checkCashRegister(price, cash, cid) {
  
  //simply calculating the change needed based on provided price and cash
  let change = cash - price;
  
  //setting up an empty object that will ultimately be populated and returned
  let result = {
    status: "",
    change: []
  }
  
  //initialize the value that will store the total of the drawer
  let sumCID = 0;

  //iterate over the items in the provided array, cid, and then add the value of those to get the total of the money in the drawer
  for(let x of cid) {
    sumCID = sumCID + (x[1]);
  }
  

  //simple check to see if the total in the drawer is less than the changed needed, if so manually set the status of result to INSUFFICIENT_FUNDS, leave 'change' (the array in the result object) empty, then return the result object.
  if (sumCID.toFixed(2) < change) {
    result.status = "INSUFFICIENT_FUNDS";
    return result;
  }

  //if the total is exactly the same as the change needed, set the status to CLOSED, and the array change = to the provided cid, then return the whole object.
  if (sumCID.toFixed(2) == change) {
    result.status = "CLOSED";
    result.change = cid;
    return result;
  }

  //note the use of ".toFixed(2)" in the above, this is because of JavaScripts floating point values turing the nubmers into like 13.0399999999999997, originally I had simply times the number by 100, then when checking the values simply divided by 100, but later I used .toFixed(2) again, so I replaced it here to make it more consistent.


  //empty array with will ultimately store the provided change
  let newResult = [];

  cid = cid.reverse(); //reveresed the array to put the bigger numbers at the beginning (so when indexing it's [0] would be 100, and so on, as i'm going to increment to the end of the length of the array)

  //iterate through the provided cid array
  for(let i = 0; i < cid.length; i++) {

    //val will be used to track the amount of money each bill/coin will use (the total) and then be referenced when creating the array that actually dispays it, it is initialized her that way it is always reset to 0 when going 
    let val = 0;

    //while the value of cid at array position [i] (value is the second bracket) is greater than 0 AND change is greater or equal to the value assigned to the moneyConst array at position [i] ...
    while(cid[i][1] > 0 && change >= moneyConst[i].value) {

      //reduce the current money in drawer, using the bracket notation here we can reduce the specific amount by each iteration (so cid[0][1], the "hundred" bills (remember, it's reversed) - 100 (the value of "moneyConst[0].value"))
      cid[i][1] -= moneyConst[i].value;
      
      //change is then reducded by the same amount.
      change -= moneyConst[i].value

      //change is set to 2 decimal places in the event a floating point number occures
      change = change.toFixed(2);

      //value is added to itself, this will allow us to add the amount needed (like 3 twentys = 60)
      val += moneyConst[i].value
    }
  
    //if val is over 0, push an array of two items into the newResult array, item 1 is the name of the bill/coin, which comes from cid[i][0], and item 2 is the value (val) that was caculated previously.
    if(val > 0) {
      newResult.push([cid[i][0], val])
      }
  }

  //we were decreacing the change to get it equal to 0 (that way we could pay in exact change), but if even after the caculation it is above 0, that means we didn't have the right amount of bill/coins to pay it, thus we can simply check if change is (still) greater than 0, set result.status to INSUFFICIENT_FUNDS and return the result object.
  if(change > 0) {
    result.status = "INSUFFICIENT_FUNDS"
    return result;
  }

  //console.log(newResult); used for testing
  
  //if the program has gotten this far that means that none of the other return statements striggerd, in other words 1) we had enough money, 2 the money in the drawer was not exactly equal to the change needed, and 3 we had the correct amount of bills to make the change. Since that is the case, we can set the status to OPEN, and then the array object change is set equal to newResult, then returned.
  result.status = "OPEN"
  result.change = newResult
  return result;
}

//the array that will be used to do math when try to calculate how much money is needed for change
const moneyConst = [
  { name: "HUNDRED", value: 100.0 },
  { name: "TWENTY", value: 20.0 },
  { name: "TEN", value: 10.0 },
  { name: "FIVE", value: 5.0 },
  { name: "ONE", value: 1.0 },
  { name: "QUARTER", value: 0.25 },
  { name: "DIME", value: 0.10 },   
  { name: "NICKEL", value: 0.05 },
  { name: "PENNY", value: 0.01 }
]; 

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

/*

Thoughts: looking at the instructions it would seem there are four different returns necessary

1 when the provided cash in the drawer is less than the change due, return change as an empty array

2 when there is not a way to make exact change (even if there is more than enough 'total' cash in the drawer), return change as an empty array

3 when the cash in the drawer is exactly equal to the change due, return change set equal to the provided cid variable

4 when there is more cash in the drawer than change due, it will return a status of open, and a change amount of the MINIMUM number of bills/coins needed to make the change. so for example if the change is 1 dollar and 80 cents it would return an array that looks like [[dollar: 1], [quarter: 75], [nickle: 5]] (note, the number associated is not /how many/, its the total of those things (this can be confirmed by looking at the tests provided such as: checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.))

(for every case also return a 'status' of something, butit is provided in the instructions and can be hard coded as either INSUFFICIENT_FUNDS, CLOSED, or OPEN)

logic?:

first and easily calculate the change, price and cash are provided so this is as easy as simply cash - price

then we have to calculate how much change is in the given drawer for that call. this can be done by iterating over the element, then adding them together.

after that 1 and 3 above should be easy as it should just be checking if the drawer cash total is less than or equal to (1 is less than, 3 is equal to, sepcifically) and returning the object that has the information specified.

4 is the tricky one as it will involve needing to figure out a way to calculate the exact change needed. I think the easiest way to do this would be to start from the biggest bills/coins and go down, and will need a way to track how much money is left from the drawer. Maybe an object or array that holds the pairs of money assigned a value? like "hundred": 100, and "dime": .10 ? with a unchaging list it should be easy to reference it and then make adjustments to the cid value until it gets to change I think

for 2 once we have run the calculations we should be able to simple test if the change remaining is still more than 0, meaning we didn't have a way to actually reduce it to 0 (read: we didn't have the exact change), and then can just return the same as 1 above


*/