const catchAsync = require("../utils/catchAsync");

exports.getCountryEvents = catchAsync(async (req, res, next) => {
  const apiKey = process.env.TICKETMASTER_API_KEY;

  const countryCode = req.query.countryCode || "US";
  const keyword = req.query.keyword || "country";
  const city = req.query.city || "";
  const type = req.query.type || "";
  const size = req.query.size || 12;

  const buildUrl = (searchKeyword = "") => {
    let url =
      `https://app.ticketmaster.com/discovery/v2/events.json` +
      `?apikey=${apiKey}` +
      `&countryCode=${countryCode}` +
      `&classificationName=music` +
      `&sort=date,asc` +
      `&size=${size}`;

    if (searchKeyword) {
      url += `&keyword=${encodeURIComponent(searchKeyword)}`;
    }

    if (city) {
      url += `&city=${encodeURIComponent(city)}`;
    }

    return url;
  };

  const filterEventsByType = (events) => {
    if (type === "festival") {
      return events.filter((event) =>
        event.name?.toLowerCase().includes("festival")
      );
    }

    if (type === "concert") {
      return events.filter(
        (event) => !event.name?.toLowerCase().includes("festival")
      );
    }

    return events;
  };

  const fetchEvents = async (searchKeyword) => {
    const response = await fetch(buildUrl(searchKeyword));
    const data = await response.json();
    const events = data?._embedded?.events || [];
    return filterEventsByType(events);
  };

  let events = await fetchEvents(keyword);

  if (events.length === 0 && keyword.toLowerCase() !== "country") {
    events = await fetchEvents("country");
  }

  if (events.length === 0) {
    events = await fetchEvents("");
  }

  res.status(200).json({
    status: "success",
    data: events,
  });
});