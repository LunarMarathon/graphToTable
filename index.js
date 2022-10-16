let tableArr = [
  ["Fruits", "Mango", "Apple", "Banana"],
  ["Mango", "Fruits"],
  ["Apple", "Fruits"],
  ["Banana", "Fruits"],
  ["Oceans", "Arctic", "Atlantic", "Pacific", "Indian", "Southern"],
  ["Arctic", "Oceans"],
  ["Atlantic", "Oceans"],
  ["Pacific", "Oceans"],
  ["Indian", "Oceans"],
  ["Southern", "Oceans"],
];

var link;

//Clearing screen/container code
function clearTable() {
  let divContainer = document.getElementById("container");
  divContainer.innerHTML = "";
  //Remove styling to container
  divContainer.classList.remove("dynCont");
}
//----------------------------------------------------------------

//Clear input text code
function clearText() {
  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");
  input1.value = "";
  input2.value = "";
}
//----------------------------------------------------------------

//Autocomplete code
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    // console.log(a, b, i, val)
    // So that dude used this trick eh?>>>>>>>>>>>

    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i][0].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML =
          "<strong>" + arr[i][0].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i][0].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i][0] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
//----------------------------------------------------------------

//Code for creating the table
function createTable() {
  // Alert message code starts
  var showalert = document.getElementById("showalert");
  if (input1.value.length == 0 || input2.value.length == 0) {
    showalert.classList.remove("hide");
    showalert.classList.add("showalert");
    return 0;
  }
  // Alert messgae code ends
  //----------------------------------------------------------------

  autocomplete(document.getElementById("input1"), tableArr);
  autocomplete(document.getElementById("input2"), tableArr);
  let key = document.getElementById("input1").value;
  let links = document.getElementById("input2").value;

  let link = [];
  let word = "";

  for (let i = 0; i < links.length; i++) {
    if (links[i] != "," && links[i] != " ") {
      word += links[i];
    }
    if (links[i] === "," || i === links.length - 1) {
      link.push(word);
      word = "";
    }
  }

  // console.log(link);

  // let tabValue = []
  // Check if the key already exists and append that row instead of creating a new row
  for (let i = 0; i < link.length; i++) {
    let exists = tableArr.find((el) => el[0] === key);
    if (exists) {
      exists[exists.length] = link[i];
    } else {
      tableArr.push([key, link[i]]);
      // console.log(tableArr)
    }

    //Do the same if link exists since link as a new row too
    let existsL = tableArr.find((el) => el[0] === link[i]);
    if (existsL) {
      existsL[existsL.length] = key;
    } else {
      tableArr.push([link[i], key]);
      // console.log(tableArr)
    }
  }

  // tabValue.push(key)
  // tabValue.push(link)
  // console.log(tabValue)
  // tableArr.push(tabValue)

  let table = document.createElement("table"); //iterate over every array(row) within tableArr
  for (let row of tableArr) {
    //Insert a new row element into the table element
    let newRow = table.insertRow(); //Iterate over every index(cell) in each array(row)
    newRow.id = row[0];
    // console.log(newRow.id)
    for (let cell of row) {
      //While iterating over the index(cell)
      //insert a cell into the table element
      let newCell = table.rows[table.rows.length - 1].insertCell(); //add text to the created cell element
      newCell.innerHTML = `<div class="cell"><input type="checkbox"><label><a href="#" class="linkrow">${cell}</a></label></div>`;
    }
  }
  //append the compiled table to the DOM
  let divContainer = document.getElementById("container");
  divContainer.appendChild(table);
  // document.body.appendChild(table);

  //Add styling to container
  divContainer.classList.add("dynCont");

  // Code to scroll down to particular row>>>>>>>>>>>>>>>>>>>>>>>
  link = $(".linkrow");
  // console.log(link)
  link.click(function (e) {
    e.preventDefault();
    // console.log('clicked');
    var rowVal = $(this)[0].innerHTML,
      row;
    // console.log(rowVal)

    row = $("#" + rowVal);
    // console.log(row)
    if (row.length) {
      // console.log(row.offset().top);
      // console.log(document.documentElement.scrollHeight / 2);
      let y = row.offset().top;
      // console.log(y)
      $(window).scrollTop(y);
    }
  });
  //----------------------------------------------------------------
}
//----------------------------------------------------------------
// to close the alert badge starts
function closethealert() {
  var showalert = document.getElementById("showalert");

  showalert.classList.remove("showalert");
  showalert.classList.add("hide");
}
// to close the alert badge ends
//----------------------------------------------------------------

//Search table code
function searchTable() {
  autocomplete(document.getElementById("input1"), tableArr);
  let key = document.getElementById("input1").value;
  // alert("within search")
  let exists = tableArr.find((el) => el[0] === key);
  let table2 = document.createElement("table"); //iterate over every array(row) within tableArr
  let noRow = document.createElement("h3");

  if (exists) {
    // alert("within if")
    // let table2 = document.createElement('table');//iterate over every array(row) within tableArr
    //Insert a new row element into the table element
    table2.insertRow(); //Iterate over every index(cell) in each array(row)
    for (let cell of exists) {
      //While iterating over the index(cell)
      //insert a cell into the table element
      // alert(exists)
      let newCell = table2.rows[table2.rows.length - 1].insertCell(); //add text to the created cell element
      // alert(newCell)
      newCell.innerHTML = `<div class="cell"><input type="checkbox">${cell}</input><div>`;
      let divContainer = document.getElementById("container");
      // alert(table)
      divContainer.appendChild(table2);
      //Add styling to container
      divContainer.classList.add("dynCont");
    }
  } else {
    // let noRow = document.createElement('h3');
    noRow.textContent = "Row does not exist~";
    let divContainer = document.getElementById("container");
    // alert(table)
    divContainer.appendChild(noRow);
    //Add styling to container
    divContainer.classList.add("dynCont");
  }
  //append the compiled table to the DOM
  // document.body.appendChild(table);
}
//----------------------------------------------------------------

//Download CSV code
function htmlToCSV(html, filename) {
  //alert("Inside htmlToCSV")
  var data = [];
  var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    }

    data.push(row.join(","));
  }
  downloadCSVFile(data.join("\n"), filename);
}

function downloadCSVFile(csv, filename) {
  var csv_file, download_link;
  csv_file = new Blob([csv], { type: "text/csv" });
  download_link = document.createElement("a");
  download_link.download = filename;
  download_link.href = window.URL.createObjectURL(csv_file);
  download_link.style.display = "none";
  document.body.appendChild(download_link);
  download_link.click();
}

function downloadFunc() {
  //alert("Inside event listener")
  var html = document.querySelector("table").outerHTML;
  htmlToCSV(html, "graphToTable.csv");
}
//----------------------------------------------------------------

//Top button code c
const toTop = document.querySelector(".goTo-top-btn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});
//----------------------------------------------------------------

//Dark mode c
window.addEventListener(
  "storage",
  function () {
    if (localStorage.lightMode == "dark") {
      app.setAttribute("light-mode", "dark");
    } else {
      app.setAttribute("light-mode", "light");
    }
  },
  false
);
var app = document.getElementsByTagName("BODY")[0];
if (localStorage.lightMode == "dark") {
  app.setAttribute("light-mode", "dark");
}

function toggle_light_mode() {
  var app = document.getElementsByTagName("BODY")[0];
  if (localStorage.lightMode == "dark") {
    localStorage.lightMode = "light";
    app.setAttribute("light-mode", "light");
  } else {
    localStorage.lightMode = "dark";
    app.setAttribute("light-mode", "dark");
  }
}
//----------------------------------------------------------------

//sorting the table by minimum number of nodes
function sortTableMin() {
  tableArr.sort(function (a, b) {
    if (a.length == b.length) {
      return 0;
    }
    return a.length < b.length ? -1 : 1;
  });

  generateTable();
}
//----------------------------------------------------------------

//sorting the table by maximum number of nodes
function sortTableMax() {
  tableArr.sort(function (a, b) {
    if (a.length == b.length) {
      return 0;
    }
    return a.length > b.length ? -1 : 1;
  });

  generateTable();
}
//----------------------------------------------------------------

function generateTable() {
  let table = document.createElement("table"); //iterate over every array(row) within tableArr
  for (let row of tableArr) {
    //Insert a new row element into the table element
    let newRow = table.insertRow(); //Iterate over every index(cell) in each array(row)
    newRow.id = row[0];
    // console.log(newRow.id)
    for (let cell of row) {
      //While iterating over the index(cell)
      //insert a cell into the table element
      let newCell = table.rows[table.rows.length - 1].insertCell(); //add text to the created cell element
      newCell.innerHTML = `<div class="cell"><input type="checkbox"><label><a href="#" class="linkrow">${cell}</a></label></div>`;
    }
  }
  //append the compiled table to the DOM
  let divContainer = document.getElementById("container");
  divContainer.appendChild(table);
  // document.body.appendChild(table);

  //Add styling to container
  divContainer.classList.add("dynCont");

  // Code to scroll down to particular row - Sort-scroll fix>>>>>>>
  link = $(".linkrow");
  // console.log(link)
  link.click(function (e) {
    e.preventDefault();
    // console.log('clicked');
    var rowVal = $(this)[0].innerHTML,
      row;
    // console.log(rowVal)

    row = $("#" + rowVal);
    // console.log(row)
    if (row.length) {
      // console.log(row.offset().top);
      // console.log(document.documentElement.scrollHeight / 2);
      let y = row.offset().top;
      // console.log(y)
      $(window).scrollTop(y);
    }
  });
  //----------------------------------------------------------------
}
