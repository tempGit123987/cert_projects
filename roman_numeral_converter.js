function convertToRoman(num) {

 let arr1 = []; // array used to store the broken down string-ified var "num"
 let rebuildArr = []; //the array used to rebuild the num into roman numerals

 let string = num.toString(); //make the provided num a string

 // console.log(string); used for testing if the number is a string

  //this for loop will iterate through the string, and push each individual number to
  //arr1, for example 105 will become ['1','0','5']
  for (let i = 0; i < string.length; i++)
  {
    arr1.push(string[i]);
  }

  //console.log(arr1); test to confirm it worked

  //four empty strings that will be replaced with the corrosponding roman numal
  let val1 = '';
  let val2 = '';
  let val3 = '';
  let val4 = '';


  /*
  These four switch statements all have the same functionailty.
  basically it is testing each individual part of the array (and thus each individual number of the original number)
  then it will assign the correct roman numeral for that number.
  to make it work this way I made the assumption that it will never be a number larget than 4 digits.
  then I start at the end and work backwards, for example:
  arr1[arr1.length-1], this is the last index of arr1, which is then passed into "parseInt()" to make it a number.
  this allows me to get the actual number, and then it's just a normal switch case which will then assign "val1" a roman numal
  this works the same for all 4 digit placements, the only difference is the number within the switch statement for the correct index of arr1, and for the 1000s digit, it only goes up to 3. if there is not a digit or if the digit is "0" the corrosponding "val" number will be set to ''
  */
  switch (parseInt(arr1[arr1.length-1])) {
    case 1:
      val1 = "I";
      break;
    case 2:
      val1 = "II";
      break;
    case 3:
      val1 = "III";
      break;
    case 4:
      val1 = "IV";
      break;
    case 5:
      val1 = "V";
      break;
    case 6:
      val1 = "VI";
      break;
    case 7:
      val1 = "VII";
      break;
    case 8:
      val1 = "VIII";
      break;
    case 9:
      val1 = "IX";
      break;
    default:
      val1 = "";
      break;
  }
   switch (parseInt(arr1[arr1.length-2])) {
    case 1:
      val2 = "X";
      break;
    case 2:
      val2 = "XX";
      break;
    case 3:
      val2 = "XXX";
      break;
    case 4:
      val2 = "XL";
      break;
    case 5:
      val2 = "L";
      break;
    case 6:
      val2 = "LX";
      break;
    case 7:
      val2 = "LXX";
      break;
    case 8:
      val2 = "LXXX";
      break;
    case 9:
      val2 = "XC";
      break;
    default:
      val2 = "";
      break;
  }

  switch (parseInt(arr1[arr1.length-3])) {
    case 1:
      val3 = "C";
      break;
    case 2:
      val3 = "CC";
      break;
    case 3:
      val3 = "CCC";
      break;
    case 4:
      val3 = "CD";
      break;
    case 5:
      val3 = "D";
      break;
    case 6:
      val3 = "DC";
      break;
    case 7:
      val3 = "DCC";
      break;
    case 8:
      val3 = "DCCC";
      break;
    case 9:
      val3 = "CM";
      break;
    default:
      val3 = "";
      break;
  }

  switch (parseInt(arr1[arr1.length-4])) {
    case 1:
      val4 = "M";
      break;
    case 2:
      val4 = "MM";
      break;
    case 3:
      val4 = "MMM";
      break;
    default:
      val4 = "";
      break;
  }

  //I used unshift here to push the information into the beginning of the array, instead of needing to flip 
  //them with a for loop
  rebuildArr.unshift(val1);
  rebuildArr.unshift(val2);
  rebuildArr.unshift(val3);
  rebuildArr.unshift(val4);

  //console.log(rebuildArr); test to see if it was rebuilt

  //rebuildArr was still a set of roman numerals instead of one long string, so use .join('') to fix that
  let complete = rebuildArr.join('');

  //console.log(complete); test to make sure it rebuilt the string correctly, it did

  return complete; 
}
 
convertToRoman(3999); 


/*

An extra note about this: while it does meat the requirement for converting numbers to roman numerals, it only goes up to 3999
I didn't know what roman numeral came after that (this could be fixed with a google search, obviously), but in it's current state this program is unoptomized. There are three nearly identical switch statements, and fourth one that is the same but shorter. A loop could be utalized to reduce the amount of hard coding, but the project outline didn't mention that.
*/