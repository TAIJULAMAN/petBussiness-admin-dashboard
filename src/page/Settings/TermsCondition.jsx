import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageHeading from "../../shared/PageHeading";
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/api/termsApi";
import Swal from "sweetalert2";

function TermsAndCondition() {
  const [content, setContent] = useState("");
  const { data, isLoading, error } = useGetTermsAndConditionsQuery();
  const [updateTermsAndConditions, { isLoading: isUpdating }] =
    useUpdateTermsAndConditionsMutation();

  useEffect(() => {
    if (data?.success && data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await updateTermsAndConditions({
        description: content,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Terms and conditions updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err?.data?.message || "Failed to update terms and conditions",
        confirmButtonColor: "#FF62BD",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-5">
        <PageHeading title="Terms And Condition" />
        <div className="bg-white rounded shadow p-5 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF62BD] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading terms and conditions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <PageHeading title="Terms And Condition" />
        <div className="bg-white rounded shadow p-5 h-full flex items-center justify-center">
          <div className="text-center text-red-500">
            <p>Error loading terms and conditions</p>
            <p className="text-sm mt-2">
              {error?.data?.message || "Something went wrong"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <PageHeading title="Terms And Condition" />

      <div className="bg-white rounded shadow p-5 h-full">
        <ReactQuill
          style={{ padding: "10px" }}
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Enter terms and conditions..."
        />
      </div>
      <div className="text-center py-5">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className={`font-semibold w-full py-2 rounded transition duration-200 ${
            isUpdating
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#91DF92] hover:bg-[#7FD180] text-[#000] cursor-pointer"
          }`}
        >
          {isUpdating ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export default TermsAndCondition;
