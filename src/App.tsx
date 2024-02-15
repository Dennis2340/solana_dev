import React, {useMemo} from 'react';
import './App.css';
import MaxWidthWrapper from './components/MaxWidthWrapper';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react"
import { Movie } from "./models/Movie";
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";

import WalletContextProvider from './components/WalletContextProvider';
import AppBar from './components/AppBar';
import PingButton from './components/PingButton';
import SendTransactionsButton from './components/SendTransactionsButton';

// const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

function App() {

const [amountToSend, setAmountToSend] = useState<number>(0)
const [programAccountDataId, setProgramAccountDataId] = useState<string>('')
  return (
    <WalletContextProvider>
      <AppBar/>
          <MaxWidthWrapper>
            <div className='flex flex-col justify-center items-center'>
            <h3 className='text-black text-3xl mt-10 mb-4 justify-center'>Balance of SOL ...</h3>
              <label className='text-2xl mb-5'>Amount (SOL) To Send</label>
              <Input type='number' value={amountToSend} onChange={(e) => setAmountToSend(Number(e.target.value))} className='mb-5'/>
              <label className='text-2xl mb-5'>SEND SOL TO</label>
              <Input value={programAccountDataId} onChange={(e) => setProgramAccountDataId(e.target.value)} className='mb-5'/>
              <PingButton/>
            </div>
            <div>{amountToSend} {programAccountDataId}</div>
          </MaxWidthWrapper>
    </WalletContextProvider>
  );
}

export default App;
