function palindrome(str) {
  
    let regEX = /[\W]|[_]/g; //created a regEx expression that matches and non-word character and an underscore, for all instances

    let cleanStr = str.replace(regEX, ""); //replaces any matches with no character
    
    //console.log(cleanStr); used for testing if the above worked

    
    let arr1 = []; //empty array that will hold the backwords provided string

    //for loop that iterates through cleanStr then adds the elements backwards to the array: arr1
    for (let i = 0; i < cleanStr.length; i++) { 
      arr1.unshift(cleanStr[i]);
    }

    //new string to join the characters from arr1 into a string.
    let rStr = arr1.join("");

    //console.log(rStr); used for testing to make sure the array was joined correctly
    //console.log(cleanStr); used for testing to immeidatly (next to each other) compare the strings

    //conditional logic to check if the two strings matched (after they are set to all lower case)
    if (rStr.toLowerCase() == cleanStr.toLowerCase()) {
      return true;
    } else {
      return false;
    }
    

}

palindrome("My age is 0, 0 si ega ym.");
palindrome("0_0 (: /-\ :) 0-0");
palindrome("not a palindrome");