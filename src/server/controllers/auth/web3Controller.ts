import { Get, Route, Tags, Response, Path } from "tsoa";
import { ethers } from "ethers";

/**
 * Controller for web3-related endpoints
 */
@Route("web3")
@Tags("Web3")
@Response<{ message: string }>(401, "Unauthorized", {
	message: `Unauthorized request`,
})
export class Web3Controller {
	/**
	 * Generates a random wallet address and returns it with the private key
	 * @returns {Promise<{address: string; privateKey: string;}>} Object containing the randomly generated address and private key
	 */
	@Get("wallet")
	public async wallet(): Promise<{
		address: string;
		privateKey: string;
	}> {
		const wallet = ethers.Wallet.createRandom();
		return {
			address: wallet.address,
			privateKey: wallet.privateKey,
		};
	}

	/**
	 * Resolves the Ethereum Name Service (ENS) name to an address
	 * @param {string} name - ENS name to resolve
	 * @returns {Promise<{address: string | null;}>} Object containing the resolved address (if any)
	 */
	@Get("ens/resolve/{name}")
	public async ensResolve(@Path() name: string): Promise<{
		address: string | null;
	}> {
		const provider = new ethers.providers.JsonRpcProvider(
			`https://rpc.ankr.com/eth`,
		);
		const address = await provider.resolveName(name);
		return {
			address,
		};
	}

	/**
	 * Looks up the name associated with a given Ethereum address using ENS
	 * @param {string} address - Ethereum address to look up
	 * @returns {Promise<{name: string | null;}>} Object containing the resolved name (if any)
	 */
	@Get("ens/lookup/{address}")
	public async en(@Path() address: string): Promise<{
		name: string | null;
	}> {
		const provider = new ethers.providers.JsonRpcProvider(
			`https://rpc.ankr.com/eth`,
		);
		const name = await provider.lookupAddress(address);
		return {
			name,
		};
	}
}
