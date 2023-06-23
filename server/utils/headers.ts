export const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});
