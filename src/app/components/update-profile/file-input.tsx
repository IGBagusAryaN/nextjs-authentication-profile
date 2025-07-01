
import { useRef } from "react";

type Props = {
  image: string | null;
  onImageChange: (img: string) => void;
};

export default function ProfileImageUpload({ image, onImageChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4 cursor-pointer" onClick={handleClick}>
      {image ? (
        <img src={image} alt="Selected" className="h-14 w-14 rounded-xl object-cover" />
      ) : (
        <div className="h-14 w-14 rounded-xl bg-input-primary flex items-center justify-center">
          <span className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">＋</span>
        </div>
      )}
      <span className="text-sm">Add image</span>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
