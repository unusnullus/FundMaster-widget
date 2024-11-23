import UsdtIcon from "../../assets/usdt.svg";
import UsdcIcon from "../../assets/usdc.svg";
import BitcoinIcon from "../../assets/bitcoin-token.svg";
import EthereumIcon from "../../assets/ethereum-token.svg";
import BNBBNBIcon from "../../assets/BSC.svg";
import TRXTRXIcon from "../../assets/TRX.svg";
import GXAGETHIcon from "../../assets/GXAG.svg";
import USDTBNBIcon from "../../assets/USDT-bsc.svg";
import USDTTRXIcon from "../../assets/USDT-trx.svg";


import MetamaskIcon from "../../assets/metamask.svg";
import CoinbaseIcon from "../../assets/coinbase.svg";
import BinanceIcon from "../../assets/binance.svg";
// import QrWalletIcon from "../../assets/qr-wallet.svg";
// import BackIcon from "../../assets/back.svg";
import SearchIcon from "../../assets/search.svg";

import styles from "./styles.css";
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import Button from "../button";
import { usePaymentOptions } from "../../services/customer/use-payment-options";
import { PaymentOption } from "../../types/merchant";
import { usePayIn } from "../../services/customer/use-pay-in";
import { formatNumber } from "../../lib/format-number";

interface ConnectWalletProps {
  onNext: () => void;
  onClose: () => void;
  onError: () => void;
  onSelect: (index: number, list?: PaymentOption[]) => () => void;
  token: string;
  selectedCrypto: PaymentOption | null;
}

const CRYPTO_ICONS: Record<string, FunctionalComponent> = {
  "BTCBTC_TEST": BitcoinIcon,
  "ETHETH_SEPOLIA": EthereumIcon,
  "USDTETH_SEPOLIA": UsdtIcon,
  "USDCETH_SEPOLIA": UsdcIcon,
  "BNBBNB_TEST": BNBBNBIcon,
  "TRXTRX_TEST": TRXTRXIcon,
  "GXAGETH_SEPOLIA": GXAGETHIcon,
  "USDTBNB_TEST": USDTBNBIcon,
  "USDTTRX_TEST": USDTTRXIcon,
};

// const WALLET_LIST = [
//   { Icon: MetamaskIcon, title: "Metamask", status: "Installed" },
//   { Icon: BinanceIcon, title: "Bitcoin", status: "" },
//   { Icon: CoinbaseIcon, title: "Ethereum", status: "" },
// ];

const ConnectWallet: FunctionalComponent<ConnectWalletProps> = ({
  onClose,
  onNext,
  onSelect,
  onError,
  selectedCrypto,
  token,
}) => {
  // const [isConnected, setIsConnected] = useState(false);
  // const [open, setOpen] = useState(false);
  const [cryptoSearch, setCryptoSearch] = useState("");
  // const [walletSearch, setWalletSearch] = useState("");

  const { data: paymentOptions, isLoading, isError } = usePaymentOptions(token);
  const { mutate } = usePayIn(onError);

  useEffect(() => {
    if (isError) {
      onError();
    }
  }, [isError]);

  const cryptoList = paymentOptions?.data.paymentOptions;

  // const handleDisconnect = () => {
  //   setIsConnected(false);
  // };

  // const handleConnect = () => {
  //   setIsConnected(true);
  //   setOpen(false);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleNext = () => {
    if (!selectedCrypto) return;
    mutate({ token, currencyName: selectedCrypto.currencyCode, networkCode: selectedCrypto.networkCode });
    onNext();
  };

  const filteredCryptoList = [...(cryptoList ?? [])].filter((crypto) =>
    crypto.currencyTitle.toLowerCase().includes(cryptoSearch.toLowerCase())
  );

  // const filteredWalletList = WALLET_LIST.filter((wallet) =>
  //   wallet.title.toLowerCase().includes(walletSearch.toLowerCase())
  // );

  return (
    <div className="step-container">
      <style>{styles.toString()}</style>

      {/* {!open && (
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
          )} */}
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
          {isLoading && (
            <div className="loader-container">
              <div className="loader" />
            </div>
          )}
          {!isLoading &&
            filteredCryptoList?.map(({ currencyTitle, currencyCode, amount, networkCode }, index) => {
              const Icon = CRYPTO_ICONS[currencyCode+networkCode];

              return (
                <div
                  className={`crypto-item pointer ${selectedCrypto?.currencyTitle === currencyTitle ? "selected" : ""}`}
                  key={index}
                  onClick={onSelect(index, cryptoList)}
                >
                  <div className="item-data-container">
                    {CRYPTO_ICONS[currencyCode+networkCode] ? <Icon /> : <div className={`token-logo ${currencyCode+networkCode}`} />}
                    <div className="item-data">
                      <span className="title">{currencyTitle}</span>
                      {amount && (
                        <span>
                          {formatNumber(amount, 6)} {currencyCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
      {/* </>
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
      )} */}
    </div>
  );
};

export default ConnectWallet;
