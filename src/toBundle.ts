import axios from "axios";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

let account: string | undefined = undefined;
let signature: string | undefined = undefined;

if (typeof (window as any).ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
} else {
  console.log('MetaMask is NOT installed!');
}

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const siweParent = document.querySelector('.siwe');
const logoutButton = document.querySelector('.logoutButton');

const siweButton = document.createElement(`button`);
siweButton.innerText = `Sign in with Ethereum`;
siweButton.type = 'button';
siweButton.className = `btn btn-lg btn-secondary`

async function getAccount() {
  if (account === undefined) {
    //Sign in
    provider.send('eth_requestAccounts', []).catch(() => console.log('user rejected request'));
    account = await signer.getAddress()
    if (ethereumButton && showAccount && siweParent && account) {
      ethereumButton.innerHTML = `Disconnect Wallet`
      showAccount.innerHTML = account;
      const data = (await axios.get(`auth/profile`)).data
      if(data.jwt === undefined){
        siweParent.appendChild(siweButton);
      }
    }
  } else {
    //Sign out
    account = undefined;
    if (ethereumButton && showAccount && siweParent) {
      ethereumButton.innerHTML = `Connect Wallet`
      showAccount.innerHTML = 'not connected';
      siweParent.removeChild(siweButton);
    }
  }
}

async function logout(){
  await axios.get(`auth/logout`);
  window.location.reload()
}

async function signIn() {
  console.log(`Signing in with Ethereum account ${account}..`);
  const { nonce } = (await axios.get(`auth/nonce`)).data;
  const message = new SiweMessage({
    domain,
    address: account!,
    statement: `Sign in with Ethereum to the app.`,
    uri: origin,
    version: '1',
    nonce,
    chainId: 1,
  });
  const payload = message.prepareMessage()
  signature = await signer.signMessage(payload);
  (await axios.post(`auth/login`, {
    siwe: {
      address: account!,
      payload,
      signature,
    }
  })).data;
  window.location.reload()
}

ethereumButton?.addEventListener('click', getAccount);
siweButton.addEventListener('click', signIn);
logoutButton?.addEventListener('click', logout);

getAccount();