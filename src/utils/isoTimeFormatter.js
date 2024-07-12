const isoTimeFormatter = (createdAt) => {
  const date = new Date(createdAt);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };

  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};

export default isoTimeFormatter;
