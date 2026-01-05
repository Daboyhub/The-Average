const upload = document.getElementById('upload');
const results = document.getElementById('results');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', (e) => {
    results.innerHTML = ''; // Clear previous results
    const files = Array.from(e.target.files);

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const avgColor = getAverageColor(img);
                displayResult(file.name, avgColor);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
});

function getAverageColor(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Get pixel data: [r, g, b, a, r, g, b, a...]
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let r = 0, g = 0, b = 0;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    const count = data.length / 4;
    return {
        r: Math.floor(r / count),
        g: Math.floor(g / count),
        b: Math.floor(b / count)
    };
}

function displayResult(name, color) {
    const rgb = `rgb(${color.r}, ${color.g}, ${color.b})`;
    const div = document.createElement('div');
    div.className = 'result-card';
    div.innerHTML = `
        <span><strong>${name}</strong>: ${rgb}</span>
        <div class="swatch" style="background: ${rgb}"></div>
    `;
    results.appendChild(div);
}
