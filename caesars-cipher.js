function rot13(str) {

  //Perhaps a better way to handle this is to write a loop that, if the number exceeds z, loop back to a, but
  //I just made a string of the characters that loops 13 letters after Z, which should encompass all possiblities
  let cipherBet = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM"

  //the array that will store our shifted characters
  let arr1 = [];

  //for loop that iterates through the provided encrypted string
  for (let i = 0; i < str.length; i++) {
    
    //if the character provided is NOT a character (a-z or A-Z specifically), then push it into the array.
    //this is used in this cose for puncutation and spaces
    if ( (/[a-zA-z]/).test(str[i]) == false) {
      arr1.push(str[i]);
    } 

    //for loop that iterates through the cipherBet variable, then checks if the value of that postion is equal to the value of the character at the position
    //for the provided encrypted string (checking if the letters match). If so the array is pushed the value of the current position + 13 (it shifts the value 
    //to the correct position of the cipherbet variable)
    for (let j = 0; j < cipherBet.length; j++) {
      if (cipherBet[j] == str[i]) {
        arr1.push(cipherBet[j + 13])
      }
    }
  }

  //see note section for more information on why this exists
  //filtering out undefined items in the arr, and assigning it to a new array: filteredArr
  let filteredArr = arr1.filter( function(item){return item != undefined} );


  //rejoin the characters into a single string, then return it.
  return filteredArr.join('');
}

rot13("SERR PBQR PNZC");

/*

A note: There is a logic error in this code that occures in the nested for loop where an extra item is added to the array of type undefined
(for example the array might return: ['F','R',undefined,'E','E'...])
The best solution would be to address this bug and fix the for loop, but instead I opted to just use .filter and remove anything that is undefined.

*/