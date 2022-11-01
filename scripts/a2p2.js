
const main = async () => {
  
  const [owner, randomPerson1, randomPerson2, randomPerson3, randomPerson4, randomPerson5] = await hre.ethers.getSigners();
  const assignment = await hre.ethers.getContractFactory("a2p1");
  const assignmentContract = await assignment.deploy();
  await assignmentContract.deployed();
  console.log("Contract deployed to: ", assignmentContract.address);
  console.log("Contract deployed by: ", owner.address);
  console.log("Current classes that are available are: ")
  let testAdd;
  testAdd = await assignmentContract.add(431, 0); 
  testAdd = await assignmentContract.add(484, 0);
  testAdd = await assignmentContract.add(617, 1);
  testAdd = await assignmentContract.add(670, 1);

  //making students out of all the signers. 
  let student;
  student = await assignmentContract.connect(randomPerson1).makeStudent(1,20);
  await student.wait();

  student = await assignmentContract.connect(randomPerson2).makeStudent(0,10);
  await student.wait();
  
  student = await assignmentContract.connect(randomPerson3).makeStudent(1,15);
  await student.wait();
  
  student = await assignmentContract.connect(randomPerson4).makeStudent(1,25);
  await student.wait();

  
  
  /**===========================================================
   * Register test section
   * 
   * 
   * ===========================================================
   */
    //return registrationSuccessful();

    //return registrationUnsuccessful1(); //class does not exist failure

    //return registrationUnsuccessful2(); //class is full failure

    //return registrationUNsuccessful3(); //not enough credits as a grad using randomperson3


  
  /** ==========================================================
   * Owner adding a course test section
   * 
   * ===========================================================
   */

   //return successfulOwnerAdd();
   //return unsuccessfulOwnerAdd();





  /**==============================================================
   * Getting roster test section
   * 
   *===============================================================
   */

   //return getRosterMoreThan1Student();
   //return getRosterWtih0Students();
   //return getRosterFromNonExistent();

   /**================================================================
    * Drop test section
    * 
    * ================================================================
    */


   //return dropSuccessful();
   //return dropUnsuccessful(); 
  
  async function successfulOwnerAdd() {
    
    let testAdd;
    testAdd = await assignmentContract.add(432, 0);
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
  }

  
  async function unsuccessfulOwnerAdd () {
 
    let testAdd;
    testAdd = await assignmentContract.add(431, 0); //successful

    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
  }

  async function registrationSuccessful(){
    
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
    
    let student;
    student = await assignmentContract.connect(randomPerson1).register(3,484);
    studentTx = await student.wait();

    res = await assignmentContract.getRoster(484);
    confirmation = await res.wait();

    arraysize = confirmation.events[0].args[0].length;
    console.log("Current students enrolled in this class are: \n ")
    
    
    //filter out the non students in registration
    for (let i  = 0; i < arraysize; i++){
      if (confirmation.events[0].args[0][i] != "0x0000000000000000000000000000000000000000"){
        console.log(confirmation.events[0].args[0][i]);
      }
    }
    
  }

  async function registrationUnsuccessful1(){
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      }
      
    
    let student;
    student = await assignmentContract.connect(randomPerson1).register(3,451);
    studentTx = await student.wait();
  }

  async function registrationUnsuccessful2(){
    
    let testAdd;
    testAdd = await assignmentContract.addForFailure(432, 0);
    
    
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      }
      
    
    let student;
    student = await assignmentContract.connect(randomPerson1).register(3,432);
    studentTx = await student.wait();
  }

  async function registrationUNsuccessful3(){
    
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
    
    let student;
    student = await assignmentContract.connect(randomPerson3).register(3,484);
    studentTx = await student.wait();

    res = await assignmentContract.getRoster(484);
    confirmation = await res.wait();

    arraysize = confirmation.events[0].args[0].length;
    console.log("Current students enrolled in this class are: \n ")
    
    
    //filter out the non students in registration
    for (let i  = 0; i < arraysize; i++){
      if (confirmation.events[0].args[0][i] != "0x0000000000000000000000000000000000000000"){
        console.log(confirmation.events[0].args[0][i]);
      }
    }
    
  }

  async function getRosterMoreThan1Student(){
        
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
    
    let student;
    student = await assignmentContract.connect(randomPerson1).register(3,484);
    studentTx = await student.wait();

    student = await assignmentContract.connect(randomPerson4).register(3,484);
    studentTx = await student.wait();

    res = await assignmentContract.getRoster(484);
    confirmation = await res.wait();

    arraysize = confirmation.events[0].args[0].length;
    console.log("Current students enrolled in this class are: \n ")
    
    
    //filter out the non students in registration
    for (let i  = 0; i < arraysize; i++){
      if (confirmation.events[0].args[0][i] != "0x0000000000000000000000000000000000000000"){
        console.log(confirmation.events[0].args[0][i]);
      }
    }
  }

  async function getRosterWtih0Students(){
        
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      }

    res = await assignmentContract.getRoster(484);
    confirmation = await res.wait();

    arraysize = confirmation.events[0].args[0].length;
    console.log("Current students enrolled in this class are: \n ")
    
    
    //filter out the non students in registration
    for (let i  = 0; i < arraysize; i++){
      if (confirmation.events[0].args[0][i] != "0x0000000000000000000000000000000000000000"){
        console.log(confirmation.events[0].args[0][i]);
      }
    }
  }

  async function getRosterFromNonExistent(){
        
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      }

    res = await assignmentContract.getRoster(451);
    confirmation = await res.wait();

    arraysize = confirmation.events[0].args[0].length;
    console.log("Current students enrolled in this class are: \n ")
    
    
    //filter out the non students in registration
    for (let i  = 0; i < arraysize; i++){
      if (confirmation.events[0].args[0][i] != "0x0000000000000000000000000000000000000000"){
        console.log(confirmation.events[0].args[0][i]);
      }
    }
  }
  
    async function dropSuccessful(){
    
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
    
    let student;
    student = await assignmentContract.connect(randomPerson1).register(3,484); //this would put the student in the roster
    studentTx = await student.wait();

    student = await assignmentContract.connect(randomPerson1).drop(484); //this will make an empty roster pop up
    studentTx = await student.wait();
    

    res = await assignmentContract.getRoster(484);
    confirmation = await res.wait();

    arraysize = confirmation.events[0].args[0].length;
    console.log("Current students enrolled in this class are: \n ")
    
    
    //filter out the non students in registration
    for (let i  = 0; i < arraysize; i++){
      if (confirmation.events[0].args[0][i] != "0x0000000000000000000000000000000000000000"){
        console.log(confirmation.events[0].args[0][i]);
      }
    }
    
  }

  async function dropUnsuccessful(){
    
    let courses;
    
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();
    
    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      } 
    

      let student;
    student = await assignmentContract.connect(randomPerson1).makeStudentForFail(1,20);
    await student.wait();
    
    student = await assignmentContract.connect(randomPerson1).register(3,484); //this would put the student in the roster
    studentTx = await student.wait();

    student = await assignmentContract.connect(randomPerson1).drop(484); //this will make an empty roster pop up
    studentTx = await student.wait();
    

    res = await assignmentContract.getRoster(484);
    confirmation = await res.wait();

    arraysize = confirmation.events[0].args[0].length;
    console.log("Current students enrolled in this class are: \n ")
    
    
    //filter out the non students in registration
    for (let i  = 0; i < arraysize; i++){
      if (confirmation.events[0].args[0][i] != "0x0000000000000000000000000000000000000000"){
        console.log(confirmation.events[0].args[0][i]);
      }
    }
    
  }
  
  async function showRoster(){    
    let courses;
    courses = await assignmentContract.showCatalogue();
    courseReceipt = await courses.wait();

    let arraysize = courseReceipt.events[0].args.courses.length;
    
      for (let i = 0; i < arraysize; i++) {
        console.log(courseReceipt.events[0].args.courses[i].toString());
      }

    reg = await assignmentContract.printAllStudents();
    confirmation = await reg.wait();
    
    //console.log(confirmation.events[0].args);

  }

  
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

  