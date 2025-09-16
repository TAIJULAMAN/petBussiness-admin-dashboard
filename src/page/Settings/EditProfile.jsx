<<<<<<< HEAD
import { useSelector } from "react-redux";

function EditProfile() {
  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);
=======
function EditProfile() {
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
          return (
            <div className="bg-white px-20 w-[715px] py-5 rounded-md">
              <p className="text-[#0D0D0D] text-center font-bold text-2xl mb-5">
                Edit Your Profile
              </p>
              <form className="space-y-4">
                <div>
                  <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
<<<<<<< HEAD
                    value={user?.name || ""}
=======
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                    placeholder="Enter full name"
                    required
                  />
                </div>
        
                <div>
                  <label className="text-xl text-[#0D0D0D] mb-2 font-bold">Email</label>
                  <input
<<<<<<< HEAD
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl bg-gray-100"
                    placeholder="Email address"
                    readOnly
=======
                    type="text"
                    name="contactNo"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                    placeholder="Enter Contact Number"
                    required
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
                  />
                </div>
        
                <div>
                  <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
<<<<<<< HEAD
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={user?.role?.replace('_', ' ') || ""}
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl bg-gray-100"
                    placeholder="User role"
                    readOnly
=======
                    Contact No
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                    placeholder="Enter Address"
                    required
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
                  />
                </div>
        
                <div className="text-center py-5">
                  <button className="bg-[#91DF92] text-white font-semibold w-full py-3 rounded-lg">
                  Save & Change
                  </button>
                </div>
              </form>
            </div>
          );
        }
        
        export default EditProfile;
        