import { WalletV3Account} from "everscale-standalone-client/nodejs";
import { Address } from "locklift";

const AssetFactoryAddress = "0:162304af11d238a3b305b24fe6eaf9e0b562d6815731aaf3ee7d3339f26144a4"
const AuditorAddress = "0:fe013c1e6bf4a652b580941b7a060b772e7a156aff7774f5619ef67451dfee81"

export async function addAuditor() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const wallet = await WalletV3Account.fromPubkey({publicKey: signer.publicKey, workchain: 0});
    await locklift.factory.accounts.storage.addAccount(wallet);
    const factory = await locklift.factory.getDeployedContract("AssetFactory", new Address(AssetFactoryAddress));

    let tx = await factory
        .methods
        .addAuditor({auditor: new Address(AuditorAddress)})
        .send({from: wallet.address, amount: locklift.utils.toNano(1)});
    
    console.log(`Success ${(await factory.methods.isAuditor({answerId: 0, auditor: new Address(AuditorAddress)}).call({})).value0}`)
}

(async () => {
  await addAuditor();
})();