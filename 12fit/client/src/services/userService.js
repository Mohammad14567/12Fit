import api from "../utils/api";

export const getUsersWithPlans = (token) => {
  return api.get("/users/with-plans", {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const deleteUser = (userId, token) => {
  return api.delete(`/users/${userId}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const getRegisteredUsersCount = () => {
  return api.get("/users/count");
};

export const getOnlineUsersCount = () => {
  return api.get("/users/online");
};

export const checkApiStatus = () => {
  return api.get("/users/count");
};
