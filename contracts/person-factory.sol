pragma solidity >=0.4.21 <0.7.0;

contract PersonFactory {

  event NewPerson(uint id, string name, bool alive);

  struct Person {
    string name;
    bool alive;
  }

  Person[] public people;

  mapping (uint => address) public personToOwner;
  mapping (address => uint) ownerPersonCount;

  /**
  Create Person, add them to mapping of personToOwner and increment ownerPersonCount
   */
  function createPerson (string memory _name) public {
    // Add person to person array. Push returns number in array.
    uint id = people.push(Person(_name, true)) -1;
    personToOwner[id] = msg.sender;
    ownerPersonCount[msg.sender]++;
    emit NewPerson(id, _name, true);
  }
}