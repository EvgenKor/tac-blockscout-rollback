# TAC Blockscout Rollback

This project demonstrates how to send a **mock rollback transaction** from TON to EVM using the [`@tonappchain/sdk`](https://www.npmjs.com/package/@tonappchain/sdk). It performs a test transfer of Jettons from a TON wallet to a special EVM proxy contract and tracks the transaction on-chain.

---

## 📁 Project Structure

- `index.ts` — Main script to send and track a rollback transaction.
- `.env` — Contains wallet configuration (mnemonic, Jetton address, etc.).
- `package.json` — Project dependencies.
- `tsconfig.json` — TypeScript compiler settings.

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v16 or newer
- [NPM](https://www.npmjs.com/)
- A Jetton token deployed on TON Testnet
- TON testnet wallet mnemonic (optional if using default provided)

---

## 🛠 Installation

1. Clone or download this repository:

   ```bash
   git clone https://github.com/EvgenKor/tac-blockscout-rollback.git
   cd tac-blockscout-rollback
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

---

## 🔧 Configuration

This project uses a `.env` file to configure wallet and token settings.

Example `.env` file (already included for testing):

```env
TON_WALLET_VERSION="V3R2"
TON_WALLET_MNEMONICS="art tank game enhance acquire ivory rude moral verify cluster typical ill monster bread patient again cute volcano hill seminar mass exile crater floor"
TON_JETTON_ADDRESS="EQDqeTtBiQfpPFSE-XcB1DhUlWRLPPvs6caCuUAXPHQ9Li-W"
```


> ✅ This mnemonic and jetton is created **specifically for public testing** and is safe to use for testnet-only experiments.  
> ❗ If you want to use your **own TON wallet or jetton**, ensure that:
>
> - The wallet has **testnet TON** for gas.
> - It holds **Jettons** of the specified `TON_JETTON_ADDRESS`.
> - You specify the correct wallet version — one of:  
>   `V2R1`, `V2R2`, `V3R1`, `V3R2`, `V4`, `V5R1`, `HIGHLOAD_V3`
> - `TON_JETTON_ADDRESS` presented in EQ-format

---

## 🪙 Creating Your Own Jetton (Optional)

To mint and use your own Jetton on the **TON Testnet**, use the official [TON Jetton Minter](https://minter.ton.org/?testnet=true):

1. Open the link: [https://minter.ton.org/?testnet=true](https://minter.ton.org/?testnet=true)
2. Connect your testnet wallet.
3. Mint a Jetton with any name/symbol.
4. Copy the resulting Jetton address.
5. Paste it into your `.env` under `TON_JETTON_ADDRESS` (EQ-prefixed).

---

## 🚀 Running the Script

### ✅ Recommended (with `ts-node`)

```bash
npx ts-node index.ts
```

### 🧱 Or: Build and Run Manually

1. Compile TypeScript:

   ```bash
   npm run build
   ```

2. Run the compiled output:

   ```bash
   npm run start
   ```

> Make sure `.env` is correctly set up before running either version.

---

## 🧪 What the Script Does

- Initializes `TacSdk` with TON Testnet.
- Retrieves the EVM-side address of the selected TON Jetton.
- Sends a **mock** cross-chain transaction to an EVM proxy address (`mockWithDefaultError`).
- Starts tracking the transaction on-chain and prints results.
