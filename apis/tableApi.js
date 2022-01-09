import { axiosClient } from ".";

export const tableApi = {
  getTableLst() {
    return axiosClient.get("/tables");
  },
  subcribeTable(tableIds) {
    return axiosClient.post(
      "/tables",
      { tableIds },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
