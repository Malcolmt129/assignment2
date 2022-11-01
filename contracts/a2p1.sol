// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

contract a2p1 {
    enum EnrollmentType { UNDERGRADUATE, GRADUATE }
    address public owner;
    uint256 numStudents = 0;

    struct Course {
        uint256 number;
        EnrollmentType courseType;
        bool gradsCanEnroll;
        bool exists;
        uint256 numOfStudents;
    }

    struct Registered {
        address id;
        uint256 courseNum;
        uint256 timeStamp;
        uint256 credits;
        bool exists;
    }

    struct Student {
        address id;
        EnrollmentType status;
        uint256 credits;
        bool exists;
        bool registered;
        uint256 timeStamp;
        
    }

    mapping (uint256 => Course) public catalogue;
    uint256[] public courses;

    mapping (address => Student) public enrolled;
    Student[] public allStudents;

    mapping (address => Registered) public registered;
    Registered[] public allreg;

    constructor() {
        owner = msg.sender;  
    }

    function add (uint256 courseNumber, EnrollmentType courseType) public {
        require(msg.sender ==  owner, "Not authorized to make this transaction"); //have to be the owner
        require(catalogue[courseNumber].exists != true, "Class already exists!"); //Class cant exist 
        
        courses.push(courseNumber);
        Course storage class = catalogue[courseNumber];

        class.number = courseNumber; 
        class.courseType = courseType;
        class.exists = true;
        class.numOfStudents = 0;
        
        if (courseNumber == 431){
            class.gradsCanEnroll = false;
        }
        else {
            class.gradsCanEnroll = true;
        }
    }
        //Creates a full class so that the error is produced in registration function
        function addForFailure (uint256 courseNumber, EnrollmentType courseType) public {
        
        
        require(msg.sender ==  owner, "Not authorized to make this transaction"); //have to be the owner
        require(catalogue[courseNumber].exists != true, "Class already exists!"); //Class cant exist 
        
        courses.push(courseNumber);
        Course storage class = catalogue[courseNumber];

        class.number = courseNumber; 
        class.courseType = courseType;
        class.exists = true;
        class.numOfStudents = 30;
        
        if (courseNumber == 431){
            class.gradsCanEnroll = false;
        }
        else {
            class.gradsCanEnroll = true;
        }
    }


    //I can probably finesse these paramters with the javascript
    function register(uint256 _credits, uint256 _course) public returns (address) {
        address registrant = msg.sender;
        Student storage student = enrolled[registrant]; 
        
        require(enrolled[registrant].exists == true, "This registrant doesn't exist"); 
        require(catalogue[_course].exists == true, "This class does not exist!");
        require(catalogue[_course].numOfStudents < 30, "Class is full!");
        require(enrolled[registrant].registered == false, "Registrant can only register for one class"); //If true can't register for another class.
        
        EnrollmentType studentType = enrolled[registrant].status;
        
        if (_course == 431){
            require(studentType != EnrollmentType.GRADUATE, "Not elligible for this class"); //No grad is ellible for this class
        }

        if (studentType == EnrollmentType.UNDERGRADUATE){
            require(_course == 431 || _course == 484, "Not elligible for this class"); //Undergrads can only register for these classes
        } else {
            require(student.credits >= 20, "Not enough credits to register as a Graduate");
        }

        catalogue[_course].numOfStudents++; //increase number of students in the class
        
        Registered  memory newRegistrant = Registered({
            id:registrant,
            courseNum: _course,
            timeStamp: 0,
            credits: _credits,
            exists: true 
        });
        
        allreg.push(newRegistrant);
        registered[registrant] = newRegistrant;
        student.registered = true; //they have registered for their one class
        student.credits += _credits; //add the new credits... dont know if this is the correct thing but it does something with the credits
        //this is for the time stamp

        return (registrant);

    }

    

    function makeStudent(EnrollmentType _status, uint256 _credits) public {
        require(msg.sender != owner);
        Student memory newStudent = Student({
            id:msg.sender, 
            status:_status, 
            credits:_credits, 
            exists:true,
            registered: false,
            timeStamp: block.timestamp
        });
        allStudents.push(newStudent); //add new student to the list of all students

        enrolled[msg.sender] = newStudent;
        numStudents++;
    }

    function makeStudentForFail(EnrollmentType _status, uint256 _credits) public {
    require(msg.sender != owner);
    Student memory newStudent = Student({
        id:msg.sender, 
        status:_status, 
        credits:_credits, 
        exists:true,
        registered: false,
        timeStamp: block.timestamp+ 1 hours
    });
    allStudents.push(newStudent); //add new student to the list of all students

    enrolled[msg.sender] = newStudent;
    numStudents++;
    }



    function drop(uint256 course) public {
        Student memory currStudent = enrolled[msg.sender];

        require(catalogue[course].exists == true, "Course doesn't exist");
        require(registered[msg.sender].courseNum == course && registered[msg.sender].exists ==true, "Not currently registered to this course");
        require(block.timestamp < currStudent.timeStamp + 30 minutes, "Too late to drop!");
        
        for (uint256 i = 0; i < allreg.length; i++){
            if (allreg[i].id == currStudent.id) {
                delete allreg[i];
                break;
            }
        }

        currStudent.registered = false; //turn the registered to false
        currStudent.timeStamp = 0; //TimeStamp to zero to reset it back to the map default

        
        //Reset this mapping address to default settings
        registered[msg.sender].courseNum = 0;
        registered[msg.sender].timeStamp = 0;
        registered[msg.sender].credits = 0;
        registered[msg.sender].exists = false;


    }   

    function getRoster(uint256 _course) public {

        require(catalogue[_course].exists == true, "Class doesn't exist");
       
        address[] memory classRoster = new address[](numStudents);
        uint256 j = 0;

       for (uint256 i = 0; i < allreg.length; i++) {
             
            if (allreg[i].courseNum == _course){
                classRoster[j] = allreg[i].id;
                j++;
            }
       }

       emit printRoster(classRoster);
    }
    
    function showCatalogue() public{
        emit printCatalogue(courses); 
    }

    function printAllStudents() public {
        emit printAll(allStudents);
    }

    

    event printCatalogue(uint256[] courses);

    event printRoster(address[] classRoster);

    event printAll(Student[] students);
    
}