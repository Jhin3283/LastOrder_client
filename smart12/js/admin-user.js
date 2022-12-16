function selectAll(selectAll) {
    const checkboxes 
         = document.getElementsByName('chk');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }