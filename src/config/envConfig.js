export const imgUrl = "http://13.50.247.46/";
export const url = `${imgUrl}api/`;

const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
export const wsUrl = `${wsProtocol}://${new URL(imgUrl).host}`;
export const getBaseUrl = () => url;
export const getImageBaseUrl = () => imgUrl;
export const getWsBaseUrl = () => wsUrl;
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const base = imgUrl.replace(/\/+$/, "");
  const path = imagePath.replace(/^\/+/, "");
  const finalUrl = `${base}/${path}`;

  return finalUrl;
};
