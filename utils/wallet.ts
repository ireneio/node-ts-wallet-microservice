import { v4 as uuidv4 } from 'uuid'

export namespace Wallet {
  export interface Info {
    id: string,
    balanceTotal: number,
    lastUpdated: string,
    createdAt: string
  }

  export interface InfoPublic extends Info {
    transactions: Transaction[],
  }

  export interface Transaction {
    id: string,
    walletId: string,
    balanceBefore: number,
    balanceAfter: number,
    balanceChange: number,
    direction: boolean
  }

  export class Wallet {
    constructor() {
      // generate a uuid
      this.id = uuidv4()
      this.timeline.createdAt = new Date().toISOString()
      this.timeline.lastUpdated = new Date().toISOString()
    }

    private id: string

    private balanceTotal: number = 0

    private timeline = {
      createdAt: '',
      lastUpdated: ''
    }

    private transactions: Transaction[] = []

    public get getBalanceTotal(): { id: string, data: number } {
      return {
        id: this.id,
        data: this.balanceTotal
      }
    }

    public get getTransactions(): { id: string, data: Transaction[] } {
      return {
        id: this.id,
        data: this.transactions
      }
    }

    public get info(): InfoPublic {
      return {
        id: this.id,
        balanceTotal: this.balanceTotal,
        transactions: this.transactions,
        lastUpdated: this.timeline.lastUpdated,
        createdAt: this.timeline.createdAt
      }
    }

    public createTransaction(amount: number, direction: boolean): { id: string, status: string, data: Transaction } {
      const transaction: Transaction = {
        id: uuidv4(),
        walletId: this.id,
        balanceBefore: this.balanceTotal,
        direction,
        balanceChange: amount,
        balanceAfter: direction === true ? this.balanceTotal + amount : this.balanceTotal - amount
      }
      this.transactions = [...this.transactions, transaction]
      this.timeline.lastUpdated = new Date().toISOString()
      return {
        id: this.id,
        status: 'success',
        data: transaction
      }
    }
  }

  export function test() {
    const wallet = new Wallet()
    console.log('Wallet Info: ', wallet.info)
    console.log('New Transaction: ', wallet.createTransaction(100, true))
    console.log('Wallet Info: ', wallet.info)
  }
}
