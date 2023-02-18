import React, {useState} from "react";
import { Dropdown, SearchBar, Button } from "../../components";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

function RequestConsent() {
  const hospitalList = {
    1: "vivek",
    2: "Vitals",
    3: "Health",
    4: "Medicine",
    5: "Pharmacy",
  };

  const recordTypes = {
    1: "Blood Report",
    2: "X-ray",
    3: "MRI Scanning",
    4: "General Observations",
    5: "Medicines",
  };
  const [dateSelection, setDateSelection] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  return (
    <div className="w-[98%] h-[95%] flex flex-col">
      <SearchBar />
      <div className="w-full h-[85%] shadow-lg mx-5 p-6">
        <div className="flex justify-between">
          <h3>Choose Request Type</h3>
          <h3 className="text-blue-600 hover:text-blue-800 hover:bg-blue-300 transition-all p-1 rounded-lg">
            clear all
          </h3>
        </div>
        <div className="flex bg-slate-300 h-[512px] justify-around p-11 rounded-sm border-x-slate-900">
          <div className="flex flex-col">
            <Dropdown Label="Choose Hospital" options={hospitalList} />
            <Dropdown Label="Health Record Category" options={recordTypes} />
          </div>
          <div>
            <h3>Date Range</h3>
            <DateRangePicker
              editableDateInputs={true}
              onChange={item => {
                console.log(item);
                return setDateSelection([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateSelection}
            />
            ;
          </div>
        </div>
        <div className="flex gap-4 w-full items-center justify-center m-11">
          <Button txt="Add Request" color="green" />
          <Button txt="Send Request" color="green" />
          <Button txt="Send OTP" color="green" />
        </div>
        <div className="bg-slate-200 rounded-sm ">currentRequest</div>
      </div>
    </div>
  );
}

export default RequestConsent;
