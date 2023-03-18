import { Get, Route, Tags, Response, Security, Path } from "tsoa";
import { User_Scopes } from "../../models";
import { TOKEN_TYPES } from "../../services/tokenService";
import { ethers } from "ethers";

/**
 * Web3 Controller
 */
@Route("web3")
@Tags("Web3")
@Security(TOKEN_TYPES.SIWE, [User_Scopes.USER])
@Response<{ message: string }>(401, "Unauthorized", {
  message: `Unauthorized request`,
})
export class Web3Controller {

  @Get("wallet")
  public async wallet(
  ): Promise<{
    address: string;
    privateKey: string;
  }> {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  @Get("ens/resolve/{name}")
  public async ensResolve(
    @Path() name: string,
  ): Promise<{
    address: string | null;
  }> {
    const provider = new ethers.providers.JsonRpcProvider(`https://rpc.ankr.com/eth`);
    const address = await provider.resolveName(name);
    return {
      address,
    };
  }

  @Get("ens/lookup/{address}")
  public async en(
    @Path() address: string,
  ): Promise<{
    name: string | null;
  }> {
    const provider = new ethers.providers.JsonRpcProvider(`https://rpc.ankr.com/eth`);
    const name = await provider.lookupAddress(address);
    return {
      name,
    };
  }

}
