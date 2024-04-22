import ShadowCard from "@/components/common/ShadowCard";
import React from "react";


const page = () => {
  return (
    <div className="">
      <div className="flex  gap-4 mt-4 justify-between text-center ">
        <ShadowCard className={"w-full"}>
          Enrolled <br /> 20
        </ShadowCard>
        <ShadowCard className={"w-full"}>
          Lecture <br /> 45
        </ShadowCard>
        <ShadowCard className={"w-full"}>
          Live Class <br /> 5
        </ShadowCard>
      </div>
    </div>
  );
};

export default page;
