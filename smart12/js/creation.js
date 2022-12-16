// const { split } = require("lodash");

/* function count(type) {
    // 결과를 표시할 element
    const resultElement = document.getElementById('count');

    // 현재 화면에 표시된 값
    let number = resultElement.innerText;

    // 더하기/빼기
    if (type === 'plus') {
        number = parseInt(number) + 1;
        if (number == 2) {
            document.getElementById("con2").style.display = 'block';
        } else if (number == 3) {
            document.getElementById("con3").style.display = 'block';
        } else if (number == 4) {
            document.getElementById("con4").style.display = 'block';
        } else if (number == 5) {
            alert("더 이상 추가할 수 없습니다.");
            number = parseInt(number) - 1;
        }
    } else if (type === 'minus') {
        number = parseInt(number) - 1;
        if (number == 3) {
            document.getElementById("con4").style.display = 'none';
        } else if (number == 2) {
            document.getElementById("con3").style.display = 'none';
        } else if (number == 1) {
            document.getElementById("con2").style.display = 'none';
        } else if (number == 0) {
            alert("최소 1개 이상 컨테이너가 존재해야합니다.");
            number = parseInt(number) + 1;
        }
    }
    resultElement.innerText = number;
} */
const resultElement = $("#count");
let number = resultElement.text();

console.log(localStorage.getItem("userInfo"));
let dummy = localStorage.getItem("userInfo").split(",");
console.log(dummy);

$("#plus").on("click", function () {
  number = parseInt(number) + 1;
  resultElement.html(number);
  if (number == 2) {
    $("#con2").css("display", "block");
  } else if (number == 3) {
    $("#con3").css("display", "block");
  } else if (number == 4) {
    $("#con4").css("display", "block");
  } else if (number == 5) {
    alert("더 이상 추가할 수 없습니다.");
    number = parseInt(number) - 1;
    resultElement.html(number);
  }
});

$("#minus").on("click", function () {
  number = parseInt(number) - 1;
  resultElement.html(number);
  if (number == 3) {
    $("#con4").css("display", "none");
  } else if (number == 2) {
    $("#con3").css("display", "none");
  } else if (number == 1) {
    $("#con2").css("display", "none");
  } else if (number == 0) {
    alert("최소 1개 이상 컨테이너가 존재해야합니다.");
    number = parseInt(number) + 1;
    resultElement.html(number);
  }
});

function Reset() {
  location.replace("creation.html");
}

function activeGoBtn() {
  console.log("save");
  const target = document.getElementById("go-btn");
  target.style.backgroundColor = "#006FF2";
  target.disabled = false;

  let userInfo = localStorage.getItem("userInfo");
  let dum = userInfo.split(",");

  let creation = {
    COMPANY_CODE: dum[0],
    CREATOR_ID: dum[1],
    POL: $("input[name=pol_code]").val(),
    POD: $("input[name=pod_code]").val(),
    WGT: $("input[name=WGT]").val(),
    VOLUME: $("#count").html(),
    CONTAINER_NUM:
      $("input[name=con1]").val() +
      "," +
      $("input[name=con2]").val() +
      "," +
      $("input[name=con3]").val() +
      "," +
      $("input[name=con4]").val(),
    SHIPPER_CODE: $("input[name=shipper_code]").val(),
    VVD: $("input[name=vessel_code]").val() + $("input[name=vvd]").val(),
    STATUS: $("input[name=shipper_code]").val(),
    TY_SZ: $("select[name=TY]").val() + $("select[name=SZ]").val(),
  };

  $.ajax({
    crossorigin: true,
    type: "post",
    url: "http://192.168.219.101:5000/user/lastOrder",
    // data: JSON.stringify(creation),
    data: creation,
    dataType: "text",
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function GoBtn() {
  console.log("1");
  location.href = "analysis.html";
}

let txt1 = document.getElementById("required1");
let txt2 = document.getElementById("required2");
let txt3 = document.getElementById("required3");
let txt4 = document.getElementById("required4");
let txt5 = document.getElementById("required5");
let savebtn = document.getElementById("save-btn");
let gobtn = document.getElementById("go-btn");

savebtn.addEventListener("mouseover", (event) => {
  savebtn.style.backgroundColor = "#1A65A1";
});

savebtn.addEventListener("mouseout", (event) => {
  savebtn.style.backgroundColor = "#006FF2";
});

gobtn.addEventListener("mouseover", (event) => {
  gobtn.style.backgroundColor = "#1A65A1";
});

gobtn.addEventListener("mouseout", (event) => {
  gobtn.style.backgroundColor = "#006FF2";
});

txt1.addEventListener("keyup", (e) => {
  btnInable(e);
});

txt2.addEventListener("keyup", (e) => {
  btnInable(e);
});

txt3.addEventListener("keyup", (e) => {
  btnInable(e);
});

txt4.addEventListener("keyup", (e) => {
  btnInable(e);
});

txt5.addEventListener("keyup", (e) => {
  btnInable(e);
});

function btnInable(e) {
  if (
    txt1.value == "" ||
    txt2.value == "" ||
    txt3.value == "" ||
    txt4.value == "" ||
    txt5.value == ""
  ) {
    savebtn.disabled = true;
    savebtn.style.backgroundColor = "#BDBDCB";

    gobtn.disabled = true;
    gobtn.style.backgroundColor = "#BDBDCB";
  } else {
    savebtn.disabled = false;
    savebtn.style.backgroundColor = "rgb(0, 111, 242)";
  }
}
