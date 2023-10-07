"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { BiSearch } from "react-icons/bi";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  //Get individual fields params
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  //Define location label to replace search filters
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  //Define duration label to replace search filters
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff <= 0) {
        diff = 1;
      }
      return `${diff} days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  //Define guest count label to replace search filters
  const guestCountLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 flex-1 text-center border-x-[1px]">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestCountLabel}</div>
          <div className="p-2 bg-violet-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
