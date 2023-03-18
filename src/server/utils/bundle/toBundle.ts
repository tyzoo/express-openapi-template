//@ts-nocheck
//Ignore node ts check since this is a browser module
import axios from "axios";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

let account: string | undefined = undefined;
let signature: string | undefined = undefined;

if (typeof (window as any).ethereum !== "undefined") {
	console.log("MetaMask is installed!");
} else {
	alert("MetaMask is NOT installed!");
}

const domain = window.location.host;
const origin = window.location.origin;
const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provider.getSigner();

const ethereumButton = document.querySelector(".enableEthereumButton");
const showAccount = document.querySelector(".showAccount");
const siweParent = document.querySelector(".siwe");
const logoutButton = document.querySelector(".logoutButton");

const expiresAtDropdown = document.createElement(`select`);
expiresAtDropdown.title = `Select when the Token will expire`;
expiresAtDropdown.className = `btn btn-lg btn-secondary m-2`;

const defaultValue = "30d";

function addOption(value: string) {
	const option = document.createElement(`option`);
	option.value = value;
	option.textContent = value;
	if (value === defaultValue) {
		option.selected = true;
	}
	expiresAtDropdown.appendChild(option);
}

addOption("1d");
addOption("30d");
addOption("90d");
addOption("6mo");
addOption("1y");
addOption("2y");
addOption("3y");

const siweButton = document.createElement(`button`);
siweButton.innerText = `Sign in with Ethereum`;
siweButton.type = "button";
siweButton.className = `btn btn-lg btn-secondary m-2`;

async function getAccount() {
	if (account === undefined) {
		//Sign in
		provider
			.send("eth_requestAccounts", [])
			.catch(() => console.log("user rejected request"));
		account = await signer.getAddress();
		if (ethereumButton && showAccount && siweParent && account) {
			ethereumButton.innerHTML = `Disconnect Wallet`;
			showAccount.innerHTML = account;
			try {
				await axios.get(`auth/profile`);
			} catch {
				siweParent.appendChild(expiresAtDropdown);
				siweParent.appendChild(siweButton);
			}
		}
	} else {
		//Sign out
		account = undefined;
		if (ethereumButton && showAccount && siweParent) {
			ethereumButton.innerHTML = `Connect Wallet`;
			showAccount.innerHTML = "not connected";
			siweParent.removeChild(siweButton);
		}
	}
}

async function logout() {
	await axios.get(`auth/logout`);
	window.location.reload();
}

async function signIn() {
	const expiresIn = expiresAtDropdown.value;
	console.log(`Signing in for ${expiresIn} with Ethereum account ${account}..`);
	const { nonce } = (await axios.post(`auth/nonce`, { address: account })).data;
	const message = new SiweMessage({
		domain,
		address: account!,
		statement: `Sign in with Ethereum to the app.`,
		uri: origin,
		version: "1",
		nonce,
		chainId: 1,
		expiresIn,
	});
	const payload = message.prepareMessage();
	signature = await signer.signMessage(payload);
	(
		await axios.post(`auth/login?expiresIn=${expiresIn}`, {
			siwe: {
				address: account!,
				payload,
				signature,
			},
		})
	).data;
	window.location.reload();
}

ethereumButton?.addEventListener("click", getAccount);
siweButton.addEventListener("click", signIn);
logoutButton?.addEventListener("click", logout);

getAccount();
