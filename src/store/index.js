import { createStore } from "vuex";

export default createStore({
  state: {
    url: "https://dummyjson.com/products/?limit=100",
  },
  actions: {
    apiTheNewests(content, value) {
      return fetch(content.state.url)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          let productLength = response.products.length / 10;
          let productCard = response.products.filter((element) => {
            if (element.id <= value * 10 && element.id > value * 10 - 10) {
              return element;
            }
          });
          return {
            productLength,
            productCard,
          };
        });
    },

    apiPriceLowToHigh(content, value) {
      return fetch(content.state.url)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.products.sort(
            (a, b) => a.price - b.price
          )
        })
        .then((response) => {
          let productLength = response.length / 10;
          let productCard = response.filter((element, index) => {
            if (index + 1 <= value * 10 && index + 1 > value * 10 - 10) {
              return element;
            }
          });
          return {
            productLength,
            productCard,
          };
        });
    },

    apiPriceHighToLow(content, value) {
      return fetch(content.state.url)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.products.sort(
            (a, b) => b.price - a.price
          );
        })
        .then((response) => {
          let productLength = response.length / 10;
          let productCard = response.filter((element, index) => {
            if (index + 1 <= value * 10 && index + 1 > value * 10 - 10) {
              return element;
            }
          });
          return {
            productLength,
            productCard,
          };
        });
    },
  },
});
