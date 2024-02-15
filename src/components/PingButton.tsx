import React from 'react'
import { Button } from './ui/button'
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
interface Props {}

const PROGRAM_ID = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
const PROGRAM_DATA_ID = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'
const PingButton = () => {

    const { connection } = useConnection()
    const { publicKey, sendTransaction} = useWallet()

   const handlePingClicked = async() => {
     try {
        if(!publicKey || !connection){
            alert("No wallet connected")
            return
          }
    
          const programId = new PublicKey(PROGRAM_ID)
          const programDataAccountId = new PublicKey(PROGRAM_DATA_ID)
          const transaction = new Transaction()
          const transactionInstruction = new TransactionInstruction({
            keys:[
                {
                    pubkey: programDataAccountId,
                    isSigner:false,
                    isWritable: true
     
                }
            ],
            programId
          })
          transaction.add(transactionInstruction)
         await sendTransaction(transaction, connection)
     } catch (error) {
        console.log("this is sending the transaction error")
     }
   }
  return (
    <div>
        <Button onClick={handlePingClicked}>Ping</Button>
    </div>
  )
}

export default PingButton