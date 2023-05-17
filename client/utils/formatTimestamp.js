export default function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year.toString()}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  const formattedTimestamp = `${formattedDate}-${formattedTime}`;

  return formattedTimestamp;
}
