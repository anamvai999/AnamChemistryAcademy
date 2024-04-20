import React from "react";
import SideBarMenu from "@/components/dashboard-components/SideBarMenu";
import ShadowCard from "@/components/common/ShadowCard";

const page = () => {
  return (
    <div className="bg-gray-100 p-4 h-full">
      <div className="flex gap-4 justify-between ">
        <div className="min-h-[96vh] shadow-2xl p-4 w-2/12 rounded-lg bg-white">
          <SideBarMenu />
        </div>
        <div className="w-10/12">
          <ShadowCard>
              Akhanka Academy
          </ShadowCard>
          
          <ShadowCard>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa nostrum quia quisquam nobis delectus ipsam ab voluptas vel autem earum.
          </ShadowCard>
        </div>
      </div>
    </div>
  );
};

export default page;
