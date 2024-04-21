import { IoMdHome } from "react-icons/io";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { PiExamFill } from "react-icons/pi";

const NavBar = () => {
    return (
        <>
            {/* bottom navigation for mobile*/}
            <div className="btm-nav sm:hidden ">
                <button className="hover:text-blue-500">
                    <IoMdHome />
                    <p>Home</p>
                </button>
                <button className="hover:text-blue-500">
                    <PiExamFill />
                    <p>Exams</p>
                </button>
                <button className="hover:text-blue-500">
                    <BsCalendar2MinusFill />
                    <p>Routine</p>
                </button>
            </div>
            {/* navigation */}
            <div className="p-5 w-full flex justify-around ">
                <div>
                    <p>Logo</p>
                </div>
                <div className="hidden sm:flex gap-5  ">
                    <button className="flex items-center space-x-2 hover:text-blue-500">
                        <IoMdHome className="text-xl" />
                        <p>Home</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-500">
                        <PiExamFill className="text-xl" />
                        <p>Exams</p>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-500">
                        <BsCalendar2MinusFill className="text-xl" />
                        <p>Routine</p>
                    </button>

                </div>
                <div>
                    <p>Profile</p>
                </div>
            </div>
        </>
    )
}

export default NavBar;