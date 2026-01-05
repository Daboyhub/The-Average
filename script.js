let allPoints = []; // The "Master List"

const upload = document.getElementById('upload');
const status = document.getElementById('status');
const pointsList = document.getElementById('pointsList');

// --- 1. SCAN PHOTO LOGIC ---
upload.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
        status.innerText = `Reading ${file.name}...`;
        const worker = await Tesseract.createWorker('eng');
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();

        const foundNumbers = text.match(/\d+(\.\d+)?/g);
        if (foundNumbers) {
            foundNumbers.forEach(num => allPoints.push(Number(num)));
            updateUI();
        }
    }
    status.innerText = "Scan complete!";
});

// --- 2. MANUAL ADD LOGIC ---
function addManualNumber() {
    const input = document.getElementById('manualNumber');
    const val = parseFloat(input.value);
    
    if (!isNaN(val)) {
        allPoints.push(val);
        input.value = ''; // Clear input
        updateUI();
        status.innerText = "Number added manually.";
    }
}

// --- 3. RECALCULATE & DISPLAY ---
function updateUI() {
    // Calculate Average
    const sum = allPoints.reduce((a, b) => a + b, 0);
    const avg = allPoints.length > 0 ? (sum / allPoints.length).toFixed(2) : 0;

    // Update Dashboard
    document.getElementById('avgDisplay').innerText = avg;
    document.getElementById('countDisplay').innerText = allPoints.length;

    // Show list of all numbers
    pointsList.innerHTML = allPoints.map(p => `<span class="point-tag">${p}</span>`).join('');
}

function clearAll() {
    allPoints = [];
    updateUI();
    status.innerText = "Cleared.";
}
