import { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function AppBar() {
  return (
     <div className="flex flex-row justify-between bg-black">
        <div className="flex flex-row justify-between mr-10">
          <h3 className="text-white text-3xl">Wallet-Adapter-Example</h3>
        </div>
        <WalletMultiButton />
      </div>
  );
};