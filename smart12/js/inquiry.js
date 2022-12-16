function selectAll(selectAll) {
  const checkboxes = document.getElementsByName("chk");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

let txt1 = document.getElementById("txt1");
let btn1 = document.getElementById("retrieve-btn");
let btn2 = document.getElementById("delete-btn");

btn1.addEventListener("mouseover", (event) => {
  btn1.style.backgroundColor = "#1A65A1";
});

btn1.addEventListener("mouseout", (event) => {
  btn1.style.backgroundColor = "#006FF2";
});

btn2.addEventListener("mouseover", (event) => {
  btn2.style.backgroundColor = "#1A65A1";
});

btn2.addEventListener("mouseout", (event) => {
  btn2.style.backgroundColor = "#006FF2";
});

txt1.addEventListener("keyup", (e) => {
  btnInable(e);
});

function btnInable(e) {
  if (txt1.value == "") {
    btn1.disabled = true;
    btn1.style.backgroundColor = "#BDBDCB";

    btn2.disabled = true;
    btn2.style.backgroundColor = "#BDBDCB";
  } else {
    btn1.disabled = false;
    btn1.style.backgroundColor = "rgb(0, 111, 242)";
  }
}

function Retrieve() {
  const target = document.getElementById("delete-btn");
  target.style.backgroundColor = "#006FF2";
  target.disabled = false;
}

function Close() {
  document.getElementById("modal-back").style.display = "none";
}

function Retrieve() {
  let userInfo = localStorage.getItem("userInfo").split(",");

  let retrieve = {
    COMPANY_CODE: userInfo[0],
    POL: $("input[name=Loading_Port]").val(),
    POD: $("input[name=Discahrging_Port]").val(),
    VVD: $("input[name=vvd]").val(),
    // POL: "CNSHA",
    // POD: "CNHKG",
    // VVD: "MV031012W",
  };

  $.ajax({
    type: "get",
    url: "http://192.168.219.101:5000/user/lastOrder",
    // data: JSON.stringify(retrieve),
    data: retrieve,
    dataType: "json",
    success: function (data) {
      let line = data.data;
      let h = [];
      for (let i = 0; i < line.length; i++) {
        console.log(line[i].POD);
        h.push('<tr class="inquiry_table_content">');
        h.push('<td><input class="chkbox" type="checkbox" name="chk" /></td>');
        h.push(`<td>${line[i].VVD}</td>`);
        h.push(`<td>${line[i].POL}</td>`);
        h.push(`<td>${line[i].POD}</td>`);
        h.push(`<td>${line[i].TY_SZ} x ${line[i].VOLUME}</td>`);
        let con_num = line[i].CONTAINER_NUM;
        h.push(`<td>${con_num}</td>`);
        h.push(`<td>${line[i].STATUS}</td>`);
        h.push(`<td>${line[i].CREATOR_ID}</td>`);
        h.push(`<td>${line[i].CREATED_TIME}</td>`);
        h.push("</tr>");
      }

      $("tbody").append(h.join(""));
    },
    error: function (error) {
      console.log(error);
    },
  });
}
