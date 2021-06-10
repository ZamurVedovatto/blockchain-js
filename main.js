const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.prevHash = prevHash
    this.hash = this.calcHash()
  }

  calcHash() {
    return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2021", "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length -1]
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash
    newBlock.hash = newBlock.calcHash()
    this.chain.push(newBlock)
  }
}

let myCoin = new Blockchain()
myCoin.addBlock(new Block(1, "10/01/2021", { amount: 4 }))
myCoin.addBlock(new Block(1, "15/01/2021", { amount: 10 }))

console.log(JSON.stringify(myCoin, null, 2))