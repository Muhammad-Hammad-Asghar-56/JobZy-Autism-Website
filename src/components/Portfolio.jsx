import React, { useState } from "react";
import Modal from "react-modal"; // Ensure Modal is correctly imported
import ReactPaginate from "react-paginate"; // Ensure ReactPaginate is correctly imported
import { IoMdAdd } from "react-icons/io"; // Add icon for modal trigger

// Make sure to bind the modal to your app
Modal.setAppElement("#root");

const Portfolio = () => {
  // Portfolio state
  const [portfolioItems, setPortfolioItems] = useState([
    { imageUrl: "https://via.placeholder.com/150", title: "Jobzy" },
    { imageUrl: "https://via.placeholder.com/150", title: "Saudi-Hop" },
    { imageUrl: "https://via.placeholder.com/150", title: "PaybyPhone" },
  ]);
  const [currentPage, setCurrentPage] = useState(0); // To manage pagination
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for adding new item
  const [newImage, setNewImage] = useState(""); // State to hold the new image URL
  const [newTitle, setNewTitle] = useState(""); // State to hold the new title

  const itemsPerPage = 3; // Number of items per page

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Handle modal submit (add portfolio item)
  const handleAddPortfolio = () => {
    if (newImage && newTitle) {
      setPortfolioItems([
        ...portfolioItems,
        { imageUrl: newImage, title: newTitle },
      ]);
      setIsModalOpen(false);
      setNewImage("");
      setNewTitle("");
    } else {
      alert("Please provide an image and a title.");
    }
  };

  // Paginate the portfolio items
  const displayedItems = portfolioItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="portfolio-container">
      {/* Title and Controls */}
      <div className="portfolio-header flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Portfolio</h2>
        <button
          onClick={() => {
            console.log("file");
            setIsModalOpen(true);
          }}
          className="flex items-center text-blue-500 bg-white border rounded-md px-4 py-2">
          <IoMdAdd size={20} className="mr-2" />
          Add Portfolio
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="portfolio-grid grid grid-cols-3 gap-4 mb-8">
        {displayedItems.map((item, index) => (
          <div
            key={index}
            className="portfolio-item border rounded-md shadow-md p-4">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <h3 className="text-center">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(portfolioItems.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLinkClassName={"prev"}
        nextLinkClassName={"next"}
      />

      {/* Modal for Adding Portfolio Item */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="modal-content"
        overlayClassName="modal-overlay">
        <h2 className="text-xl font-semibold mb-4">Add New Portfolio Item</h2>
        <div className="mb-4">
          <label className="block text-sm">Image URL</label>
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Enter image URL"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 px-6 py-2 rounded-md">
            Cancel
          </button>
          <button
            onClick={handleAddPortfolio}
            className="bg-blue-500 text-white px-6 py-2 rounded-md">
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Portfolio;
