var service = new Service();

function getEle(id) {
  return document.getElementById(id);
}

function getData() {
  service
    .getData()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getData();
function renderHTML(data) {
  var content = ``;

  data.forEach(function (product) {
    if (product.loaiND === "GV") {
      content += `
    <div class="col-3 about-item-container">
    <div class="about-item">
      <div class="about-item-img">
      <img src="./images/${product.hinhAnh}" alt="" /> 
      </div>
      <div class="about-item-text">
        <i>${product.ngonNgu} </i>
        <h3>${product.hoTen}</h3>
        <p>
          ${product.moTa}
        </p>
      </div>
    </div>
  </div>`;
    }
  });

  getEle("showGV").innerHTML = content;
}
