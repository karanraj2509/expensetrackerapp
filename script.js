// Selecting DOM elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Array to hold transactions
let transactions = [];

// Add transaction function
function addTransaction(e) {
    e.preventDefault();  // Prevent form submission

    const transactionText = text.value.trim();  // Get and trim text input
    const transactionAmount = amount.value.trim();  // Get and trim amount input

    // Validate input
    if (transactionText === '' || transactionAmount === '') {
        alert('Please enter both text and amount');
        return;  // Exit if validation fails
    }

    const transaction = {
        id: generateID(),  // Generate a unique ID
        text: transactionText,  // Store transaction text
        amount: +transactionAmount  // Convert amount to a number
    };

    transactions.push(transaction);  // Add transaction to the array
    addTransactionDOM(transaction);  // Update the DOM
    updateValues();  // Update balance and other values

    // Clear input fields
    text.value = '';
    amount.value = '';
}

// Generate a random unique ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Add transaction to the DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';  // Determine sign for amount
    const item = document.createElement('li');  // Create a new list item

    // Add class based on the transaction type (income or expense)
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    // Set inner HTML for the list item
    item.innerHTML = `
        ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);  // Append item to the list
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);  // Filter out the transaction
    init();  // Re-initialize the app to update the DOM
}

// Update balance, income, and expense values
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);  // Extract amounts
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);  // Calculate total
    const income = amounts
        .filter(item => item > 0)  // Filter income transactions
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);  // Calculate total income
    const expense = (amounts
        .filter(item => item < 0)  // Filter expense transactions
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);  // Calculate total expense

    // Update balance display with ₹ symbol
    balance.innerHTML = `₹${total}`;

    // Change color of balance depending on its value
    if (total > 0) {
        balance.style.color = 'green';  // Positive balance
    } else if (total < 0) {
        balance.style.color = 'red';  // Negative balance
    } else {
        balance.style.color = '#333';  // Neutral color for zero balance
    }

    // Update income and expense displays with ₹ symbol
    money_plus.innerHTML = `₹${income}`;
    money_minus.innerHTML = `₹${expense}`;
}

// Initialize app
function init() {
    list.innerHTML = '';  // Clear the list to avoid duplicates
    transactions.forEach(addTransactionDOM);  // Add each transaction to the DOM
    updateValues();  // Update the balance, income, and expenses
}

// Initial setup
init();

// Event listener for form submission
form.addEventListener('submit', addTransaction);
