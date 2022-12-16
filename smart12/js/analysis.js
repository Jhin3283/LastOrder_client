function selectAll(selectAll) {
  const checkboxes = document.getElementsByName("chk");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

function Reset() {
  location.replace("analysis.html");
}

function retrive_renderTable() {
  let userInfo = localStorage.getItem("userInfo").split(",");
  console.log(userInfo);

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

      $("#table1 > tbody").append(h.join(""));
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function analysis_renderTable() {
  let userInfo = localStorage.getItem("userInfo").split(",");
  //console.log(userInfo);

  let retrieve = {
    COMPANY_CODE: userInfo[0],
    // POL: $("input[name=Loading_Port]").val(),
    // POD: $("input[name=Discahrging_Port]").val(),
    // VVD: $("input[name=vvd]").val(),
    POL: "CNSHA",
    POD: "CNHKG",
    VVD: "MV031012W",
  };

  $.ajax({
    type: "get",
    url: "http://192.168.219.101:5000/user/analysis",
    // data: JSON.stringify(retrieve),
    data: retrieve,
    dataType: "json",
    success: function (data) {
      let line = data.data;
      console.log(line);
      let h = [];
      for (let i = 0; i < line.length; i++) {
        h.push('<tr class="inquiry_table_content">');
        h.push(`<td>${line[i].VVD}</td>`);
        h.push(`<td>${line[i].POL}</td>`);
        h.push(`<td>${line[i].POD}</td>`);
        h.push(`<td>${line[i].CONTAINER_NUM} ${line[i].TY_SZ}</td>`);

        h.push(`<td>${line[i].WGT}</td>`);
        h.push(`<td>${line[i].VOLUME}</td>`);
        h.push("</tr>");
      }

      $("#table2 > tbody").append(h.join(""));
    },
    error: function (error) {
      console.log(error);
    },
  });
}
