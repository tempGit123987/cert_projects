function telephoneCheck(str) {

  /*
  admittedly I dont' like regex, so I used regex101 to help build it
  here's a run down of how it works
  
  ^(1\s?)?
  this says at the beginning of the provided str (when we test) check to see if there is either the literal "1" followed by any white space character zero or one times, then the final ? is checking if there is anything there at all (its either empty, or there is a 1 and a white space character)

  (\d{3}|\(\d{3}\))
  checking for specifically 3 digets OR it checks for "(" followed by 3 digets followed by a closing ")"

  [\s\-]?
  checking for any whitespace character or a "-" repeated zero or one times
  
  \d{3}
  checking for 3 digets
  
  [\s\-]?
  same as above

  \d{4}$
  checking specifically for 4 digets at the end of the string
  */
  const regEx = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/


  if (regEx.test(str) == true) {
    return true;
  } else {
    return false;
  }
  
}

telephoneCheck("555-555-5555");

/*

Idea: Take the string and sanitize it with regex to remove anything that is not a digit, this would result in just a string of numbers and we are looking for either a 10 digit number, or an 11 digit nubmer with the first one being "1".
The problem is this:
telephoneCheck("1 555)555-5555") should return false.
sanatizing it would remove the space, end parenthesis, and hypen, thus resulting in an 11 digit number that starts with 1. So this idea wont work.

Idea 2: write regex that would allow for all all combinations to work, then check them and return true or false depending on the outcome.
*/