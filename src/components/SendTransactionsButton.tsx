import React from 'react'
import { Button } from './ui/button'
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js'

interface Props {
    amountToSend:number
    programAccountDataId: string
}

const PROGRAM_ID = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'

function validateSolAddress(address:string){
    try {
        let pubkey = new PublicKey(address)
        let  isSolana =  PublicKey.isOnCurve(pubkey.toBuffer())
        return isSolana
    } catch (error) {
        return false
    }
}

const SendTransactionsButton = ({amountToSend, programAccountDataId}: Props) => {

    const { connection } = useConnection()
    const { publicKey, sendTransaction} = useWallet()
    const handleTransactionClicked = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            /// check if connection and public key exist
            if(!publicKey || !connection || !programAccountDataId || programAccountDataId.length === 0){
                alert("There is no public key and connection or maybe the receivers id")
                return
            }
            if(validateSolAddress(programAccountDataId)){
                  //// this is the public key of the recievers wallet
                    const recieverprogramDataId = new PublicKey(programAccountDataId)
                    const transaction = new Transaction()
                //// This send the sol transaction ////
                const sendSolTransaction = SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recieverprogramDataId,
                    lamports: LAMPORTS_PER_SOL * 0.1
                })
                transaction.add(sendSolTransaction)
                await sendTransaction(transaction, connection)
            }else{
                alert("invalid recepient address")
            }
            
        } catch (error) {
            console.log("this is the error ", error)
        }
    }
  return (
        <div>
        <Button size='lg' onClick={(e) => handleTransactionClicked(e)}>Send</Button>
        </div>
  )
}

export default SendTransactionsButton