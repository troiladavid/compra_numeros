const numberGrid = document.getElementById('numberGrid');
const selectedNumbers = new Set();

// Create the number grid
for (let i = 1; i <= 2000; i++) {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.textContent = i;
    numberElement.addEventListener('click', () => {
        numberElement.classList.toggle('selected');
        if (selectedNumbers.has(i)) {
            selectedNumbers.delete(i);
        } else {
            selectedNumbers.add(i);
        }
    });
    numberGrid.appendChild(numberElement);
}

// Submit button logic
document.getElementById('submitBtn').addEventListener('click', () => {
    const numbers = Array.from(selectedNumbers);
    fetch('https://compra-numeros-back.onrender.com/submit', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedNumbers: numbers }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});
