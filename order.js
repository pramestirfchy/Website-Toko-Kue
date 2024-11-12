document.addEventListener('DOMContentLoaded', function() {
    var orderForm = document.getElementById('orderForm');
    var submitButton = document.getElementById('submitOrder');

    submitButton.addEventListener('click', function() {
        if (orderForm.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var email = document.getElementById('email').value;
            var phone = document.getElementById('phone').value;
            var address = document.getElementById('address').value;
            var city = document.getElementById('city').value;
            var id = document.getElementById('id').value;

            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('email', email);
            localStorage.setItem('phone', phone);
            localStorage.setItem('address', address);
            localStorage.setItem('city', city);
            localStorage.setItem('id', id);

            var cupcakeType = document.getElementById('cupcakeType').value;
            var cupcakeTypeText = document.getElementById('cupcakeType').options[document.getElementById('cupcakeType').selectedIndex].text;
            var quantity = parseInt(document.getElementById('quantity').value);

            var totalPrice = calculateTotalPrice(cupcakeType, quantity);

            var cupcakeDetails = `${quantity} x ${cupcakeTypeText} - Rp ${totalPrice}`;

            localStorage.setItem('cupcakeDetails', cupcakeDetails);
            localStorage.setItem('totalPrice', totalPrice.toString());

            window.location.href = 'hasilorder.html';
        }

        orderForm.classList.add('was-validated');
    });

    var addCupcakeButton = document.getElementById('addCupcake');
    var cupcakeQuantities = document.getElementById('cupcakeQuantities');
    var cupcakeCounter = 1;

    addCupcakeButton.addEventListener('click', function() {
        var cupcakeType = document.getElementById('cupcakeType').value;
        var quantity = document.getElementById('quantity').value;

        if (cupcakeType !== "" && quantity > 0) {
            var cupcakeDiv = document.createElement('div');
            cupcakeDiv.classList.add('mb-2');
            cupcakeDiv.innerHTML = `
                <strong>Cupcake ${cupcakeCounter}:</strong> ${quantity} x ${cupcakeType}
            `;
            cupcakeQuantities.appendChild(cupcakeDiv);

            document.getElementById('cupcakeType').value = "";
            document.getElementById('quantity').value = "";
            document.getElementById('cupcakeType').classList.remove('is-invalid');
            document.getElementById('quantity').classList.remove('is-invalid');

            cupcakeCounter++;
        } else {
            if (cupcakeType === "") {
                document.getElementById('cupcakeType').classList.add('is-invalid');
            } else {
                document.getElementById('cupcakeType').classList.remove('is-invalid');
            }
            if (quantity <= 0) {
                document.getElementById('quantity').classList.add('is-invalid');
            } else {
                document.getElementById('quantity').classList.remove('is-invalid');
            }
        }
    });

    function calculateTotalPrice(cupcakeType, quantity) {
        var price = parseInt(document.getElementById('cupcakeType').options[document.getElementById('cupcakeType').selectedIndex].getAttribute('data-price'));
        return price * quantity;
    }
});
