
const main = async () => {
  
   

  /** ==========================================================
   * Owner adding a course test section.
   * 
   * ===========================================================
   */
    const [owner, randomPerson1, randomPerson2, randomPerson3] = await hre.ethers.getSigners();
    const assignment = await hre.ethers.getContractFactory("a2p1");
    const assignmentContract = await assignment.deploy();
    await assignmentContract.deployed();
    console.log("Contract deployed to: ", assignmentContract.address);
    console.log("Contract deployed by: ", owner.address);
    console.log("The current class available are: ")
    
    let testAdd;
    testAdd = await assignmentContract.add(431, 0); //successful
    
    let testAdd2;
    testAdd2 = await assignmentContract.add(484, 0);
    
    let testAdd3;
    testAdd3 = await assignmentContract.add(617, 1);
    
    let testAdd4;
    testAdd4 = await assignmentContract.add(670, 1);

    
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
  
  //unsuccessfulOwnerAdd();

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


  /*async function getCourses(assignmentContract, initialize) {
    initialize();

    let courses;
  
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    console.log(courseReceipt.events[0].args.courses[1].toString()); //refence!
    let arraysize = courseReceipt.events[0].args.courses.length;
  }*/

  
  
  
  


  /*async function initialize() {
    const [owner, randomPerson1, randomPerson2, randomPerson3] = await hre.ethers.getSigners();
    const assignment = await hre.ethers.getContractFactory("a2p1");
    const assignmentContract = await assignment.deploy();
    await assignmentContract.deployed();
    console.log("Contract deployed to: ", assignmentContract.address);
    console.log("Contract deployed by: ", owner.address);
  }*/
  
  
  /*async function successfulOwnerAdd() {
    const [owner, randomPerson1, randomPerson2, randomPerson3] = await hre.ethers.getSigners();
    const assignment = await hre.ethers.getContractFactory("a2p1");
    const assignmentContract = await assignment.deploy();
    await assignmentContract.deployed();
    console.log("Contract deployed to: ", assignmentContract.address);
    console.log("Contract deployed by: ", owner.address);
    
    let testAdd;
    testAdd = await assignmentContract.add(431, 0); //successful
    testAdd = await assignmentContract.add(484, 0);
    testAdd = await assignmentContract.add(617, 1);
    testAdd = await assignmentContract.add(670, 1);

    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    console.log(courseReceipt.events[0].args.courses[1].toString()); //refence!
    let arraysize = courseReceipt.events[0].args.courses.length;
      for (let i = 0; i < arraysize-1; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
  }*/

  
  /*async function unsuccessfulOwnerAdd (assignmentContract, initialize) {
    initialize();
    notOwner = await assignmentContract.connect(randomPerson).add(555, 1); //what happens when youre not the owner

  }*/
  
  
  /*async function printCourses () {
    initialize();
      
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    console.log(courseReceipt.events[0].args.courses[1].toString()); //refence!
    let arraysize = courseReceipt.events[0].args.courses.length;
      for (let i = 0; i < arraysize-1; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
  }*/

  
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

  