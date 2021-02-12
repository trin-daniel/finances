const toggle = () => document.querySelector('.modal-overlay').classList.toggle('active')

const Storage =
{
  get() {
    const transactions = localStorage.getItem('finances:transaction')
    return JSON.parse(transactions) || []
  },

  set(transactions) {
    localStorage.setItem('finances:transaction', JSON.stringify(transactions))
  }
}

const App =
{
  init() {
    Transactions.all.forEach(DOM.addTransaction)
    DOM.updateBalance()
    Storage.set(Transactions.all)
  },

  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

const Transactions =
{
  all: Storage.get(),

  add(transaction) {
    Transactions.all.push(transaction)
    App.reload()
  },

  remove(index) {
    Transactions.all.splice(index, 1)
    App.reload()
  },

  incomes() {
    let income = 0
    Transactions.all.forEach((value) => {
      if (value.amount > 0) {
        income += value.amount
      }
    })
    return income
  },

  expenses() {
    let expense = 0
    Transactions.all.forEach((value) => {
      if (value.amount < 0) {
        expense += value.amount
      } else if (value.amount === 0) {
        expense = expense
      }
    })
    return expense
  },

  total() {
    let total = this.incomes() + this.expenses() || 0
    return total
  }
}

const Form =
{
  description: document.querySelector('#description'),
  amount: document.querySelector('#amount'),
  date: document.querySelector('#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues()
    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('You must fill in the entries with the correct values!')
    }
  },

  formatValues() {
    const description = Form.getValues().description
    const amount = Number(Form.getValues().amount)
    const date = FormatDate(Form.getValues().date)
    return { description, amount, date }
  },

  clearFields() {
    Form.description.value = ''
    Form.amount.value = ''
    Form.date.value = ''
  },

  submit(event) {
    event.preventDefault()
    try {
      Form.validateFields()
      const transaction = Form.formatValues()
      Transactions.add(transaction)
      Form.clearFields()
      toggle()
    } catch (error) {
      alert(error.message)
    }

  }
}

const DOM =
{
  container: document.querySelector('.data-table tbody'),

  addTransaction(transaction, index) {
    const row = document.createElement('tr')
    row.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    row.dataset.index = index
    DOM.container.appendChild(row)
  },

  innerHTMLTransaction(transaction, index) {
    const expression = transaction.amount > 0 ? 'income' : 'expense'
    const data = `
    <td class="description">${transaction.description}</td>
    <td class="${expression}">${FormatMoney(transaction.amount)}</td>
    <td class="date">${transaction.date}</td>
    <td>
      <img
      onclick = "Transactions.remove(${index})"
      src="/src/assets/minus.svg" 
      alt="Remove transação"
      >
    </td>
    `
    return data
  },

  updateBalance() {
    const income = document.querySelector('[data-income]')
    income.innerHTML = FormatMoney(Transactions.incomes())

    const expense = document.querySelector('[data-expense]')
    expense.innerHTML = FormatMoney(Transactions.expenses())

    const total = document.querySelector('[data-total]')
    total.innerHTML = FormatMoney(Transactions.total())
  },

  clearTransactions() {
    DOM.container.innerHTML = ""
  }
}

App.init()
