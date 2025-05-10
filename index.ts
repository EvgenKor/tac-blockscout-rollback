import { AssetBridgingData, EvmProxyMsg, Network, SDKParams, SenderFactory, startTracking, TacSdk } from '@tonappchain/sdk';
import { ethers } from 'ethers';

const TEST_PROXY = "0x015CC7bb329f28C6Cd0F2A119D32667966f97d15";
//const TVM_TKA_ADDRESS = "EQBLi0v_y-KiLlT1VzQJmmMbaoZnLcMAHrIEmzur13dwOmM1";
const TVM_TKA_ADDRESS = "EQDqeTtBiQfpPFSE-XcB1DhUlWRLPPvs6caCuUAXPHQ9Li-W";
const amountA = 1;

const WALLET_VERSION = "V3R2";
const TVM_MNEMONICS = "art tank game enhance acquire ivory rude moral verify cluster typical ill monster bread patient again cute volcano hill seminar mass exile crater floor";

async function rollback() {
    const sdkParams: SDKParams = {
        network: Network.TESTNET,
    };
    const tacSdk = await TacSdk.create(sdkParams);

    const EVM_TKA_ADDRESS = await tacSdk.getEVMTokenAddress(TVM_TKA_ADDRESS);

    const abi = new ethers.AbiCoder();
    const encodedParameters = abi.encode(['string'], [`blockscout_error`]);

    const evmProxyMsg: EvmProxyMsg = {
        evmTargetAddress: TEST_PROXY,
        methodName: 'mockWithDefaultError(bytes,bytes)',
        encodedParameters,
    };

    const sender = await SenderFactory.getSender({
        network: Network.TESTNET,
        version: WALLET_VERSION,
        mnemonic: TVM_MNEMONICS,
    });

    const jettons: AssetBridgingData[] = [
        {
            address: TVM_TKA_ADDRESS,
            amount: amountA,
        },
    ];

    return await tacSdk.sendCrossChainTransaction(evmProxyMsg, sender, jettons, true);
}

async function main() {
    try {
        console.log('Start working...');

        // send transaction
        const result = await rollback();
        console.log('Transaction successful:', result);

        // start tracking transaction status
        await startTracking(result, Network.TESTNET);
    } catch (error) {
        console.error('Error during transaction:', error);
    }
}

main();