import { Modal } from "antd";
import { useState, useEffect } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa"; // Changed from fa6 to fa
import { RiDeleteBin6Line, RiDeleteBinLine } from "react-icons/ri"; // Changed from RiDeleteBin6Line to RiDeleteBinLine
import { CiEdit } from "react-icons/ci";
import PageHeading from "../../shared/PageHeading";
import {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "../../redux/api/faqApi";
import Swal from "sweetalert2";

const Faq = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // API hooks
  const { data: faqData, isLoading, error } = useGetAllFaqQuery();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  // Get FAQs from API data
  const AccordionData = faqData?.success ? faqData.faqs : [];

  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  const showModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (deleteId) {
      try {
        await deleteFaq(deleteId).unwrap();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "FAQ deleted successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsModalOpen(false);
        setDeleteId(null);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err?.data?.message || "Failed to delete FAQ",
          confirmButtonColor: "#FF62BD",
        });
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  const handleCancel3 = () => {
    setUpdateModalOpen(false);
  };
  const showModal2 = () => {
    setAddModalOpen(true);
  };
  const showModal3 = (faq) => {
    setSelectedFaq(faq);
    setUpdateModalOpen(true);
  };

  const handleAddFaq = async () => {
    if (!question.trim() || !answer.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in both question and answer",
        confirmButtonColor: "#FF62BD",
      });
      return;
    }

    try {
      await createFaq({ question, answer }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "FAQ created successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setAddModalOpen(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err?.data?.message || "Failed to create FAQ",
        confirmButtonColor: "#FF62BD",
      });
    }
  };

  const handleUpdateFaq = async () => {
    if (!question.trim() || !answer.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in both question and answer",
        confirmButtonColor: "#FF62BD",
      });
      return;
    }

    try {
      await updateFaq({ id: selectedFaq._id, question, answer }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "FAQ updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setUpdateModalOpen(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err?.data?.message || "Failed to update FAQ",
        confirmButtonColor: "#FF62BD",
      });
    }
  };

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Reset form when modals close
  useEffect(() => {
    if (!addModalOpen && !updateModalOpen) {
      setQuestion("");
      setAnswer("");
      setSelectedFaq(null);
    }
  }, [addModalOpen, updateModalOpen]);

  useEffect(() => {
    if (selectedFaq && updateModalOpen) {
      setQuestion(selectedFaq.question);
      setAnswer(selectedFaq.answer);
    }
  }, [selectedFaq, updateModalOpen]);

  return (
    <div className="relative p-5 z-0">
      <div className="flex justify-between items-center">
        <PageHeading title="FAQ" />
        <div className="text-white">
          <button
            onClick={showModal2}
            className="bg-[#FF62BD] text-white font-semibold px-5 py-2 rounded transition duration-200"
          >
            + Add FAQ
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded shadow p-5 h-full flex items-center justify-center mt-5">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF62BD] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading FAQs...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white rounded shadow p-5 h-full flex items-center justify-center mt-5">
          <div className="text-center text-red-500">
            <p>Error loading FAQs</p>
            <p className="text-sm mt-2">
              {error?.data?.message || "Something went wrong"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 flex-col w-full mt-5 bg-white p-5">
          {AccordionData?.length > 0 ? (
            AccordionData.map((accordion, index) => (
              <section
                key={accordion._id}
                className="border-b border-[#e5eaf2] rounded py-3"
              >
                <div className="flex gap-2 cursor-pointer items-center justify-between w-full">
                  <h2 className="text-base font-normal md:font-bold md:text-2xl flex gap-2 items-center">
                    <FaRegQuestionCircle className="w-5 h-5 hidden md:flex" />
                    {accordion.question}
                  </h2>
                  <div className="flex gap-2 md:gap-4 items-center">
                    <FaChevronDown
                      onClick={() => handleClick(index)}
                      className={`w-5 h-5 text-[#0D0D0D] transition-all duration-300 ${
                        isAccordionOpen === index &&
                        "rotate-[180deg] !text-[#14803c]"
                      }`}
                    />
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal3(accordion);
                      }}
                      className="border-2 px-1.5 py-1 rounded border-[#14803c] bg-[#f0fcf4]"
                    >
                      <button className="">
                        <CiEdit className="text-2xl cursor-pointer text-[#14803c] font-bold transition-all" />
                      </button>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal(accordion._id);
                      }}
                      className="border-2 px-1.5 py-1 rounded border-[#14803c] bg-[#f0fcf4]"
                    >
                      <button className="">
                        <RiDeleteBinLine className="text-2xl cursor-pointer text-red-500 transition-all" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                    isAccordionOpen === index
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                    {accordion.answer}
                  </p>
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No FAQs available. Add your first FAQ!
              </p>
            </div>
          )}
        </div>
      )}

      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="p-5">
          <h1 className="text-4xl text-center text-[#0D0D0D]">
            Are you sure you want to delete ?
          </h1>

          <div className="text-center py-5">
            <button
              onClick={handleOk}
              className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
            >
              YES,DELETE
            </button>
          </div>
          <div className="text-center pb-5">
            <button
              onClick={handleCancel}
              className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
            >
              NO,DON'T DELETE
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={addModalOpen}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>

          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to add a new FAQ. Ensure the answer
            provides clarity and helps users quickly resolve their queries.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium mb-1"
              >
                Question for the FAQ
              </label>
              <input
                id="question"
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="block text-sm font-medium mb-1"
              >
                Answer to the FAQ
              </label>
              <textarea
                id="answer"
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleCancel2}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>

            <button
              onClick={handleAddFaq}
              disabled={isCreating}
              className={`py-2 px-4 rounded-lg text-white ${
                isCreating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isCreating ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={updateModalOpen}
        centered
        onCancel={handleCancel3}
        footer={null}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Update FAQ</h2>

          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to add a new FAQ. Ensure the answer
            provides clarity and helps users quickly resolve their queries.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium mb-1"
              >
                Question for the FAQ
              </label>
              <input
                id="question"
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="block text-sm font-medium mb-1"
              >
                Answer to the FAQ
              </label>
              <textarea
                id="answer"
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleCancel3}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateFaq}
              disabled={isUpdating}
              className={`py-2 px-4 rounded-lg text-white ${
                isUpdating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isUpdating ? "Updating..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Faq;
