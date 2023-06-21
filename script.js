let table = document.getElementsByClassName("sheet-body")[0],
rows = document.getElementsByClassName("rows")[0],
columns = document.getElementsByClassName("columns")[0]
tableExists = false

const generateTable = () => {
    let rowsNumber = parseInt(rows.value), columnsNumber = parseInt(columns.value)
    table.innerHTML = ""
    for(let i=0; i<rowsNumber; i++){
        var tableRow = ""
        for(let j=0; j<columnsNumber; j++){
            tableRow += `<td contenteditable></td>`
        }
        table.innerHTML += tableRow
    }
    if(rowsNumber>0 && columnsNumber>0){
        tableExists = true
    }
    else{
        swal.fire({
            title: "Generation Failed!",
            text: "Cannot generate table with zero rows or columns!",
            icon: "error",
            //confirmButtonText: "close",
            showCancelButton: false,
            showConfirmButton: false,
            //showCloseButton: true,
            timer: 4000,
            allowOutsideClick: true,
          });
    }
}

const ExportToExcel = (type, fn, dl) => {
    if(!tableExists){
        swal.fire({
            title: "Export Failed!",
            text: "No table to Export!",
            icon: "error",
            //confirmButtonText: "close",
            showCancelButton: false,
            showConfirmButton: false,
            //showCloseButton: true,
            timer: 4000,
            allowOutsideClick: true,
          });
        return
    }
    var elt = table
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" })
    return dl ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
        : XLSX.writeFile(wb, fn || ('MyNewSheet.' + (type || 'xlsx')))
}

/*document.getElementById('generateBtn').addEventListener('click', function() {
    swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
      });
  });*/
