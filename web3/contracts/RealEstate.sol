// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RealEstate {
   struct Informations {
        uint256 Price; 
        uint256 Size;
        string Address;
        string Description;
        string Documents;
        uint256 nbRooms;
        bool selling;
        address owner;
    }

    Informations[] public realEstates;
    mapping(address => Informations[]) public realEstatesByOwner;

    function post(uint256 _price, uint256 _size, string calldata _Address,
                  string calldata _description, string calldata _documents, uint256 _nbRooms) external {
        Informations memory realEstate = Informations(
            _price,
            _size,
            _Address,
            _description,
            _documents,
            _nbRooms,
            true,
            msg.sender
        );
        realEstates.push(realEstate);
        realEstatesByOwner[msg.sender].push(realEstate);
    } 

    function buy(uint256 _id) public payable {
        require(realEstates[_id].Price == msg.value, "Error price");
        payable(realEstates[_id].owner).transfer(msg.value);
        realEstates[_id].owner = msg.sender; 
        realEstates[_id].selling = false; 
    }

    function getAllRealEstates() external view returns (Informations[] memory) {
        return realEstates;
    }

    function getEstatesByOwner(address owner) external view returns (Informations[] memory) {
    
       return realEstatesByOwner[owner];
    }

}
