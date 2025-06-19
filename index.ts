const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../Transactions2014.csv')
const csvData = fs.readFileSync(filePath, 'utf-8')
const lines = csvData.trim().split('\r\n')
const [headerLine, ...dataLines] = lines

class Account {
    name: string
    funds: number
    constructor (name : string, funds: number) {
        this.name = name
        this.funds = funds * 100
    }
    deposit(amount: number) {
        this.funds = this.funds + amount * 100
    }
    withdraw(amount: number) {
        this.funds = this.funds - amount * 100
    }
}

class Transaction {
    date: string
    from: Account
    to: Account
    narrative: string
    amount: number
    constructor (date: string, from: Account, to: Account, narrative: string, amount: number) {
        this.date = date
        this.from = from
        this.to = to
        this.narrative = narrative
        this.amount = amount * 100
    }
}
const accounts: Account[] = []
const transations: Transaction[] = []

const linkAccount = (accountName: string) => {
const isNewAccount = !accounts.some(account => account.name === accountName)
    if (isNewAccount) {
        const newAccount = new Account(accountName, 0)
        accounts.push(newAccount)
        return newAccount
    }
    return accounts.find(account => account.name === accountName)
}

dataLines.forEach((transaction: string) => {
    // 1: Process Accounts
    const transactionData = transaction.split(',')
    const accountNameFrom = transactionData[1]
    const accountFrom = linkAccount(accountNameFrom)
    const accountNameTo = transactionData[2]
    const accountTo = linkAccount(accountNameTo)

    // 2: Process Transactions
    const transactionDate = transactionData[0]
    const transactionNarrative = transactionData[3]
    const transactionAmount = Number(transactionData[4])
    if (accountTo && accountFrom) {
        const newTransaction = new Transaction(transactionDate,accountFrom,accountTo,transactionNarrative,transactionAmount)
        transations.push(newTransaction)
        accountFrom.withdraw(transactionAmount)
        accountTo.deposit(transactionAmount)
    }
});

console.log(accounts)