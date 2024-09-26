import Web3Icon from "../../assets/web3.svg";
import UsdtIcon from "../../assets/usdt.svg";
import BitcoinIcon from "../../assets/bitcoin-token.svg";
import EthereumIcon from "../../assets/ethereum-token.svg";
import LitecoinIcon from "../../assets/litecoin.svg";
import MetamaskIcon from "../../assets/metamask.svg";
import CoinbaseIcon from "../../assets/coinbase.svg";
import BinanceIcon from "../../assets/binance.svg";
import QrWalletIcon from "../../assets/qr-wallet.svg";
import BackIcon from "../../assets/back.svg";
import SearchIcon from "../../assets/search.svg";

import styles from "./styles.css";
import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import Button from "../button";

interface ConnectWalletProps {
  onNext: () => void;
  onClose: () => void;
}

interface Token {
  Icon: FunctionalComponent;
  title: string;
  value: number;
  currency: string;
}

const CRYPTO_LIST: Token[] = [
  { Icon: UsdtIcon, title: "USDT", value: 23.04, currency: "USDT" },
  { Icon: BitcoinIcon, title: "Bitcoin", value: 0.00261345, currency: "BTC" },
  { Icon: EthereumIcon, title: "Ethereum", value: 0.061923, currency: "ETH" },
  { Icon: LitecoinIcon, title: "Litecoin", value: 2.234085, currency: "LTC" },
];

const WALLET_LIST = [
  { Icon: MetamaskIcon, title: "Metamask", status: "Installed" },
  { Icon: BinanceIcon, title: "Bitcoin", status: "" },
  { Icon: CoinbaseIcon, title: "Ethereum", status: "" },
];

const ConnectWallet: FunctionalComponent<ConnectWalletProps> = ({ onClose, onNext }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Token | null>(null);
  const [cryptoSearch, setCryptoSearch] = useState("");
  const [walletSearch, setWalletSearch] = useState("");

  const handleSelect = (index: number) => () => {
    if (CRYPTO_LIST[index].title === selectedItem?.title) {
      setSelectedItem(null);
    } else setSelectedItem(CRYPTO_LIST[index]);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleConnect = () => {
    setIsConnected(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleNext = () => {
    if (!isConnected || !selectedItem) return;
    onNext();
  };

  const filteredCryptoList = CRYPTO_LIST.filter((crypto) =>
    crypto.title.toLowerCase().includes(cryptoSearch.toLowerCase())
  );

  const filteredWalletList = WALLET_LIST.filter((wallet) =>
    wallet.title.toLowerCase().includes(walletSearch.toLowerCase())
  );

  return (
    <div className="step-container">
      <style>{styles.toString()}</style>

      {!open && (
        <>
          {isConnected ? (
            <div className="crypto-item">
              <div className="item-data-container">
                <MetamaskIcon />
                <div className="item-data">
                  <span className="title">Metamask</span>
                  <span>0x38...81F7</span>
                </div>
              </div>
              <button className="disconnect-button" onClick={handleDisconnect}>
                Disconnect
              </button>
            </div>
          ) : (
            <Button variant="secondary" onClick={handleOpen}>
              <div className="connect-wallet-button">
                <Web3Icon />
                <span className="button-text">Connect Web3 wallet</span>
              </div>
            </Button>
          )}
          <div className="search-container">
            <p className="step-title">Supported crypto currencies</p>
            <div className="search-input-container">
              <SearchIcon color="info" />
              <input
                className="input"
                placeholder="Search for currency"
                value={cryptoSearch}
                onChange={(e) => setCryptoSearch(e.currentTarget.value)}
              />
            </div>
            <div className="list-container">
              {filteredCryptoList.map(({ title, Icon, value, currency }, index) => (
                <div
                  className={`crypto-item pointer ${selectedItem?.title === title ? "selected" : ""}`}
                  key={index}
                  onClick={handleSelect(index)}
                >
                  <div className="item-data-container">
                    <Icon />
                    <div className="item-data">
                      <span className="title">{title}</span>
                      <span>
                        {value} {currency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="footer-button-container">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleNext}>
              Continue
            </Button>
          </div>
        </>
      )}
      {open && (
        <>
          <div className="connect-wallet-title">
            <p className="crypto-title">Connect your wallet</p>
            <div className="back pointer" onClick={handleClose}>
              <BackIcon /> Back
            </div>
          </div>
          <div className="center">
            <QrWalletIcon />
          </div>
          <div className="search-container">
            <p className="crypto-title">Supported wallets</p>
            <div className="search-input-container">
              <SearchIcon />
              <input
                className="input"
                placeholder="Search for wallet"
                value={walletSearch}
                onChange={(e) => setWalletSearch(e.currentTarget.value)}
              />
            </div>
            <div className="list-container">
              {filteredWalletList.map(({ title, Icon, status }, index) => (
                <div
                  className={`crypto-item ${status ? "pointer" : ""}`}
                  key={index}
                  {...(status && { onClick: handleConnect })}
                >
                  <div className="item-data-container">
                    <Icon />
                    <div className="item-data">
                      <span className="title">{title}</span>
                      {status && <span>{status}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectWallet;
