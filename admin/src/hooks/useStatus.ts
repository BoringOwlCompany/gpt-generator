import { useState } from "react";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export const useStatus = () => {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [statusMessage, setStatusMessage] = useState("");

  const isLoading = status === Status.LOADING;
  const isError = status === Status.ERROR;
  const isSuccess = status === Status.SUCCESS;
  const isIdle = status === Status.IDLE;

  return { isIdle, isLoading, isSuccess, isError, setStatus, Status, statusMessage, setStatusMessage };
};
