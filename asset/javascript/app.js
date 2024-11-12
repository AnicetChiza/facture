/* ----------------- /
#Print button
/ ----------------- */
document.querySelector('.print-btn').addEventListener('click', function () {
    window.print();
});

/* ----------------- /
#Calculation
/ ----------------- */
document.addEventListener('DOMContentLoaded', function () {
    const updateButton = document.querySelector('.update'); 
    const addRowButton = document.getElementById('add-row');
    const resetRowButton = document.querySelector('.reset-row');
    const tableBody = document.getElementById('table-body');

    if (updateButton) {
        updateButton.addEventListener('click', function () {
            let totalHT = 0;
            let totalTTC = 0;
            let totalTVA = 0;

            document.querySelectorAll('tr').forEach((row) => {
                const quantityInput = row.querySelector('.input-quantity');
                const priceInput = row.querySelector('.input-price');
                const totalInput = row.querySelector('.input-total');
                const tvaInput = row.querySelector('.input-tva');
                const tvaRate = 0.18;

                if (quantityInput && priceInput && totalInput && tvaInput) {
                    const quantity = parseFloat(quantityInput.value) || 0;
                    const price = parseFloat(priceInput.value) || 0;

                    const totalWithoutVAT = price * quantity;
                    const tva = totalWithoutVAT * tvaRate;
                    const totalWithVAT = totalWithoutVAT + tva;

                    totalInput.value = totalWithVAT.toFixed(2);
                    tvaInput.value = tva.toFixed(2);

                    totalHT += totalWithoutVAT;
                    totalTVA += tva;
                    totalTTC += totalWithVAT;
                }
            });

            const totalHTSpan = document.querySelector('.unit-price-span');
            const totalTVASpan = document.querySelector('.final-tva-span');
            const totalTTSpan = document.querySelector('.final-total-span');

            if (totalHTSpan && totalTTSpan && totalTVASpan) {
                totalHTSpan.innerHTML = totalHT.toFixed(2) + '$';
                totalTVASpan.innerHTML = totalTVA.toFixed(2) + '$';
                totalTTSpan.innerHTML = totalTTC.toFixed(2) + '$';
            }
        });
    }

    addRowButton.addEventListener('click', function () {
        const newRow = document.createElement('tr');
        const rowCount = tableBody.querySelectorAll('tr').length + 1;

        newRow.innerHTML = `
            <td style="text-align: center;">${String(rowCount).padStart(2, '0')}</td>
            <td><input type="text"></td>
            <td><input type="number" class="input-quantity"></td>
            <td><input type="number" class="input-price"></td>
            <td><input type="text" class="input-tva" value="18%"></td>
            <td><input type="number" class="input-total" readonly></td>
        `;

        tableBody.appendChild(newRow);
    });

    resetRowButton.addEventListener('click', function () {
        const rows = tableBody.querySelectorAll('tr');
        if (rows.length > 0) { 
            rows[rows.length - 1].remove();
        }
    });
});



/* ---------------------- /
#Nouveau numero facture
/ ---------------------- */
function generateInvoiceNumber() {
    const currentYear = new Date().getFullYear();
    let invoiceCounter = localStorage.getItem("invoiceCounter") || 1;

    const invoiceNumber = `${currentYear}-${String(invoiceCounter).padStart(3, '0')}`;

    document.getElementById("invoice-number").textContent = invoiceNumber;

    invoiceCounter++;
    localStorage.setItem("invoiceCounter", invoiceCounter);
}

function resetInvoiceNumber() {
    localStorage.setItem("invoiceCounter", 1);
    displayCurrentInvoiceNumber();
}

function updateDateAndTime() {
    const today = new Date();
    document.getElementById("date1").value = today.toISOString().split("T")[0];
    document.getElementById("date2").value = today.toISOString().split("T")[0];

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    document.getElementById("time").value = `${hours}:${minutes}`;
}

function displayCurrentInvoiceNumber() {
    const currentYear = new Date().getFullYear();
    const invoiceCounter = localStorage.getItem("invoiceCounter") || 1;
    const invoiceNumber = `${currentYear}-${String(invoiceCounter).padStart(3, '0')}`;
    document.getElementById("invoice-number").textContent = invoiceNumber;
}

window.onload = function () {
    updateDateAndTime();
    displayCurrentInvoiceNumber();
    setInterval(updateDateAndTime, 60000);
};