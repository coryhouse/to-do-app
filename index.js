function getToDoList() {
  const toDoListFromLocalStorage = localStorage.getItem("toDoList");
  if (toDoListFromLocalStorage === null) {
    var toDoList = [];
  } else {
    var toDoList = JSON.parse(toDoListFromLocalStorage);
  }

  return toDoList;
}

const liArray = [];

function handleSubmit(event) {
  event.preventDefault();
  const toDoList = getToDoList();

  const toDo = document.getElementById("toDo").value;
  const time = document.getElementById("time").value;
  const isItemValid = testToDo(toDo, toDoList);
  const isTimeValid = testTime(time);

  if (isItemValid === true && isTimeValid === true) {
    const toDoInfo = {
      done: false,
      toDo: toDo,
      time: time,
    };
    toDoList.push(toDoInfo);
    const index = toDoList.length - 1;
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    addLi(toDoInfo, index);
    form.reset();
  }
}

function addLi(element, index) {
  const toDoList = getToDoList();
  if (element.done === true) {
    var isChecked = " type= 'checkbox' + checked ";
    var lisId = '<li class = "checked"' + 'id="';
    input.setAttribute("value", element.toDo);
  } else {
    var isChecked = " type= 'checkbox'";
    var lisId = '<li id="';
  }
  const ol = document.getElementsByTagName("ol")[0];
  const li =
    lisId +
    "li-" +
    index +
    '"> <button id="' +
    element.toDo +
    "-delete" +
    '"> Delete </button>' +
    "<div id = 'textForTimeAndToDo" +
    index +
    "'>" +
    "<div id ='toDo-" +
    index +
    "'> " +
    element.toDo +
    " </div>" +
    " at " +
    "<div id ='time-" +
    index +
    "'>" +
    element.time +
    "</input>" +
    "<div id ='toDo2-" +
    index +
    "'> <input type = 'textbox' value ='" +
    element.toDo +
    "'>" +
    "</input>" +
    "</div>" +
    " at " +
    "</div>" +
    "<div id = 'textboxsAndEnterButton" +
    index +
    "'>" +
    "<div id ='time2-" +
    index +
    "'> <input type = 'textbox' value ='" +
    element.time +
    "'>" +
    "</input> <div id ='enterButton-" +
    index +
    "'> <button type = 'submit'>" +
    "Confirm Text Value" +
    "</button>" +
    "</input>" +
    " </div> <input " +
    isChecked +
    " id='" +
    element.toDo +
    "-checkbox" +
    index +
    "'/>" +
    "</li>";
  const indexToString = index.toString();
  ol.insertAdjacentHTML("beforeend", li);
  // ol.replace("undefined", "");
  const deleteButton = document.getElementById(element.toDo + "-delete");
  deleteButton.addEventListener("click", deleteToDo);
  console.log(element.toDo);
  liArray.push(element.toDo);
  const checkboxQuery = element.toDo + "-checkbox" + indexToString;
  const checkbox = document.getElementById(checkboxQuery);
  debugger;
  checkbox.addEventListener("click", boxCheck);
  const toDoCheckbox = document.getElementById("toDo-" + indexToString);
  const timeCheckbox = document.getElementById("time-" + indexToString);
  timeCheckbox.addEventListener("click", hideTextDiv);
  toDoCheckbox.addEventListener("click", hideTextDiv);
  const enterButton = document.getElementById("enterButton-" + indexToString);
  enterButton.addEventListener("click", hideTextboxDiv);
}

function hideTextboxDiv(event) {
  const index = event.target.id.split("-");
  const textboxsAndEnter = document.getElementById(
    "textboxsAndEnterButton" + index(1)
  );
  textboxsAndEnter.classList.toggle("hidden");
}

function hideTextDiv(event) {
  const index = event.target.id.split("-");
  const textForTimeAndToDo = document.getElementById(
    "textForTimeAndToDo" + index(1)
  );
}

function boxCheck(event) {
  const toDoList = getToDoList();
  const indexThatWasChecked = toDoList.findIndex(
    (item) => item.toDo === event.target.id.replace("-checkbox", "")
  );
  const toDoToUpdate = toDoList[indexThatWasChecked];

  // const liId = toDoToUpdate.toDo.replace(
  //   toDoToUpdate.toDo,
  //   toDoToUpdate.toDo + "-liText"
  //   );
  const liId = event.target.id.replace("checkbox", "li");
  if (event.target.checked === true) {
    toDoToUpdate.done = true;
    document.getElementById(liId).classList.add("checked");
  } else {
    toDoToUpdate.done = false;
    document.getElementById(liId).classList.remove("checked");
  }

  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

getToDoList().forEach((element, index) => addLi(element, index));

const form = document.getElementById("form");

function testToDo(toDo, toDoInfo) {
  if (toDo === "") {
    alert("You can not submit empty to do's.");
    return false;
  }

  if (toDoInfo.find((todo) => todo.toDo === toDo)) {
    alert("You can not submit duplicate to do's.");
    form.reset();
    return false;
  }
  return true;
}
function deleteToDo(event) {
  const toDoList = getToDoList();
  const rightIndex = toDoList.indexOf(event.target.id - "-delete");
  if (
    confirm(
      "Do you want to delete " + event.target.id.replace("-delete", "") + "?"
    )
  ) {
    toDoList.splice(rightIndex, 1);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    location.reload();
    toDoList.forEach((element, index) => addLi(element, index));
    //
  } else {
    return false;
  }
}

function testTime(time) {
  if (time === "") {
    alert("You can not submit empty time.");
    return false;
  }
  return true;
}

form.addEventListener("submit", handleSubmit);
