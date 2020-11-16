export const getToken = (ctx) => {
  // Extract token from server
  const token = ctx.req.headers.cookie
    ? ctx.req.headers.cookie.split(" ")[1].replace("token=", "")
    : undefined;

  return token;
};
