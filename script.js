const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

// Call updateBigCup function to initialize the big cup
updateBigCup();

// Loop through each small cup and add a click event listener to it
smallCups.forEach((cup, index) => {
    cup.addEventListener('click', () => highlightCups(index));
});

// Function to highlight the selected small cups and update the big cup
function highlightCups(index) {
    // Check if the selected cup is the 8th and is already full
    if (index === 7 && smallCups[index].classList.contains("full")) {
        // Decrement index to select the 7th cup
        index--;
    } 
    // Check if the selected cup is full and its next cup is not full
    else if (smallCups[index].classList.contains('full') && !smallCups[index].nextElementSibling.classList.contains('full')) {
        // Decrement index to select the previous cup
        index--;
    }

    // Loop through each small cup and highlight or un-highlight it based on its index
    smallCups.forEach((cup, index2) => {
        if (index2 <= index) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });

    // Call updateBigCup to update the big cup
    updateBigCup();
}

// Function to update the big cup based on the selected small cups
function updateBigCup() {
    // Get the number of full small cups
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    // Get the total number of small cups
    const totalCups = smallCups.length;

    // Check if all small cups are empty
    if (fullCups === 0) {
        // Hide the percentage display
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        // Show the percentage display
        percentage.style.visibility = 'visible';
        // Update the height of the percentage display based on the number of full small cups
        percentage.style.height = `${fullCups / totalCups * 330}px`;
        // Update the text of the percentage display
        percentage.innerText = `${fullCups / totalCups * 100}%`;
    }

    // Check if all small cups are full
    if (fullCups === totalCups) {
        // Hide the remained display
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        // Show the remained display
        remained.style.visibility = 'visible';
        // Update the text of the remained display
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`;
    }
}
