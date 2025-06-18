const readlineSync = require('readline-sync')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../Transactions2014.csv')
const csvData = fs.readFileSync(filePath, 'utf-8')
const lines = csvData.split('\n')
const [headerLine, ...dataLines] = lines

class Account {
    name: string
    funds: number
    constructor (name : string, funds: number) {
        this.name = name
        this.funds = funds
    }
}

dataLines.forEach((transaction: string) => {
    
    console.log(transaction)
});

// console.log(dataLines)


// const userName= readlineSync.question('May I have your name? ')
// console.log('Hi ' + userName)



/*

1. Create an account for each person
2. Create transactions between accounts
    - Reduce amount in 'from' account
    - Increase amount in 'to' account


Account Class
    - name, funds
    - function: check name exists
    - function: add name (and £0 funds)
    - function: provide name with funds for list all

Transaction Class
    - date, from, to, narrative, amount
    - function: provide transaction details for list acccount

Commands:
List All : 
    output each name with funds
List [Account] :
    output each transaction amount for account with date and narrative

*/