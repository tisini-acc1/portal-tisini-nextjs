import React from "react";
import SelectRoleCard from "../components/select-role-card";

const roles: Role[] = [
  {
    id: 1,
    role: "player",
    img: "https://w7.pngwing.com/pngs/562/273/png-transparent-soccer-player-soccer-player-sports-figures-play-football.png",
  },
  {
    id: 2,
    role: "team-owner",
    img: "https://previews.123rf.com/images/apoev/apoev1806/apoev180600171/103284764-default-placeholder-fitness-trainer-in-a-t-shirt-half-length-portrait-photo-avatar-gray-color.jpg",
  },
  {
    id: 3,
    role: "tournament-owner",
    img: "https://almerikhi.com/wp-content/uploads/2020/12/team-headshot-placeholder-male.jpg",
  },
  {
    id: 4,
    role: "referee",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoFZ4Z0IHxBwOOBZfWfrMBxsjbzRHC66KYw&usqp=CAU",
  },
  {
    id: 5,
    role: "agent",
    img: "https://lh3.googleusercontent.com/proxy/WtwvxU1BKt4_jdEUy4s8YZjqNc-CQEahzbOJ9IWZyYY-bInzUERGvVjvgAdC7FHu6LlRiIepFE-NMxs0b7YSRKuokCR5kBtsWSWlM2W1-Rc2oIAzUcgVZcHi1uKuk9z_bv1Lz6dW37DewpUmyxM-pAFr7ez8a4w2QrDbzg",
  },
];

const SelectRolePage = () => {
  return (
    <div className="w-[350px] md:w-[1100px] mb-4">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-xl font-serif">Get started as</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 m-4">
        {roles.map((account) => (
          <SelectRoleCard key={account.id} {...account} />
        ))}
      </div>
    </div>
  );
};

export default SelectRolePage;
