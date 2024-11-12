// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* var firebaseConfig = {
    apiKey: "AIzaSyD93JBn6nIsXlAspUKCwFAvoJs9aNWWo-E",
    authDomain: "budget-tracker-f3758.firebaseapp.com",
    projectId: "budget-tracker-f3758",
    storageBucket: "budget-tracker-f3758.firebasestorage.app",
    messagingSenderId: "574833982431",
    appId: "1:574833982431:web:14a4b65944c8d58904e26a",
    measurementId: "G-BQ744GXHZB"
}; 

firebaseConfig.initializApp(firebaseConfig);*/

let expenses = []
let totalAmount = 0;
let budgetAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");
const expensesValueLabel = document.getElementById("expenses-value");
const budgetInput = document.getElementById("budget-value");
const balanceLabel = document.getElementById("balance-value");
/*const auth = firebase.auth();
const database = firebase.database();

function register() {
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    full_name = document.getElementById("full-name").value
    favourite_song = document.getElementById("favourite-song").value
    milk_before_cereal = document.getElementById("milk-before-cereal").value
    if (validate_email(email) == false || validate_password(password) == false) {
        alert("Email or Password is Outta Line!")
        return
    }

    if (validate_feild(full_name) == false || validate_feild(favourite_song) == false || validate_feild(milk_before_cereal) == false) {
        alert("One or More  Extra Fields is Outta Line!")
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            var user = auth.currentUser
            var database_ref = database.ref()
            var user_data = {
                email: email,
                full_name: full_name,
                favourite_song: favourite_song,
                milk_before_cereal: milk_before_cereal,
                last_login: Date.now()
            }

            database_ref.child("users/" + user.uid).set(user_data)
            alert("User Created!")
        })
        .catch(function(error) {
            var error_code = error.code
            var error_message = error.message
            alert(error_message)
        })
}

function validate_email(email) {
    expression = /^[^@]+@\w+{\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_feild(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}*/

budgetInput.addEventListener("input", function() {
    budgetAmount = Number(budgetInput.value);
    updateBalance();
});

function addExpenses(amount) {
    totalAmount += amount;
    updateExpenses();
    updateBalance();
}

function updateBalance() {
    const balance = budgetAmount - totalAmount;
    balanceLabel.textContent = balance;
    if (balance >= 0) {
        balanceLabel.style.color = "green";
    } else {
        balanceLabel.style.color = "red";
    }
}

function updateExpenses() {
    expensesValueLabel.textContent = totalAmount;
    totalAmountCell.textContent = totalAmount;
}

addBtn.addEventListener("click", function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === " ") {
        alert("please select a category");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    if (date === " ") {
        alert("please select a date");
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    addExpenses(amount);

    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function() {
        const index = expenses.indexOf(expense);
        if (index > -1) {
            expenses.splice(index, 1);
        }
        totalAmount -= expense.amount;
        updateExpenses();
        updateBalance();
        expensesTableBody.deleteRow(newRow.rowIndex - 1);
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
});

for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function() {
        const index = expenses.indexOf(expense);
        if (index > -1) {
            expenses.splice(index, 1);
        }
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expensesTableBody.deleteRow(newRow.rowIndex - 1);
    });

    categoryCell.textContent = expenses.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expenses.date;
    deleteCell.appendChild(deleteBtn);

}

updateExpenses();
updateBalance();