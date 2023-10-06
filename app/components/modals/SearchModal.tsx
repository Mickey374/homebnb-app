"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

//Define enum for filter steps
enum FILTER_STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(FILTER_STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== FILTER_STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    //If there are any query params, add them to the current query
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    //Check if the query has been updated, spread it
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount: guestCount,
      roomCount: roomCount,
      bathroomCount: bathroomCount,
    };

    // Check if date range has been updated, spread it
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    //Create final url
    const finalUrl = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    //Reset our Steps and clone Search modal
    setStep(FILTER_STEPS.LOCATION);
    searchModal.onClose();

    //Push the URL to the route
    router.push(finalUrl);
  }, [
    step,
    searchModal,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    router,
    params,
    onNext,
  ]);

  //Create the action labels for the Next and Back buttons
  const actionLabel = useMemo(() => {
    if (step === FILTER_STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === FILTER_STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do want to go?"
        subtitle="Find the perfect location..."
      />

      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />

      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  // Create the step for date
  if (step === FILTER_STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you want to go?"
          subtitle="Find the perfect date..."
        />

        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if(step === FILTER_STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place"/>

        <Counter 
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter 
          title="Rooms"
          subtitle="How many rooms do you want?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter 
          title="Bathrooms"
          subtitle="How many bathrooms do  you want?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === FILTER_STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
