export class ServiceError extends Error {
  constructor(public message: string, public status: number = 500) {
    super(message);
    this.name = "ServiceError";
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response
): Error => {
  if (error instanceof ServiceError) {
    res.status(error.status).json({
      status: "error",
      message: error.message,
    });
  } else {
    console.error("Unexpected error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  return error;
};
