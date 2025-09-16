<<<<<<< HEAD
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
=======
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageHeading from "../../shared/PageHeading";

function PrivacyPolicy() {
  const [content, setContent] = useState(
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum."
  );
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62

  return (
    <div className="p-5 min-h-screen">
      <PageHeading title="Privacy Policy" />
<<<<<<< HEAD
      <div className="bg-white rounded shadow p-5 h-full">
=======
      <div className=" bg-white rounded shadow p-5 h-full">
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
        <ReactQuill
          style={{ padding: "10px" }}
          theme="snow"
          value={content}
          onChange={setContent}
<<<<<<< HEAD
          placeholder="Enter privacy policy..."
=======
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
        />
      </div>
      <div className="text-center py-5">
        <button
<<<<<<< HEAD
          onClick={handleSave}
          disabled={isUpdating}
          className={`font-semibold w-full py-2 rounded transition duration-200 ${
            isUpdating
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#91DF92] hover:bg-[#7FD180] text-[#000] cursor-pointer"
          }`}
        >
          {isUpdating ? "Saving..." : "Save changes"}
=======
          onClick={() => console.log(content)}
          className="bg-[#91DF92] text-[#000] font-semibold w-full py-2 rounded transition duration-200"
        >
          Save changes
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
        </button>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
