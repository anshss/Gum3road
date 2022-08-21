//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract Gum3road is ERC1155URIStorage, ERC1155Holder {
    address payable owner;

    constructor() ERC1155("") {
        owner = payable(msg.sender);
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    struct ebook {
        uint256 tokenId;
        address payable owner;
        address payable creator;
        uint256 price;
        uint256 supply;
        uint256 supplyleft;
    }

    event ebookCreated(
        uint256 indexed tokenId,
        address owner,
        address creator,
        uint256 price,
        uint256 supply,
        uint256 supplyleft
    );

    mapping(uint256 => ebook) idToEbook;

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function createToken(
        string memory tokenURI,
        uint256 supply,
        uint256 price
    ) public payable {
        _tokenId.increment();
        uint256 currentToken = _tokenId.current();
        _mint(msg.sender, currentToken, supply, "");
        _setURI(currentToken, tokenURI);
        createEbook(currentToken, supply, price);
    }

    function createEbook(
        uint256 tokenId,
        uint256 supply,
        uint256 price
    ) private {
        idToEbook[tokenId] = ebook(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            supply,
            supply
        );

        _safeTransferFrom(msg.sender, address(this), tokenId, supply, "");

        emit ebookCreated(
            tokenId,
            address(this),
            msg.sender,
            price,
            supply,
            supply
        );
    }

    function buy(uint256 tokenId) public payable {
        uint256 price = idToEbook[tokenId].price;
        require(msg.value == price);
        require(idToEbook[tokenId].supplyleft >= idToEbook[tokenId].supply);
        idToEbook[tokenId].owner = payable(msg.sender);
        idToEbook[tokenId].supplyleft--;

        _safeTransferFrom(address(this), msg.sender, tokenId, 1, "");

        uint256 fee = price/100;
        uint256 remaining = price - fee;

        payable(idToEbook[tokenId].creator).transfer(remaining);
        payable(owner).transfer(fee);
    }

    function fetchStore() public view returns (ebook[] memory) {
        uint counter = 0;
        uint length;

        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idToEbook[i+1].supplyleft > 0) {
                length++;
            }
        }

        ebook[] memory unsoldBooks = new ebook[](length);
        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idToEbook[i+1].supplyleft > 0) {
                uint currentId = i+1;
                ebook storage currentItem = idToEbook[currentId];
                unsoldBooks[counter] = currentItem;
                counter++;
            }
        }
        return unsoldBooks;
    }

    function fetchInventory() public view returns (ebook[] memory) {
            uint counter = 0;
            uint length ;

            for (uint i = 0; i < _tokenId.current(); i++) {
                if (idToEbook[i+1].owner == msg.sender) {
                    length++;
                }
            }

            ebook[] memory myBooks = new ebook[](length);
            for (uint i = 0; i < _tokenId.current(); i++) {
                if (idToEbook[i+1].owner == msg.sender) {
                    uint currentId = i+1;
                    ebook storage currentItem = idToEbook[currentId];
                    myBooks[counter] = currentItem;
                    counter++;
                }
            }
            return myBooks;
    }

    function fetchMyListings() public view returns (ebook[] memory) {
        uint counter = 0;
        uint length;

        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idToEbook[i+1].creator == msg.sender) {
                length++;
            }
        }

        ebook[] memory myListedBooks = new ebook[](length);
        for (uint i = 0; i < _tokenId.current(); i++) {
            if (idToEbook[i+1].creator == msg.sender) {
                uint currentId = i+1;
                ebook storage currentItem = idToEbook[currentId];
                myListedBooks[counter] = currentItem;
                counter++;
            }
        }
        return myListedBooks;
    }
}

