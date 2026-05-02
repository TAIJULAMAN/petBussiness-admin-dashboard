import {
  MdDashboard,
  MdOutlineCategory,
  MdOutlinePets,
  MdClose,
} from "react-icons/md";
import { FaChevronDown, FaCog } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TbHomeDollar } from "react-icons/tb";
import { BiCheckShield, BiCommand } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/authSlice";

export const AdminItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    link: "/",
  },
  {
    key: "userManagement",
    label: "Pet owners",
    icon: MdOutlinePets,
    link: "/dashboard/user-management",
  },
  {
    key: "sellermanagement",
    label: "Business owners",
    icon: TbHomeDollar,
    link: "/dashboard/seller-management",
  },
  {
    key: "categorymanagement",
    label: "Category",
    icon: MdOutlineCategory,
    link: "/category-management",
  },
  {
    key: "bookingManagement",
    label: "Booking Management",
    icon: MdOutlineCategory,
    link: "/booking-management",
  },
  {
    key: "adPromotion",
    label: "Ads Promotion",
    icon: BiCommand,
    link: "/ads-promotion",
  },
  {
    key: "support",
    label: "Support",
    icon: BiCheckShield,
    link: "/support",
  },
  {
    key: "settings",
    label: "Settings",
    icon: FaCog,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "faq",
        label: "Faq",
        link: "/faq",
      },
    ],
  },
];

const SideBar = ({ isOpen, onClose }) => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose?.();
      }
    };

    if (isOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isMobile, onClose]);

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    AdminItems.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key,
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, []);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleItemClick = (item, e) => {
    if (item.children) {
      e.preventDefault();
      onParentClick(item.key);
    } else {
      setSelectedKey(item.key);
      if (isMobile) {
        onClose?.();
      }
    }
  };

  const handleChildClick = (child) => {
    setSelectedKey(child.key);
    setExpandedKeys([]);
    if (isMobile) {
      onClose?.();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 
          transform transition-transform duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
          bg-gradient-to-b from-[#B5ED90] to-[#A5DD80] 
          shadow-xl lg:shadow-none
          flex flex-col h-screen
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center justify-center flex-1">
            <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <MdClose className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-2 md:px-3 scrollbar-thin scrollbar-thumb-white/20">
          <nav className="space-y-2">
            {AdminItems.map((item) => {
              const isActive =
                selectedKey === item.key ||
                (item.children &&
                  item.children.some((child) => selectedKey === child.key));
              const isExpanded = expandedKeys.includes(item.key);

              return (
                <div key={item.key} className="space-y-1">
                  <Link
                    to={item.link}
                    className={`
                      group flex items-center px-4 py-3 text-sm font-medium rounded-xl
                      transition-all duration-200 ease-in-out
                      ${
                        isActive
                          ? "bg-white text-[#0B704E] shadow-lg transform scale-[1.02]"
                          : "text-white hover:bg-white/10 hover:text-white"
                      }
                    `}
                    onClick={(e) => handleItemClick(item, e)}
                  >
                    <item.icon
                      className={`
                      w-5 h-5 mr-3 transition-colors
                      ${
                        isActive
                          ? "text-[#0B704E]"
                          : "text-white/80 group-hover:text-white"
                      }
                    `}
                    />
                    <span className="flex-1 truncate">{item.label}</span>

                    {item.children && (
                      <FaChevronDown
                        className={`
                        w-4 h-4 ml-2 transition-transform duration-200
                        ${isExpanded ? "rotate-180" : "rotate-0"}
                        ${isActive ? "text-[#0B704E]" : "text-white/60"}
                      `}
                      />
                    )}
                  </Link>

                  {/* Submenu */}
                  {item.children && (
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${
                          isExpanded
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/20 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.key}
                            to={child.link}
                            className={`
                              block px-4 py-2 text-sm rounded-lg transition-all duration-200
                              ${
                                selectedKey === child.key
                                  ? "bg-white/20 text-white font-medium"
                                  : "text-white/80 hover:bg-white/10 hover:text-white"
                              }
                            `}
                            onClick={() => handleChildClick(child)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center px-4 py-3 text-sm font-medium
              bg-[#0B704E] text-white rounded-xl
              hover:bg-[#0A5F42] active:bg-[#094D35]
              transition-all duration-200 ease-in-out
              shadow-lg hover:shadow-xl transform hover:scale-[1.02]
            "
          >
            <IoIosLogIn className="w-5 h-5 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
