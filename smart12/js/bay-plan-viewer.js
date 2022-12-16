function selectAll(selectAll) {
  const checkboxes
    = document.getElementsByName('chk');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  })
}

let vvd = document.getElementById("vvd-input");
let port = document.getElementById("port-input");
let btn = document.getElementById("retrieve-btn");

vvd.addEventListener("keyup", e => {
  reTrieve(e)
})

port.addEventListener("keyup", e => {
  reTrieve(e)
})

function reTrieve(e) {
  btn.onclick = () => {
    if (vvd.value == '' || port.value == '') {
      document.getElementById("modal-back").style.display = "block";
    } else {
      document.getElementById("modal-back").style.display = "none";
    }
  }
}

function Close() {
  document.getElementById("modal-back").style.display = "none";
}