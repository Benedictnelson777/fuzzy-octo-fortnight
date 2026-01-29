// Product Catalog
const products = [
    // Beer
    {
        id: 1,
        name: "Craft IPA",
        category: "beer",
        price: 12.99,
        icon: "🍺",
        description: "Hoppy and refreshing craft IPA with citrus notes"
    },
    {
        id: 2,
        name: "Premium Lager",
        category: "beer",
        price: 9.99,
        icon: "🍺",
        description: "Smooth and crisp premium lager"
    },
    {
        id: 3,
        name: "Wheat Beer",
        category: "beer",
        price: 11.99,
        icon: "🍺",
        description: "Light and cloudy wheat beer with subtle spice"
    },
    // Wine
    {
        id: 4,
        name: "Red Wine",
        category: "wine",
        price: 24.99,
        icon: "🍷",
        description: "Full-bodied red wine with rich berry flavors"
    },
    {
        id: 5,
        name: "White Wine",
        category: "wine",
        price: 22.99,
        icon: "🍷",
        description: "Crisp and refreshing white wine"
    },
    {
        id: 6,
        name: "Rosé Wine",
        category: "wine",
        price: 19.99,
        icon: "🍷",
        description: "Elegant rosé with delicate fruit notes"
    },
    // Spirits
    {
        id: 7,
        name: "Premium Vodka",
        category: "spirits",
        price: 34.99,
        icon: "🥃",
        description: "Ultra-smooth premium vodka"
    },
    {
        id: 8,
        name: "Aged Whiskey",
        category: "spirits",
        price: 49.99,
        icon: "🥃",
        description: "Rich and complex aged whiskey"
    },
    {
        id: 9,
        name: "Silver Tequila",
        category: "spirits",
        price: 39.99,
        icon: "🥃",
        description: "Smooth silver tequila perfect for cocktails"
    },
    {
        id: 10,
        name: "London Dry Gin",
        category: "spirits",
        price: 32.99,
        icon: "🥃",
        description: "Classic gin with juniper and botanical notes"
    },
    // Ready-to-Drink Cocktails
    {
        id: 11,
        name: "Margarita Mix",
        category: "cocktails",
        price: 15.99,
        icon: "🍹",
        description: "Pre-mixed margarita, just add ice"
    },
    {
        id: 12,
        name: "Mojito Can",
        category: "cocktails",
        price: 14.99,
        icon: "🍹",
        description: "Refreshing mojito in a convenient can"
    },
    {
        id: 13,
        name: "Cosmopolitan RTD",
        category: "cocktails",
        price: 16.99,
        icon: "🍹",
        description: "Classic cosmopolitan ready-to-drink"
    },
    {
        id: 14,
        name: "Hard Seltzer Pack",
        category: "cocktails",
        price: 18.99,
        icon: "🍹",
        description: "Variety pack of flavored hard seltzers"
    }
];

// Shopping cart
let cart = [];

// Age verification
function checkAge() {
    const ageVerified = sessionStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
        showMainContent();
    } else {
        showAgeVerification();
    }
}

function showAgeVerification() {
    document.getElementById('ageVerification').style.display = 'flex';
    document.getElementById('mainContent').classList.add('hidden');
}

function showMainContent() {
    document.getElementById('ageVerification').style.display = 'none';
    document.getElementById('mainContent').classList.remove('hidden');
}

// Age verification form handler
document.getElementById('ageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const birthdate = new Date(document.getElementById('birthdate').value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    // Check if user is at least 21 years old
    const isOldEnough = age > 21 || (age === 21 && monthDiff >= 0) || 
                        (age === 21 && monthDiff === 0 && today.getDate() >= birthdate.getDate());
    
    if (isOldEnough) {
        sessionStorage.setItem('ageVerified', 'true');
        showMainContent();
        displayProducts('all');
    } else {
        document.getElementById('ageWarning').textContent = 'Sorry, you must be 21 or older to access this site.';
    }
});

// Display products
function displayProducts(category) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-icon">${product.icon}</div>
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Category filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        displayProducts(this.dataset.category);
    });
});

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    
    // Show a quick feedback
    alert(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

// Display cart
document.getElementById('cartBtn').addEventListener('click', function() {
    displayCart();
});

function displayCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    
    cartModal.classList.remove('hidden');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
        document.getElementById('cartTotal').textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.icon} ${item.name}</h4>
                <p>${item.category}</p>
            </div>
            <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
}

// Close cart modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('cartModal').classList.add('hidden');
});

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    document.getElementById('cartModal').classList.add('hidden');
    document.getElementById('checkoutModal').classList.remove('hidden');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('checkoutTotal').textContent = total.toFixed(2);
});

// Close checkout modal
document.querySelector('.close-checkout').addEventListener('click', function() {
    document.getElementById('checkoutModal').classList.add('hidden');
});

// Handle checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const idNumber = document.getElementById('idNumber').value;
    
    // In a real application, this would send the order to a server
    const orderSummary = {
        customer: { fullName, email, phone, address, idNumber },
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0)
    };
    
    console.log('Order placed:', orderSummary);
    
    // Show success message
    document.getElementById('checkoutModal').innerHTML = `
        <div class="modal-content">
            <div class="success-message">
                <h2>Order Placed Successfully! 🎉</h2>
                <p>Thank you for your order, ${fullName}!</p>
                <p>Order Total: $${orderSummary.total.toFixed(2)}</p>
                <p>A confirmation email has been sent to ${email}</p>
                <p>Your order will be delivered to:</p>
                <p><strong>${address}</strong></p>
                <p style="margin-top: 20px;">Remember to have your ID ready for age verification upon delivery!</p>
                <button class="btn btn-primary" onclick="closeCheckoutAndReset()">Continue Shopping</button>
            </div>
        </div>
    `;
});

// Close checkout and reset
function closeCheckoutAndReset() {
    document.getElementById('checkoutModal').classList.add('hidden');
    cart = [];
    updateCartCount();
    
    // Reset the checkout modal for next time
    document.getElementById('checkoutModal').innerHTML = `
        <div class="modal-content">
            <span class="close-checkout">&times;</span>
            <h2>Checkout</h2>
            <form id="checkoutForm">
                <div class="form-group">
                    <label for="fullName">Full Name:</label>
                    <input type="text" id="fullName" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone:</label>
                    <input type="tel" id="phone" required>
                </div>
                <div class="form-group">
                    <label for="address">Delivery Address:</label>
                    <textarea id="address" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="idNumber">ID Number (for age verification on delivery):</label>
                    <input type="text" id="idNumber" required>
                </div>
                <div class="checkout-total">
                    <h3>Total: $<span id="checkoutTotal">0.00</span></h3>
                </div>
                <button type="submit" class="btn btn-primary">Place Order</button>
            </form>
        </div>
    `;
    
    // Re-attach event listeners
    document.querySelector('.close-checkout').addEventListener('click', function() {
        document.getElementById('checkoutModal').classList.add('hidden');
    });
    
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const idNumber = document.getElementById('idNumber').value;
        
        const orderSummary = {
            customer: { fullName, email, phone, address, idNumber },
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price, 0)
        };
        
        console.log('Order placed:', orderSummary);
        
        document.getElementById('checkoutModal').innerHTML = `
            <div class="modal-content">
                <div class="success-message">
                    <h2>Order Placed Successfully! 🎉</h2>
                    <p>Thank you for your order, ${fullName}!</p>
                    <p>Order Total: $${orderSummary.total.toFixed(2)}</p>
                    <p>A confirmation email has been sent to ${email}</p>
                    <p>Your order will be delivered to:</p>
                    <p><strong>${address}</strong></p>
                    <p style="margin-top: 20px;">Remember to have your ID ready for age verification upon delivery!</p>
                    <button class="btn btn-primary" onclick="closeCheckoutAndReset()">Continue Shopping</button>
                </div>
            </div>
        `;
    });
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.add('hidden');
    }
}

// Initialize on page load
window.onload = function() {
    checkAge();
};
