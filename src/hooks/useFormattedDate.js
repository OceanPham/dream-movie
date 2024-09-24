export const useFormattedDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const timeReFormat = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} | ${hours}:${minutes}`
}

export const timeReFormatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`
}

export const removeHtmlTags = (htmlString) => {
  // Create a new DOMParser instance
  const parser = new DOMParser();
  // Parse the HTML string into a document
  const doc = parser.parseFromString(htmlString, 'text/html');
  // Return the text content of the parsed document
  return doc.body.textContent || "";
};
