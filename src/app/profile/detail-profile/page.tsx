import { ChevronLeft, Ellipsis, PencilLine } from "lucide-react";

export default function MainProfile() {
  return (
    <div>
      <div className="min-h-screen bg-[#1A252A] text-white p-4 font-sans">
        <div className="flex justify-between items-center gap-2 text-md text-white font-medium mb-4">
                <a
            href="/profile/main-profile"
            className="text-left text-sm text-white flex items-center"
          >
            <span>
              <ChevronLeft />
            </span>
            Back
          </a>
          <a href="/profile/main-profile">@johndoe</a>
          <span></span>
        </div>

        <div className="relative bg-[#1F2A30] rounded-xl mb-4 h-60 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F4247] to-[#0D1D23]">
            <img
              src="https://wallpapers.com/images/hd/naruto-landscape-1920-x-1080-7etx167z132c0vhm.jpg"
              alt="bg"
              className="w-full h-full object-cover opacity-40"
            />
          </div>

          <a
            href=""
            className="absolute top-3 right-3 text-gray-400 hover:text-white z-10"
          >
            <PencilLine />
          </a>

          <div className="absolute bottom-4 left-4 z-10">
            <p className="text-white font-semibold text-lg">@johndoe123,</p>
          </div>
        </div>
        <div className="bg-[#0D1D23] rounded-lg p-4 mb-4 text-white space-y-2 relative">
          <div className="flex justify-between items-start">
            <h2 className="text-md font-semibold">About</h2>
                 <a
            href="/profile/update-profile"
            className="absolute top-3 right-3 text-gray-400 hover:text-white z-10"
          >
            <PencilLine />
          </a>
          </div>
          <div className="text-sm space-y-1 mt-2">
            <p>
              <span className="text-gray-500">Birthday:</span>{" "}
              <span className="text-white">28 / 08 / 1995 (Age 28)</span>
            </p>
            <p>
              <span className="text-gray-500">Horoscope:</span>{" "}
              <span className="text-white">Virgo</span>
            </p>
            <p>
              <span className="text-gray-500">Zodiac:</span>{" "}
              <span className="text-white">Pig</span>
            </p>
            <p>
              <span className="text-gray-500">Height:</span>{" "}
              <span className="text-white">175 cm</span>
            </p>
            <p>
              <span className="text-gray-500">Weight:</span>{" "}
              <span className="text-white">69 kg</span>
            </p>
          </div>
        </div>

        <div className="bg-[#0D1D23] rounded-lg p-4 text-white space-y-2 relative">
          <div className="flex justify-between items-start">
            <h2 className="text-md font-semibold">Interest</h2>
            <a
            href="/profile/interest-profile"
            className="absolute top-3 right-3 text-gray-400 hover:text-white z-10"
          >
            <PencilLine />
          </a>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Add in your interest to find a better match
          </p>
        </div>
      </div>
    </div>
  );
}
