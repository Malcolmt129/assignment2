const main = async () => {
  
  const [owner, randomPerson] = await hre.ethers.getSigners();
  
  
  const assignment = await hre.ethers.getContractFactory("a2p1");
  const assignmentContract = await assignment.deploy();
  await assignmentContract.deployed();
  console.log("Contract deployed to: ", assignmentContract.address);
  console.log("Contract deployed by: ", owner.address);

  

  /** ==========================================================
   * Owner adding a course test section.
   * 
   * ===========================================================
   */
  let testAdd;
  testAdd = await assignmentContract.add(431, 0); //successful
  testAdd.wait();

  testAdd = await assignmentContract.add(484, 1) //successful
  testAdd.wait();

  //testAdd = await assignmentContract.add(431, 1); //Unsucessful
  
  //let notOwner;
  //notOwner = await assignmentContract.connect(randomPerson).add(555, 1); //what happens when youre not the owner


  /**
   * Register test section
   */


  /**
   * show course catalogue
   * 
   * 
   */

  let courses;
  
  courses = await assignmentContract.showCatalogue();
  courseReceipt = await courses.wait();
  //console.log(courseReceipt)
  console.log(courseReceipt.events[0].args);
  let arraysize = courseReceipt.events[0].args.courses.length;
  console.log(arraysize);
  
  /*for (let i = 0; i < courseReceipt.events[0].args.courses.length; i++){
    console.log(courseReceipt.events[0].args.courses);
  } */
  
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