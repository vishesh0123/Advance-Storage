import Web3 from "web3";
import AdvanceStorage from "../build/contracts/AdvanceStorage.json";

let web3;
let advanceStorage;

const initWeb3 = () => {
  MetamaskStatus();

  return new Promise((resolve, reject) => {
    //if new metamask is present
    if (window.ethereum.isMetaMask === true) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(() => {
          resolve(new Web3(window.ethereum));
        })
        .catch((e) => {
          reject(e);
        });
      return;
    }
  });
};

const initContract = () => {
  return new web3.eth.Contract(
    AdvanceStorage.abi,
    AdvanceStorage.networks["5777"].address
  );
};

const initApp = () => {
  MetamaskConnectStatus();
  const $currentOwner = document.getElementById("currentowner");
  let accounts = [];
  window.ethereum
    .request({
      method: "eth_requestAccounts",
    })
    .then((accountsarray) => {
      accounts = accountsarray;
      console.log(accounts);
      return advanceStorage.methods.getCurrentOwner().call();
    })
    .then((result) => {
      console.log(result);
      $currentOwner.innerHTML = result;
    });
};

const MetamaskStatus = () => {
  if (window.ethereum.isMetaMask === true) {
    document.getElementById("metamaskstatus").innerHTML = "Installed";
  }
};

const MetamaskConnectStatus = () => {
  if (window.ethereum.isConnected() === true) {
    document.getElementById("metamaskconnectstatus").innerHTML = "Connected";
  }
};

// const connect = () => {
//   window.ethereum
//     .request({
//       method: "eth_requestAccounts",
//     })
//     .then(console.log);
// };
document.getElementById("metamask").addEventListener("click", function () {
  let status = window.ethereum.isConnected();
  if (status === false) {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        console.log(accounts);
        console.log("working");
      });
    MetamaskConnectStatus();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initWeb3()
    .then((_web3) => {
      web3 = _web3;
      advanceStorage = initContract();
      initApp();
    })
    .catch((e) => console.log(e.message));
});
