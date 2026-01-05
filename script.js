const upload = document.getElementById('upload');
const status = document.getElementById('status');
const results = document.getElementById('results');

upload.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    results.innerHTML = ''; // Clear old results

    for (const file of files) {
        status.innerText = `Scanning ${file.name}...`;
        
        // 1. Recognize text in the image
        const worker = await Tesseract.createWorker('eng');
        const { data: { text } } = await worker.recognize(file);
        await worker.terminate();

        // 2. Extract numbers using Regex
        const numbers = text.match(/\d+(\.\d+)?/g);

        if (numbers) {
            const points = numbers.map(Number);
            const sum = points.reduce((a, b) => a + b, 0);
            const average = (sum / points.length).toFixed(2);

            // 3. Display the math result
            const div = document.createElement('div');
            div.className = 'result-card';
            div.innerHTML = `
                <strong>${file.name}</strong><br>
                Found: ${points.join(', ')}<br>
                <strong>Average: ${average}</strong>
            `;
            results.appendChild(div);
        } else {
            status.innerText = "No numbers found in " + file.name;
        }
    }
    status.innerText = "Scanning complete.";
});
