function Service() {
  this.getList = function () {
    return axios({
      url: "https://62ff797734344b6431fa3c2c.mockapi.io/api/QLTT",
      method: "GET",
    });
  };
  this.deleteInfo = function (id) {
    return axios({
      url: `https://62ff797734344b6431fa3c2c.mockapi.io/api/QLTT/${id}`,
      method: "DELETE",
    });
  };
  this.addToList = function (list) {
    return axios({
      url: "https://62ff797734344b6431fa3c2c.mockapi.io/api/QLTT",
      method: "POST",
      data: list,
    });
  };
  this.getFromListById = function (id) {
    return axios({
      url: `https://62ff797734344b6431fa3c2c.mockapi.io/api/QLTT/${id}`,
      method: "GET",
    });
  };
  this.updateToList = function (product) {
    return axios({
      url: `https://62ff797734344b6431fa3c2c.mockapi.io/api/QLTT/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
