import 'dotenv/config';
import { AssetBridgingData, EvmProxyMsg, Network, SDKParams, SenderFactory, startTracking, TacSdk, WalletVersion } from '@tonappchain/sdk';
import { ethers } from 'ethers';

const TEST_PROXY = "0x015CC7bb329f28C6Cd0F2A119D32667966f97d15";
const TON_JETTON_ADDRESS = process.env.TON_JETTON_ADDRESS || "EQBLi0v_y-KiLlT1VzQJmmMbaoZnLcMAHrIEmzur13dwOmM1";
const amountA = 1;

// 'V2R1' | 'V2R2' | 'V3R1' | 'V3R2' | 'V4' | 'V5R1' | 'HIGHLOAD_V3'
const TON_WALLET_VERSION = process.env.TON_WALLET_VERSION as WalletVersion || "V3R2";
// TON Wallet 24-word mnemonic
const TON_WALLET_MNEMONICS = process.env.TON_WALLET_MNEMONICS || "";

async function rollback() {
    console.log("Start generating rollback operation...");

    const sdkParams: SDKParams = {
        network: Network.TESTNET,
    };
    const tacSdk = await TacSdk.create(sdkParams);

    const EVM_TKA_ADDRESS = await tacSdk.getEVMTokenAddress(TON_JETTON_ADDRESS);
    console.log("TVM JETTON ADDRESS: %s", TON_JETTON_ADDRESS);
    console.log("EVM  TKA   ADDRESS: %s", EVM_TKA_ADDRESS);

    const abi = new ethers.AbiCoder();
    const encodedParameters = abi.encode(['string'], [`blockscout_error`]);

    const evmProxyMsg: EvmProxyMsg = {
        evmTargetAddress: TEST_PROXY,
        methodName: 'mockWithDefaultError(bytes,bytes)',
        encodedParameters,
    };

    const sender = await SenderFactory.getSender({
        network: Network.TESTNET,
        version: TON_WALLET_VERSION,
        mnemonic: TON_WALLET_MNEMONICS,
    });
    console.log("Sender address: %s (%s)", sender.getSenderAddress(), TON_WALLET_VERSION);

    const jettons: AssetBridgingData[] = [
        {
            address: TON_JETTON_ADDRESS,
            amount: amountA,
        },
    ];

    console.log("-------------------------------------------------------------------");
    return await tacSdk.sendCrossChainTransaction(evmProxyMsg, sender, jettons, true);
}

async function main() {
    try {
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