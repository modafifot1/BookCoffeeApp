export const convert2HistoryTime = (time) => {
  const now = Date.now();
  const date = new Date(time);
  const seconds = Math.round((now - date.getTime()) / 1000);
  const years = Math.floor(seconds / (3600 * 24 * 30 * 365));
  const months = Math.floor(seconds / (3600 * 24 * 30));
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds - minutes * 60;
  const displayTime =
    years !== 0
      ? `${years} năm`
      : months !== 0
      ? `${months} tháng`
      : days !== 0
      ? `${days} ngày`
      : hours !== 0
      ? `${hours} giờ`
      : `${minutes} phút ${remainSeconds} giây`;
  return displayTime + " trước";
};
