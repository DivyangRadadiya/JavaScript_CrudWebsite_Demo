var countryObj = {
  USA: {
    California: ["Los Angeles", "San Diego", "Sacramento"],
    Texas: ["Houston", "Austin"],
    Florida: ["Miami", "Orlando", "Tampa"],
  },
  Australia: {
    SouthAustralia: ["Dunstan", "Mitchell"],
    Victoria: ["Altona", "Euroa"],
  },
  India: {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Gujarat: ["Ahmedabad", "Rajkot", "Surat"],
    TamilNadu: ["Chennai", "Madurai"],
    Karnataka: ["Bangalore", "Mangalore"],
  },
  Canada: {
    Alberta: ["Calgary", "Edmonton", "Red Deer"],
    BritishColumbia: ["Vancouver", "Kelowna"],
  },
};
var country = "";
var employeeId = "";
var deleteId = "";
var employeeList = [];
var Edit = false;
window.onload = () => {
  // employeeList = JSON.parse(localStorage.getItem("employeeList"));
  // console.log(employeeList);
  // if (employeeList == null) {
  //   employeeList = [];
  // }
  let _Cookies = getCookie("employeeList");
  console.log(_Cookies);
  if (_Cookies) {
    let tempData = JSON.parse(_Cookies);
    employeeList = tempData;
  } else {
    employeeList = [];
  }
  displayRecord();
  var countryName = document.getElementById("countryName");
  var country = Object.keys(countryObj);
  country.map((ele) => {
    countryName.innerHTML += "<option>" + ele + "</option>";
  });
};

function getState(e) {
  var stateName = document.getElementById("stateName");
  stateName.innerHTML =
    " <option value='' selected='selected' >Select State</option>";
  var cityName = document.getElementById("cityName");
  cityName.innerHTML =
    " <option value='' selected='selected' >Select City</option>";
  country = e.target.value;
  if (country) {
    var state = Object.keys(countryObj[country]);
    state.map((ele) => {
      stateName.innerHTML += "<option>" + ele + "</option>";
    });
  }
}

function getCity(e) {
  var cityName = document.getElementById("cityName");
  cityName.innerHTML =
    " <option value='' selected='selected' >Select City</option>";
  state = e.target.value;
  if (state) {
    var city = countryObj[country][state];
    city.map((ele) => {
      cityName.innerHTML += "<option>" + ele + "</option>";
    });
  }
}

function insertRecord() {
  if (ValidationForm()) {
  const maxId = Math.max.apply(
    Math,
    employeeList.map((val) => {
      return val.id;
    })
  );

  var formData = {};
  formData.id = maxId == -Infinity || maxId == NaN ? 1 : maxId + 1;
  var displayDate = getDate();
  var displayCheckboxValue = getCheckboxValue();
  formData.FirstName = document.getElementById("firstName").value;
  formData.MiddleName = document.getElementById("middleName").value;
  formData.LastName = document.getElementById("lastName").value;
  formData.DateOfBirth = displayDate;
  formData.Gender = document.forms.RegForm.gender.value;
  formData.Country = document.getElementById("countryName").value;
  formData.State = document.getElementById("stateName").value;
  formData.City = document.getElementById("cityName").value;
  formData.IsMarried = displayCheckboxValue;
  pushData(formData);
  }
}

function ValidationForm() {
  var firstName = document.getElementById("firstName");
  if (firstName.value == "") {
    window.alert("Please enter your firstName.");
    firstName.focus();
    return false;
  }

  var middleName = document.getElementById("middleName");
  if (middleName.value == "") {
    window.alert("Please enter your middleName.");
    middleName.focus();
    return false;
  }

  var lastName = document.getElementById("lastName");
  if (lastName.value == "") {
    window.alert("Please enter your lastName.");
    lastName.focus();
    return false;
  }

  var birthday = document.getElementById("birth-date");
  if (birthday.value == "") {
    window.alert("Please enter your Birthday.");
    birthday.focus();
    return false;
  }

  var genderValue = document.getElementsByName("gender");
  if (!(genderValue[0].checked || genderValue[1].checked)) {
    window.alert("Please Select Your Gender");
    return false;
  }

  var countryName = document.getElementById("countryName");
  if (countryName.value == "") {
    window.alert("Please select your Country.");
    countryName.focus();
    return false;
  }
  var stateName = document.getElementById("stateName");
  if (stateName.value == "") {
    window.alert("Please select your State.");
    stateName.focus();
    return false;
  }
  var cityName = document.getElementById("cityName");
  if (cityName.value == "") {
    window.alert("Please select your City .");
    cityName.focus();
    return false;
  }

  return true;
}

function getDate() {
  var date = document.getElementById("birth-date").value;
  var today = new Date(date);
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var newDate = mm + "/" + dd + "/" + yyyy;
  return newDate;
}

function getNewDate(date) {
  var today = new Date(date);
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var newDate = yyyy + "-" + mm + "-" + dd;
  return newDate;
}

function displaychecktRadiovalue() {
  var genderValue = document.getElementsByName("gender");
  for (i = 0; i < genderValue.length; i++) {
    for (var i = 0; i < genderValue.length; i++) genderValue[i].checked = false;
  }
}

function getCheckboxValue() {
  var checkValue = document.getElementById("Checkbox");
  var meritialStatus = "";
  if (checkValue.checked == true) {
    meritialStatus = "Married";
  } else {
    meritialStatus = "UnMarried";
  }
  return meritialStatus;
}

function displayCheckboxValue() {
  var inputs = document.querySelectorAll(".Checkbox");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].checked = false;
  }
}

function resetForm() {
  var checkRadioValue = displaychecktRadiovalue();
  var checkCheckboxValue = displayCheckboxValue();
  document.getElementById("firstName").value = "";
  document.getElementById("middleName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("birth-date").value = "";
  document.getElementsByName("gender").value = checkRadioValue;
  document.getElementById("countryName").value = "";
  document.getElementById("stateName").value = "";
  document.getElementById("cityName").value = "";
  document.getElementById("Checkbox").value = checkCheckboxValue;
}

function setData() {
  // localStorage.setItem("employeeList", JSON.stringify(employeeList));
  setCookie("employeeList", JSON.stringify(employeeList));
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function pushData(formData) {
  employeeList.push(formData);
  displayRecord();
  setData();
  getCookie();
  resetForm();
}

function displayRecord() {
  var displayData = document.getElementById("showdata");
  displayData.innerHTML = "";
  employeeList.map((ele) => {
    displayData.innerHTML +=
      "<tr><td>" +
      "<input type='checkbox' name='selectCheckboxValue' class='select-checkbox' id='" +
      ele.id +
      "'/>" +
      "</td><td>" +
      ele.id +
      "</td><td>" +
      ele.FirstName +
      "</td><td>" +
      ele.MiddleName +
      "</td><td>" +
      ele.LastName +
      "</td><td>" +
      ele.DateOfBirth +
      "</td><td>" +
      ele.Gender +
      "</td><td>" +
      ele.Country +
      "</td><td>" +
      ele.State +
      "</td><td>" +
      ele.City +
      "</td><td>" +
      ele.IsMarried +
      "</td><td>" +
      "<input type='button' id='edit' value='edit' onclick ='onEdit(" +
      ele.id +
      ")'>&nbsp&nbsp<input type='button' id='delete' value='delete' onclick ='onDelete(" +
      ele.id +
      ")'/>" +
      "</tr>";
  });
}

function selectAll() {
  var items = document.getElementsByName("selectCheckboxValue");
  for (i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") items[i].checked = true;
  }
}

function deleteAll() {
  if (confirm("Are you sure to delete this record ?")) {
    var selectedValue = document.querySelectorAll(
      'input[name="selectCheckboxValue"]:checked'
    );
    var deleteIds = [];
    selectedValue.forEach((e) => deleteIds.push(e.id));
    for (i in deleteIds) {
      var checkIndex = employeeList.findIndex((val) => val.id == deleteIds[i]);
      employeeList.splice(checkIndex, 1);
    }
    displayRecord();
    setData();
  }
}

function onEdit(id) {
  var editRow = employeeList.filter((ele) => {
    return ele.id === id;
  });
  employeeId = id;
  deleteId = id;
  var displayNewDate = getNewDate(editRow[0].DateOfBirth);
  var stateName = document.getElementById("stateName");
  stateName.innerHTML =
    " <option value='' selected='selected' >Select State</option>";
  var cityName = document.getElementById("cityName");
  cityName.innerHTML =
    " <option value='' selected='selected' >Select City</option>";
  document.getElementById("firstName").value = editRow[0].FirstName;
  document.getElementById("middleName").value = editRow[0].MiddleName;
  document.getElementById("lastName").value = editRow[0].LastName;
  document.getElementById("birth-date").value = displayNewDate;
  document.forms.RegForm.gender.value = editRow[0].Gender;
  document.getElementById("countryName").value = editRow[0].Country;
  if (editRow[0].Country) {
    var state = Object.keys(countryObj[editRow[0].Country]);
    state.map((ele) => {
      stateName.innerHTML += "<option>" + ele + "</option>";
    });
  }
  document.getElementById("stateName").value = editRow[0].State;
  if (editRow[0].State) {
    var city = countryObj[editRow[0].Country][editRow[0].State];
    city.map((ele) => {
      cityName.innerHTML += "<option>" + ele + "</option>";
    });
  }
  document.getElementById("cityName").value = editRow[0].City;
  document.getElementById("Checkbox").checked =
    editRow[0].IsMarried === "Married" ? true : false;
  Edit = true;
  ChangeButton();
}

function onDelete(id) {
  if (confirm("Are you sure to delete this record ?")) {
    var deleteRow = employeeList.findIndex((ele) => ele.id === id);
    employeeList.splice(deleteRow, 1);
    displayRecord();
    setData();
  }
}

function updateRecord() {
  var updateIndex = employeeList.findIndex((ele) => ele.id === employeeId);
  var displayDate = getDate();
  var displayCheckboxValue = getCheckboxValue();
  employeeList[updateIndex].FirstName =
    document.getElementById("firstName").value;
  employeeList[updateIndex].MiddleName =
    document.getElementById("middleName").value;
  employeeList[updateIndex].LastName =
    document.getElementById("lastName").value;
  employeeList[updateIndex].DateOfBirth = displayDate;
  employeeList[updateIndex].Gender = document.forms.RegForm.gender.value;
  employeeList[updateIndex].Country =
    document.getElementById("countryName").value;
  employeeList[updateIndex].State = document.getElementById("stateName").value;
  employeeList[updateIndex].City = document.getElementById("cityName").value;
  employeeList[updateIndex].IsMarried = displayCheckboxValue;
  displayRecord();
  setData();
  resetForm();
  Edit = false;
  ChangeButton();
}

function ChangeButton() {
  var submitButton = document.getElementById("submitButton");
  var updateButton = document.getElementById("updateButton");
  if (Edit) {
    submitButton.style.display = "none";
    updateButton.style.display = "inline";
  } else {
    submitButton.style.display = "inline";
    updateButton.style.display = "none";
  }
}
