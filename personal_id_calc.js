/**
 * Reads user input.
 */
function readUserInput() {

    let userInput = document.getElementById("person_id").value;
    //userInput = "131052-308T";
    console.log('userInput', userInput);
    let arr_per_id = splitData(userInput);
    console.log('arrPerId', arr_per_id );
    result(arr_per_id);
}

/**
 * split the data entered by the user returns array and [DD,MM,YY,C,NNN,T]
 * 
 * @param {*} user_input 
 * @returns 
 */
function splitData( data ) {

    // set variable values from the array input split

    let dd = String(data).substr(0, 2);
    let mm = String(data).substr(2, 2);
    let yy = String(data).substr(4, 2);
    let code = String(data).substr(6, 1);
    let identifier = String(data).substr(7, 3);
    let check = String(data).substr(10, 1);

    //define the array for the split and return the value

    let personalIdArray = [dd, mm, yy, code, identifier, check];
    return personalIdArray;

}

/**
 * 
 * @param {*} arr_per_id 
 * @returns 
 */
function checkPersonalId(arr_per_id){

    let comp_identity ="0123456789ABCDEFHJKLMNPRSTUVWXY";

    let numbers = arr_per_id[0] + arr_per_id[1] + arr_per_id[2] + arr_per_id[4];

    let cal_index = Number(numbers) % 31;

    if (comp_identity[cal_index] == arr_per_id[5])
     return true;
     else
     return false;
}

/**
 * 
 * @param {*} data 
 */
function result(data){
    if(checkPersonalId(data))
        alert("Personal ID is OK" );
    else
        alert("Invalid data");

}


/**
 * Check correctness
 * 
 * is it valid: validation 
 *  - What is wrong? day is wrong, month is wrong, something is not the correct value
 * calculation:
 *  - determine sex: F/M
 *  - determine age:
 *      - option for specific age, down to days
 * 
 * 
 */