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

    updateButton.addEventListener('click', function () {
        let totalHT = 0;
        let totalTTC = 0;
        let totalTVA = 0;

        document.querySelectorAll('tr').forEach((row, index) => {
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
            } else {
                if (!quantityInput) console.warn(`Row ${index + 1}: Missing quantity input`);
                if (!priceInput) console.warn(`Row ${index + 1}: Missing price input`);
                if (!totalInput) console.warn(`Row ${index + 1}: Missing total input`);
                if (!tvaInput) console.warn(`Row ${index + 1}: Missing TVA input`);
            }
        });

        const totalHTSpan = document.querySelector('.unit-price-span');
        const totalTVASpan = document.querySelector('.final-tva-span');
        const totalTTSpan = document.querySelector('.final-total-span');

        if (totalHTSpan && totalTTSpan && totalTVASpan) {
            totalHTSpan.innerHTML = totalHT.toFixed(2) + '$';
            totalTVASpan.innerHTML = totalTVA.toFixed(2) + '$';
            totalTTSpan.innerHTML = totalTTC.toFixed(2) + '$';
        } else {
            console.error('Les éléments de total HT, TVA ou TTC ne sont pas trouvés');
        }
        console.log('Facture mise à jour');
    });
});