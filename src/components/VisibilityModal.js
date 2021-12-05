import React, { useState, useEffect } from "react";
import axios from "axios";

const VisibilityModal = ({ showHandler, sat }) => {
  const [visibility, setVisibility] = useState({});
  const [location, setLocation] = useState({});
  const [elevation, setElevation] = useState({});

  const baseUrlAlt = " https://api.open-elevation.com/api/v1/lookup?locations=";
  const baseUrlAlanApi =
    "https://alanyu108-satellite-backend.herokuapp.com/api/satellite-visible/";
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({ lat: pos.coords.latitude, long: pos.coords.longitude }),
      (error) => console.warn(`ERROR(${error.code}): ${error.message}`)
    );
    axios
      .get(`${baseUrlAlt}${location.lat},${location.long}`)
      .then((res) => setElevation({ elevation: res.data.results[0].elevation }))
      .then((data) => console.log(data));

    axios
      .post(baseUrlAlanApi, {
        name: sat.name,
        longitude: location.long,
        latitude: location.lat,
        altitude: elevation.elevation,
      })
      .then((res) => setVisibility(res.data));
  }, [location.lat, location.long, sat.name, elevation.elevation]);
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute opacity-100 inset-0 z-0"></div>
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4 ">
              {sat.name} Visibility Information
            </h2>
            <p className="text-sm text-gray-500 px-8">
              {!visibility.visible &&
                `${sat.name} is not currently visible at your location`}
              {visibility.visible &&
                `${sat.name} is currently visible at your location for ${
                  visibility.duration / 60
                } minutes \n The best viewing time is past midnight`}
            </p>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => showHandler(false)}
              className="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityModal;
