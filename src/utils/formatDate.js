function formatCreatedDate(createdDate) {
  const date = new Date(createdDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

//YYYY-MM-DD
const formatFilterDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export { formatCreatedDate, formatFilterDate };
