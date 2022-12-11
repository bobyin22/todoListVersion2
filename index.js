// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const listDone = document.querySelector("#my-done");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式 輸入值跑出一行<li>標籤
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

//功能2Enter解法1 Create使用keypress空白鍵 鍵盤不放時，則會不斷地連續觸發該事件。
// input.addEventListener("keypress", function(event) {
//   const inputValue = input.value;
//   //功能2 舉例說明 keypress是鍵盤壓下事件
//   //當鍵盤壓是 Enter ，執行addItem把在輸入欄的字加入待辦事項
//   if (event.key === "Enter") {
//     addItem(inputValue);
//   }
// });

//功能2Enter解法2 Create使用keyup空白鍵
input.addEventListener("keyup", function (event) {
  const inputValue = input.value;
  //功能2 舉例說明 keypress是鍵盤壓下事件
  //當鍵盤壓是 Enter ，執行addItem把在輸入欄的字加入待辦事項 && 功能1空白偵測
  if (event.key === "Enter" && inputValue.trim().length > 0) {
    addItem(inputValue);
  }
});

// Create點擊
addBtn.addEventListener("click", function () {
  const inputValue = input.value;
  console.log("click", input.value);

  //功能1空白偵測 舉例說明 trim() 對於" Hello " 會變成"Hello"
  if (inputValue.length > 0 && inputValue.trim().length > 0) {
    addItem(inputValue);
  }
});

// Delete and check
// list.addEventListener("click", function (event) {
//   const target = event.target;
//   console.log("target",target);

//   if (target.classList.contains("delete")) {
//     let parentElement = target.parentElement;
//     console.log("parentElement", parentElement);
//     parentElement.remove();
//   } else if (target.tagName === "LABEL") {
//     target.classList.toggle("checked");
//   }
// });

//監聽1 點擊 Todo刪除
list.addEventListener("click", function (event) {
  const target = event.target; //會印出點擊的標籤，但只限於Todo裡面因為監聽是只設在這邊
  console.log("target", target); //會印出<lable>
  //console.log(target.innerText) //會印出"Hit the gym"

  //判斷1 如果點擊到HTML label標籤才會動作
  if (target.tagName == "LABEL") {
    console.log("target.tagName", target.tagName); //會印出標籤名稱 ex LABEL
    //下方Done增加一行並且是灰體字中線
    let newItem = document.createElement("li");
    newItem.innerHTML = `
    <label for="todo">${target.innerText}</label>
    <i class="delete fa fa-trash"></i>
    `;
    //console.log("newItem", newItem);  //會印出<li><lable工作><i垃圾桶>
    listDone.appendChild(newItem);
    //target.classList.toggle("checked");
    //listDone.classList.toggle("checked"); //會連Done<h2>都一起改
    console.log("newItem", newItem);
    newItem.children[0].classList.toggle("checked"); //要改動的是newItem 不是listDone，因為newItem是剛加入的

    //上方Todo該行刪除
    let parentElement = target.parentElement;
    parentElement.remove();
  }
  //判斷2 如果點擊垃圾桶 該行刪除
  else if (target.classList.contains("delete")) {
    console.log("target.classList", target.classList); //會印出 {"0": "delete", "1": "fa", "2": "fa-trash"}
    let parentElement = target.parentElement;
    console.log("parentElement", parentElement);
    parentElement.remove();
  }
});

//監聽2 點擊Done刪除
listDone.addEventListener("click", function (event) {
  const target = event.target;
  console.log("target", target); //會印出點擊的標籤，但只限於Done裡面因為監聽是只設在這邊
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    console.log("parentElement", parentElement);
    parentElement.remove();
  }
});
