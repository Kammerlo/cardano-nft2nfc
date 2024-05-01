import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateNFT from "./pages/CreateNFT.tsx";
import {CardanoWallet} from "@meshsdk/react";

function App() {

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
                </div>
                <div className="ms-auto">
                    < CardanoWallet/>
                </div>
            </nav>
            <div className="container mt-3">
            <BrowserRouter>
                <Routes>
                    <Route path="/nft" element={<CreateNFT/>}/>
                </Routes>
            </BrowserRouter>
            </div>
        </>
    )
}

export default App
