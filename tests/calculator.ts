import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";
import { Calculator } from "../target/types/calculator";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculator as Program<Calculator>;
  const calculatorKeypair = anchor.web3.Keypair.generate();
  const user =(program.provider as anchor.AnchorProvider).wallet;

  it("Is initialized!", async () => {
    // Add your test here.   

   const tx = await program.methods.initialize().accounts({
      calculator: calculatorKeypair.publicKey,
      user: user.publicKey
    }).signers([calculatorKeypair])
    .rpc();
    console.log("To infinity and beyond!! " + tx)

    let calculatorState = await program.account.calculator.fetch(
			calculatorKeypair.publicKey
		);
      console.log('The value is', calculatorState.value.toString()); 
  });
  it("can add values", async ()=>{

    await program.methods
			.sum(new anchor.BN(4))
			.accounts({
				calculator: calculatorKeypair.publicKey,
			})
			.rpc();

    let calculatorState = await program.account.calculator.fetch(
      calculatorKeypair.publicKey
    );
    console.log('The value is', calculatorState.value.toString());

  })
  it("can remove values", async ()=>{

    await program.methods
			.subtract(new anchor.BN(8))
			.accounts({
				calculator: calculatorKeypair.publicKey,
			})
			.rpc();

    let calculatorState = await program.account.calculator.fetch(
      calculatorKeypair.publicKey
    );
    console.log('The value is', calculatorState.value.toString());

  })
  it("can multiply values", async ()=>{

    await program.methods
			.multiply(new anchor.BN(-6))
			.accounts({
				calculator: calculatorKeypair.publicKey,
			})
			.rpc();

    let calculatorState = await program.account.calculator.fetch(
      calculatorKeypair.publicKey
    );
    console.log('The value is', calculatorState.value.toString());

  })
  it("can divide values absolutely", async ()=>{

    await program.methods
			.divide(new anchor.BN(5))
			.accounts({
				calculator: calculatorKeypair.publicKey,
			})
			.rpc();

    let calculatorState = await program.account.calculator.fetch(
      calculatorKeypair.publicKey
    );
    console.log('The value is', calculatorState.value.toString());

  })
  it("resets", async ()=>{
    await program.methods
			.reset()
			.accounts({
				calculator: calculatorKeypair.publicKey,
			})
			.rpc();

    let calculatorState = await program.account.calculator.fetch(
      calculatorKeypair.publicKey
    );
    console.log('The value is', calculatorState.value.toString());

  })

    
});
