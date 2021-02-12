const FormatMoney = (money) => Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(money)
const FormatAmount = (value) => Number(value) * 100
const FormatDate = (value) => String(value).split('-').reverse().join('-').replace(/-/g, '/')

