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
    const updateButton = document.querySelector('.update'); // Bouton pour mettre à jour les totaux
    const addRowButton = document.getElementById('add-row'); // Bouton pour ajouter une ligne
    const resetRowButton = document.querySelector('.reset-row'); // Bouton pour supprimer la dernière ligne
    const tableBody = document.getElementById('table-body');

    // Fonction pour mettre à jour les totaux
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

    // Fonction pour ajouter une nouvelle ligne au tableau
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

    // Fonction pour supprimer la dernière ligne
    resetRowButton.addEventListener('click', function () {
        const rows = tableBody.querySelectorAll('tr');
        if (rows.length > 0) { // Vérifie s'il y a des lignes à supprimer
            rows[rows.length - 1].remove(); // Supprime la dernière ligne
        }
    });
});



/* ---------------------- /
#Nouveau numero facture
/ ---------------------- */
// Fonction pour générer automatiquement le numéro de facture
function generateInvoiceNumber() {
    const currentYear = new Date().getFullYear();
    let invoiceCounter = localStorage.getItem("invoiceCounter") || 1;

    // Format du numéro de facture : année-suivi d'un numéro à 3 chiffres
    const invoiceNumber = `${currentYear}-${String(invoiceCounter).padStart(3, '0')}`;

    // Afficher le numéro de facture dans le span
    document.getElementById("invoice-number").textContent = invoiceNumber;

    // Incrémenter et sauvegarder le compteur
    invoiceCounter++;
    localStorage.setItem("invoiceCounter", invoiceCounter);
}

// Fonction pour réinitialiser le numéro de facture
function resetInvoiceNumber() {
    localStorage.setItem("invoiceCounter", 1);
    displayCurrentInvoiceNumber();
}

// Fonction pour mettre à jour la date et l'heure actuelles
function updateDateAndTime() {
    const today = new Date();
    document.getElementById("date1").value = today.toISOString().split("T")[0];
    document.getElementById("date2").value = today.toISOString().split("T")[0];

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    document.getElementById("time").value = `${hours}:${minutes}`;
}

// Fonction pour afficher le numéro de facture actuel au chargement
function displayCurrentInvoiceNumber() {
    const currentYear = new Date().getFullYear();
    const invoiceCounter = localStorage.getItem("invoiceCounter") || 1;
    const invoiceNumber = `${currentYear}-${String(invoiceCounter).padStart(3, '0')}`;
    document.getElementById("invoice-number").textContent = invoiceNumber;
}

// Initialisation lors du chargement de la page
window.onload = function () {
    updateDateAndTime();
    displayCurrentInvoiceNumber();
    // Mettre à jour la date et l'heure toutes les minutes
    setInterval(updateDateAndTime, 60000);
};