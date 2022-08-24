function Service() {
  this.arr = [];
  this.getData = function () {
    return axios({
      url: "https://6304ba58761a3bce77ee4644.mockapi.io/ourteacher",
      method: "GET",
    });
  };
}
