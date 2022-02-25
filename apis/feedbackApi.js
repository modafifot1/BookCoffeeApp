import { axiosClient } from "./axiosClient";
export const feedbackApi = {
  addFeedback(data) {
    return axiosClient.post("/feedbacks", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
