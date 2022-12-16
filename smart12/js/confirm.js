function ReTrieve() {
    let userInfo = localStorage.getItem("userInfo").split(",");
    //console.log("user info : ", userInfo);
  
    let retrieve = {
      COMPANY_CODE: userInfo[0],
      // POL: $("input[name=Loading_Port]").val(),
      // POD: $("input[name=Discahrging_Port]").val(),
      // VVD: $("input[name=vvd]").val(),
      POL: "CNSHA",
      POD: "MYPKG",
      VVD: "MV031012W",
    };
  
    $.ajax({
      type: "get",
      url: "http://192.168.219.101:5000/user/confirm",
      // data: JSON.stringify(retrieve),
      data: retrieve,
      dataType: "json",
      success: function (data) {
        console.log(data);
        let confirm_data = data.confirm_data;
        let lastOrder_data = data.lastOrder_data;
        let h = [];
        for (let i = 0; i < confirm_data.length; i++) {
          let confirm_id = confirm_data[i].LASTORDER_ID;
          let dum = 0;
          for (let j = 0; j < lastOrder_data.length; j++) {
            if (lastOrder_data[i].ID === confirm_id) {
              dum = lastOrder_data[i];
              console.log("dum : ", dum);
              break;
            }
          }
          //let lastOrder_id = lastOrder_data[i].ID;
  
          h.push('<tr class="inquiry_table_content">');
          h.push(`<td>${confirm_data[i].POL}</td>`);
          h.push(`<td>${confirm_data[i].POD}</td>`);
          h.push('<td><input class="chkbox" type="checkbox" name="chk" /></td>');
          h.push(`<td>${confirm_data[i].TY_SZ}</td>`);
          h.push(`<td>${confirm_data[i].WGT}</td>`);
          h.push(`<td>${dum.VOLUME}</td>`); //Created Vol.
          h.push(`<td>${confirm_data[i].VOLUME}</td>`); //Occupied
          h.push(`<td>0</td>`);
          h.push(`<td>${dum.VOLUME - confirm_data[i].VOLUME}</td>`); //Created Vol. - Occupied = Remainde Vol.
          h.push(`<td>${confirm_data[i].STATUS}</td>`);
          h.push("</tr>");
        }
  
        $("table > tbody").append(h.join(""));
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
  