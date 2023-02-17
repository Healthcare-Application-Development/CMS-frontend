import React from "react";
import { Sidebar,Dropdown } from "../components";

function Doctor() {

  const hospitalList = {
    1 : "vivek",
    2 : "Vitals",
    3 : "Health",
    4 : "Medicine",
    5 : "Pharmacy"
  }

  return (
    <div className="flex items-center justify-start">
      <Sidebar />
      <div className="w-[85%] h-[100vh] overflow-hidden">
        <div className="w-[98%] h-[95%] flex flex-col">
          <div className="flex items-center mx-[33%]">
            <input
              type="text"
              placeholder="Search ABHA ID"
              className="bg-gray-600 text-white h-[42px] p-4 m-4 rounded-[20px] my-2"
            />
            <div className="bg-black p-2 w-14 flex items-center justify-center rounded-[20px]">
              <img src="/lens.png" alt="Search" className="cursor-pointer" />
            </div>
          </div>
          <div className="w-full h-[85%] shadow-lg mx-5 p-6">
            <form>
              <div className="flex justify-between">
                <h3>Choose Request Type</h3>
                <h3 className="text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg">
                  clear all
                </h3>
              </div>
              <div>
                <h3>Hospital</h3>
                <Dropdown Label="Choose Hospital" options={hospitalList}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
