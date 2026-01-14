import { useState } from "react";
import ProfilePopup from "./ProfilePopup";

export default function AvatarButton({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={user.avatar}
        onClick={() => setOpen(true)}
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500 hover:scale-105 transition"
      />

      {open && <ProfilePopup user={user} onClose={() => setOpen(false)} />}
    </>
  );
}
