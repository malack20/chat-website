export const logger = {
  info: (message: string, meta?: any) => {
    console.log(message, meta || "");
  },
  error: (message: string, meta?: any) => {
    console.error(message, meta || "");
  }
};






