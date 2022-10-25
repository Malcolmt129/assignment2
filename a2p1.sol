// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

contract a2p1 {
    enum EnrollmentType { UNDERGRADUATE, GRADUATE }
    address public owner;

    struct Course {
        uint256 number;
        EnrollmentType courseType;
        bool gradsCanEnroll;
        bool exists;
    }

    struct Registered {
        address id;
        uint256 courseNum;
        uint256 timestamp;
        uint256 credits;
        bool exists;
    }

    struct Student {
        address id;
        uint256 credits;
        bool exists;
    }

    mapping (uint256 => Course) public catalogue;

    constructor() {
        owner = msg.sender;
    }

    function add (uint256 courseNumber, EnrollmentType courseType) public view {
        require(msg.sender ==  owner, "Not authorized to make this transaction");
        require(catalogue[courseNumber].exists, "Class already exists!");
        
        Course memory class = catalogue[courseNumber];

        class.number = courseNumber;
        class.courseType = courseType;
        
        if (courseNumber == 431){
            class.gradsCanEnroll = false;
        }
        else {
            class.gradsCanEnroll = true;
        }
        
        class.exists = true;
    }


}