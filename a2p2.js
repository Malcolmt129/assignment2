const main = async () => {
    const assignment = await hre.ethers.getContractFactory("a2p1");
    const assignmentContract = await assignment.deploy();
    await assignmentContract.deployed();
    console.log("Contract deployed to:", assignmentContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();