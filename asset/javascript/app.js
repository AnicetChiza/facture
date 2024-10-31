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
        document.querySelectorAll('tr').forEach((row, index) => {
            const quantityInput = row.querySelector('.input-quantity');
            const priceInput = row.querySelector('.input-price');
            const totalInput = row.querySelector('.input-total');

            // Check if all necessary inputs are present
            if (quantityInput && priceInput && totalInput) {
                const quantity = parseFloat(quantityInput.value) || 0;
                const price = parseFloat(priceInput.value) || 0;

                // Calculate total and update the input-total field
                totalInput.value = quantity * price;
            } else {
                // Log specific missing input for easier debugging
                if (!quantityInput) console.warn(`Row ${index + 1}: Missing quantity input`);
                if (!priceInput) console.warn(`Row ${index + 1}: Missing price input`);
                if (!totalInput) console.warn(`Row ${index + 1}: Missing total input`);
            }
        });
        console.log('Facture mise à jour');
    });
});