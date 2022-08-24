var service = new Service();
var validation = new Validation();

var listItems = [];

function getEle(id) {
  return document.getElementById(id);
}

//nhận thông tin từ sever
function fetchData() {
  service
    .getList()
    .then(function (result) {
      renderTable(result.data);

      listItems = result.data;
      console.log(listItems, "ssss");
    })
    .catch(function (error) {
      console.log(error);
    });
}
fetchData();

//in thông tin ra table
function renderTable(data) {
  var content = ``;

  data.forEach(function (product, index) {
    content += `
      <tr>
          <td>${index + 1}</td>
          <td>${product.taiKhoan}</td>
          <td>${product.matKhau}</td>
          <td>${product.hoTen}</td>
          <td>${product.email}</td>
          <td>${product.ngonNgu}</td>
          <td>${product.phanLoai}</td>
          <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editInfo(${
              product.id
            })">Edit</button>

            <button class="btn btn-danger" onclick="deleteProduct(${
              product.id
            })">Delete</button>
          </td>
      </tr>
  `;
  });

  getEle("tblDanhSachNguoiDung").innerHTML = content;
}
//delete sản phẩm
function deleteProduct(id) {
  service
    .deleteInfo(id)
    .then(function () {
      //render list data
      fetchData();
    })
    .catch(function (error) {
      console.log(error);
    });
}
//tạo nút add + thay đổi tiêu đề
getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementsByClassName("modal-header")[0].innerHTML =
    "Thêm sinh viên";
  var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

//add thành viên
function addProduct(isAdd) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var phanLoai = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;
  //   //kiem tra tai khoan
  isValid &=
    validation.kiemTraRong(taiKhoan, "tbTK", "(*) Vui long nhap tai khoan") &&
    validation.checkTaiKhoanTonTai(
      taiKhoan,
      "tbTK",
      "(*) tai khoan da ton tai",
      listItems
    );

  //   //kiem tra ho ten
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(hoTen, "tbHoTen", "(*) Vui long nhap hoTen") &&
      validation.kiemTraKiTuChuoi(
        hoTen,
        "tbHoTen",
        "(*) Vui long nhap dung ten"
      );
  }
  //   //kiem tra mat khau
  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Vui long nhap matKhau") &&
    validation.kiemTraPass(matKhau, "tbMatKhau", "(*) Vui long nhap matKhau");
  //   //kiem tra mail
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui long nhap email") &&
    validation.checkEmail(email, "tbEmail", "(*) Vui long nhap email");
  //   //kiem tra hinh anh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*) Vui long nhap hinhAnh"
  );
  //kiem tra nguoi dung
  isValid &= validation.checkSelect(
    "loaiNguoiDung",
    "tbPhanLoai",
    "Vui long chon chuc vu"
  );
  //kiem tra ngon ngu
  isValid &= validation.checkSelect(
    "loaiNgonNgu",
    "tbNgonNgu",
    "Vui long chon chuc vu"
  );
  //kiem tra mo ta
  isValid &= validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui long nhap moTa");
  if (!isValid) {
    return null;
  }
  var doiTuong = new ObjectInfo(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    phanLoai,
    ngonNgu,
    moTa
  );
  service
    .addToList(doiTuong)
    .then(function () {
      fetchData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function editInfo(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Update SP";
  var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;
  service
    .getFromListById(id)
    .then(function (result) {
      //show thông ra các thẻ input
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("TaiKhoan").disabled = true;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.phanLoai;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateProduct(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var phanLoai = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var object = new ObjectInfo(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    phanLoai,
    ngonNgu,
    moTa
  );

  service
    .updateToList(object)
    .then(function () {
      fetchData();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
