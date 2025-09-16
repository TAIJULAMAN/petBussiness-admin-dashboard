import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageHeading from "../../shared/PageHeading";
import { useGetPrivacyQuery, useUpdatePrivacyMutation } from "../../redux/api/privacyApi";
import Swal from "sweetalert2";

function PrivacyPolicy() {
  const [content, setContent] = useState("");
  const { data, isLoading, error } = useGetPrivacyQuery();
  const [updatePrivacy, { isLoading: isUpdating }] = useUpdatePrivacyMutation();

  // Update content when data is fetched
  useEffect(() => {
    if (data?.success && data?.privacy?.description) {
      setContent(data.privacy.description);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await updatePrivacy({
        requestData: { description: content }
      }).unwrap();

      // Show success toast
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Privacy policy updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      // Show error toast
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err?.data?.message || "Failed to update privacy policy",
        confirmButtonColor: "#FF62BD",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-5 min-h-screen">
        <PageHeading title="Privacy Policy" />
        <div className="bg-white rounded shadow p-5 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF62BD] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading privacy policy...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 min-h-screen">
        <PageHeading title="Privacy Policy" />
        <div className="bg-white rounded shadow p-5 h-full flex items-center justify-center">
          <div className="text-center text-red-500">
            <p>Error loading privacy policy</p>
            <p className="text-sm mt-2">{error?.data?.message || "Something went wrong"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen">
      <PageHeading title="Privacy Policy" />
      <div className="bg-white rounded shadow p-5 h-full">
        <ReactQuill
          style={{ padding: "10px" }}
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Enter privacy policy..."
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

export default PrivacyPolicy;
