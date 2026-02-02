"use client";

import { useState, useRef, useEffect } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface UserDropdownProps {
  userName: string;
  userEmail: string;
  onSignOut: () => void;
}

export default function UserDropdown({
  userName,
  userEmail,
  onSignOut,
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-50 hover:from-blue-100 to-indigo-50 hover:to-indigo-100 p-3 border border-blue-100 rounded-lg w-full transition-all duration-200"
      >
        <UserCircleIcon className="flex-shrink-0 w-8 h-8 text-blue-600" />
        <div className="flex-1 min-w-0 text-left">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {userName}
          </p>
          <p className="text-gray-600 text-xs truncate">{userEmail}</p>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="right-0 bottom-full left-0 z-50 absolute bg-white shadow-lg mb-2 border border-gray-200 rounded-lg overflow-hidden">
          {/* User Info Section */}
          <div className="bg-gray-50 px-4 py-3 border-gray-200 border-b">
            <p className="font-semibold text-gray-800 text-sm truncate">
              {userName}
            </p>
            <p className="text-gray-600 text-xs truncate">{userEmail}</p>
          </div>

          {/* Dropdown Items */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onSignOut();
              }}
              className="flex items-center gap-3 hover:bg-red-50 px-4 py-2.5 w-full text-gray-700 hover:text-red-600 text-sm text-left transition-colors duration-150"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
