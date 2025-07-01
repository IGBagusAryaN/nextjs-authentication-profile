type Props = {
  interests: string[];
  onEditClick: () => void;
};

import { PencilLine } from "lucide-react";

export default function InterestDisplay({ interests, onEditClick }: Props) {
  return (
    <div className="bg-layout-secondary rounded-xl px-[23px] py-4 relative">
      <button
        className="absolute top-5 right-5 text-gray-400 hover:text-white"
        onClick={onEditClick}
      >
        <PencilLine />
      </button>
      <p className="text-sm font-semibold mb-1">Interest</p>
      {interests.length === 0 ? (
        <p className="text-gray-400 text-sm py-[13px]">
          Add in your interest to find a better match
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 py-2">
          {interests.map((item, idx) => (
            <span
              key={idx}
              className="bg-white bg-opacity-10 text-white px-3 py-1 rounded-md"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
