import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CardanoWallet, useWallet} from "@meshsdk/react";
import {BrowserWallet} from "@meshsdk/core";
import {useState} from "react";
import NFTStepper from "./pages/NFTStepper";
import NFTChecker from "./pages/NFTChecker";

function App() {
    const { name } = useWallet();
    const [network, setNetwork] = useState("");
    const [ wallet, setWallet ] = useState(undefined as BrowserWallet | undefined);
    async function walletConnected() {
        console.log("Wallet connected: " + name);
        const browserWallet = await BrowserWallet.enable(name);
        setWallet(browserWallet);
        browserWallet.getNetworkId().then(value => {
            switch (value) {
                case 0:
                    setNetwork("Testnet")
                    break;
                case 1:
                    setNetwork("Mainnet")
                    break;
                default:
                    setNetwork("Unknown")
            }
        });
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
                        <a href={"/check"} className="nav-link">
                            NFT Checker
                        </a>
                    </li>
                </div>
                <div className="ms-auto navbar-brand">{network ? "Current Network: " + network : ""}</div>
                <div className="ms-auto">
                    < CardanoWallet onConnected={walletConnected}/>
                </div>
            </nav>
            <div className="container mt-3">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NFTStepper wallet={wallet} />}/>
                    <Route path="/nft" element={<NFTStepper wallet={wallet} />}/>
                    <Route path="/check" element={<NFTChecker wallet={wallet} />}/>
                    <Route path="/check/:unit" element={<NFTChecker wallet={wallet}/>}/>
                </Routes>
            </BrowserRouter>
            </div>
        </>
    )
}

export default App
