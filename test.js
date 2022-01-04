const feedback = {
  _id: "60a63775ee375d0015b91b3d",
  userId: "6076b2ecf8402efee33463c9",
  userName: "Tiến Ngô Văn",
  avataUrl:
    "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
  content: "Nước bổ dưỡng",
  numOfStars: 5,
  createAt: "2021-12-20T14:18:29.902Z",
  reply: [
    {
      _id: "61290c3f8d975c00168225b7",
      userName: "Admin Do an CNPM",
      content: "Cám ơn tiến đã ủng hộ!",
      createAt: "2021-08-27T16:01:03.952Z",
    },
    {
      _id: "61298a315b6609001683fafd",
      userName: "Admin Do an CNPM",
      content: "Cam on ban",
      createAt: "2021-08-28T00:58:25.203Z",
    },
  ],
};
const convert2HistoryTime = (time) => {
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

const now = Date.now();
const date = new Date(feedback.createAt);
