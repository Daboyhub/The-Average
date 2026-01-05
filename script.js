function calculateAverage() {
    const input = document.getElementById('pointsInput').value;
    
    // 1. Split the string by commas and convert to numbers
    const pointsArray = input.split(',')
                             .map(num => parseFloat(num.trim()))
                             .filter(num => !isNaN(num)); // Remove non-numbers

    if (pointsArray.length === 0) {
        alert("Please enter some valid numbers!");
        return;
    }

    // 2. Sum up all the points
    const sum = pointsArray.reduce((acc, current) => acc + current, 0);

    // 3. Calculate the average
    const average = sum / pointsArray.length;

    // 4. Update the screen
    document.getElementById('avgValue').innerText = average.toFixed(2);
    document.getElementById('totalValue').innerText = pointsArray.length;
}
