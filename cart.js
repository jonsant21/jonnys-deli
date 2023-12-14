let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));

            const cartItem = cart.find(item => item.name === itemName);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(elem => elem.textContent = totalItems);

        // Save the updated cart to sessionStorage
        sessionStorage.setItem('cart', JSON.stringify(cart));

        renderCartItems();
    }

    function renderCartItems() {
        if (document.querySelector('#cart-table')) {
            const cartTableBody = document.querySelector('#cart-table tbody');
            cartTableBody.innerHTML = '';

            cart.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${(item.quantity * item.price).toFixed(2)}</td>
                    <td><button class="remove-item" data-index="${index}">Remove</button></td>
                `;
                cartTableBody.appendChild(row);
            });

            updateTotalPrice();
        }
    }

    function updateTotalPrice() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalElement = document.querySelector('#cart-total span');
        if (totalElement) {
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });

    renderCartItems();
});
