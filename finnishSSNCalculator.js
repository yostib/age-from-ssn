/**
 * Check correctness
 * 
 * collect user input
 * is it valid: validation 
 *  - What is wrong? day is wrong, month is wrong, something is not the correct value
 * calculation:
 *  - determine sex: F/M
 *  - determine age:
 *      - option for specific age, down to days
 * 
 */

const testPersonID = '131052-308T'

/**
 * 
 * @param {*} personID 
 */
function checkPersonalID()
{
    let userInput = readUserInput();
    //console.log('inside checkPersonalID: userInput', userInput);
    let validationResult = validateID( userInput );

    if( validationResult === true )
    {
        // TODO: get value for specific and pass it to calculateAge
        document.getElementById('age_information').innerHTML = calculateAge(userInput, true);
    } else {
        document.getElementById( 'validation_result' ).innerHTML = validationResult;
    }
}

/**
 * Fetches the user input.
 * 
 */
function readUserInput()
{
    let input = document.getElementById('person_id').value;
    return input
}

/**
 *
 */
function validateID( personId )
{
    //console.log('inside validateID:', personId );
    /**
     * So basically we do a check on the value of the variable given here as an argument.
     */
    /**
     * what should we return?
     * return true if it passes all of the validation 
     * return the reason for validation failure, as a string, when invalid
     */
    let result;
    // check if the numbers are correct length
    let idLength = personId.length;
    if( idLength == 11 ){
        //console.log('the length is ', idLength)
        result = true;
    } else {
        //console.log('length is less than 11');
        result = 'The length of the personal ID must be 11';
        return result;
    }

    // century identifiers are one of + - A
    // - find the character
    let centuryId = personId.substring(6,7);
    if( centuryId === '+' || centuryId === '-' || centuryId === 'A' || centuryId === 'a' )
    {
        result = true;
    } else {
        result = 'The century identifier must be one of +, - or A';
        return result;
    }

    // validate birth date is correct
    result = validateBirthday( personId );
    // TODO: validate the control character
    // % 31
    return result;

}

function validateBirthday( personId ){
    let century = personId.substring(6,7);
    let dd = Number( personId.substring(0,2) );
    let mm = Number( personId.substring(2,4) );
    let yy = Number( personId.substring(4,6) );
    let currentYear = new Date().getFullYear() - 2000;
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate()
    let result;
    //validate the year
    // if the birth century is the current century the birth date cannot be any later than today.
    if( ( century === 'A' || century === 'a' ) 
    && ( yy <= currentYear && mm <= currentMonth && dd <= currentDay ) )
    {
        result = true;
    }
    else
    {
        result = 'The birth date cannot be any later than today';
    }
    // There are no zero days and zero months, only years cab be 00.
    if(mm == 0 || dd == 0)
    {
        result = "The birth month and date can not be zero";
    }
    // check the date is correct. Is it a 31 day long month? is it 02.29?
    // Let's not check for leap year for now
    if( mm > 12)
    {
        result = "Moths can not be bigger than 12"
    }
    if( dd > 31)
    {
        result = "The dates can not be bigger than 31"
    }
    return result;
}

/**
 * 
 * @param {number} birthday 
 * @param {boolean} specific 
 * @returns 
 */
function calculateAge(personId, specific){
  
    let century = personId.substring(6,7);
    let dd = Number( personId.substring(0,2) );
    let mm = Number( personId.substring(2,4) );
    let yy = Number( personId.substring(4,6) );

    if( century === "-" )
    {
        yy = yy + 1900;
    }
    else if( century.toLowerCase() === "a" )
    {
        yy += 2000;
    }
    else if( century.toLowerCase() === "+" )
    {
        yy += 1800;
    }
    else
    {
        return "Age can not be determined";
    }
    let timeNow = new Date().getTime();
    let dob = new Date();
    dob.setDate(dd)
    dob.setMonth(mm)
    dob.setFullYear(yy)
    let timeDiff = timeNow - dob.getTime();
    let ageNow = new Date(timeDiff);

    let ageDate = ageNow.getDate();
    let ageMonth = ageNow.getMonth();

    let diffYear = ageNow.getFullYear() - 1970;
    let ageYear = Math.abs( diffYear );

    if( specific )
    {
        return "Age: " + ageYear + " years, " + ageMonth + " months, " + ageDate + " days old."
    }
    else{
        return "Age: " + ageYear + " years old.";
    }
}

/**
 * Even numbers represent a female and odd numbers represent male.
 * 
 * @param {Number} sexIdentifier 
 * @returns F M 
 */
function calculateSex( sexIdentifier ){
    let remainder;
    let sex;
    remainder = sexIdentifier % 2;
    if( sex === 0 ){
        sex = 'F'
    } else {
        sex = 'M'
    }
    return sex;
}
