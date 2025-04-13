import React from "react";
import { MdOutlineShare } from "react-icons/md"; // Share Icon
import MaleAvatarGif from "../assets/images/Male Avatar.gif"; // Static avatar
import banner from "../assets/images/banner.jpg"; // Static avatar

const ProfileHeader = ({ name, address, shareLink }) => {
  return (
    <div
      className="relative w-full h-40 bg-cover bg-center mb-8"
      style={{
        backgroundImage: `url('../assets/images/banner.jpg')`,
        backgroundSize: "cover", // Ensures the background image covers the full width and height
        backgroundPosition: "center", // Keeps the image centered
      }}>
      {/* Optional Overlay to Darken the Background Image */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Profile Content (Avatar, Name, Address) */}
      <div className="absolute bottom-2 left-0 z-10 text-white w-full">
        <div className="flex flex-row mx-5 justify-between w-full">
          <div className="flex flex-row items-center space-x-4">
            {/* Profile Avatar */}
            <img
              src={MaleAvatarGif} // Replace with actual user avatar
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              {/* Name */}
              <h1 className="text-2xl font-bold">{name}</h1>
              {/* Address */}
              <p className="text-lg">{address}</p>
            </div>
          </div>

          {/* Share Button */}
          {/* <div className="mt-4">
            <a href={shareLink} className="text-blue-500">
              <MdOutlineShare size={30} />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
