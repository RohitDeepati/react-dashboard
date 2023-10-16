// export const getOrders = () => {
//   return fetch("https://dummyjson.com/carts/1")
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// };

// export const getRevenue = () => {
//   return fetch("https://dummyjson.com/carts")
//     .then((res) => res.json())
//     .then(console.log);
// };

export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
