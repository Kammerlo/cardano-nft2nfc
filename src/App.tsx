import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateNFT from "./pages/CreateNFT.tsx";
import {CardanoWallet, useWallet} from "@meshsdk/react";
import {BrowserWallet} from "@meshsdk/core";
import {useState} from "react";

function App() {
    const { name } = useWallet();
    const [ wallet, setWallet ] = useState({} as BrowserWallet)
    async function walletConnected() {
        console.log("Wallet connected: " + name);
        setWallet(await BrowserWallet.enable(name));
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a href="/nft" className="navbar-brand">
                    NFT Creater
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="/nft" className="nav-link">
                            CIP-25 NFT
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href={"/validator"} className="nav-link">
                            Validator
                        </a>
                    </li>
                </div>
                <div className="ms-auto">
                    < CardanoWallet onConnected={walletConnected}/>
                </div>
            </nav>
            <div className="container mt-3">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CreateNFT wallet={wallet} />}/>
                    <Route path="/nft" element={<CreateNFT wallet={wallet} />}/>
                    <Route path="/validator" /> // TODO add validator
                </Routes>
            </BrowserRouter>
            </div>
        </>
    )
}

export default App
