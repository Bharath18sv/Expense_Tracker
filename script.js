document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expenseForm");
  const expenseName = document.getElementById("expenseName");
  const expenseAmount = document.getElementById("expenseAmount");
  const addExpenseBtn = document.getElementById("AddExpense");
  const expenseListDisplay = document.getElementById("ExpenseList");
  const totalAmount = document.getElementById("TotalPrice");

  const expenseList = JSON.parse(localStorage.getItem("expenses")) || [];
  saveExpenses();
  calculateExpense();
  displayExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };
      expenseList.push(newExpense);
      saveExpenses();
      calculateExpense();
      displayExpenses();
      expenseName.value = "";
      expenseAmount.value = "";
    }
  });

  function calculateExpense() {
    totalAmount.textContent = `$${expenseList.reduce((sum, expense) => sum + expense.amount, 0)}`;
  }

  function displayExpenses() {
    expenseListDisplay.textContent = "";
    expenseList.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${expense.name} - $${expense.amount}</span>
        <button data-id="${expense.id}">Remove</button>
      `;
      expenseListDisplay.appendChild(li);
    });
  }

  expenseListDisplay.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = e.target.getAttribute("data-id");

      const index = expenseList.findIndex((expense) => expense.id == id);

      if (index != -1) {
        expenseList.splice(index, 1);
      }
      saveExpenses();
      calculateExpense();
      displayExpenses();
    }
  });

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
  }
});
