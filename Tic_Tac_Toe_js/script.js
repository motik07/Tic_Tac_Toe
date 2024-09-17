let sider = document.querySelector('#sider_id');
let hamburger = document.querySelector('#id_sider_btn');
let bool = true;
hamburger.addEventListener('click', (event)=>{
    bool = !bool;
    switch(bool){
        case false:
            sider.style.left = '0%';
            break;
        case true:
            sider.style.left = '-100%';
            break;
    }
    console.log(bool);
})

let textResult = document.querySelector("#text_result_id");
let turn = true; // true = x
let btnIsClicked = 0;
let btns = document.querySelectorAll(".btns");

btns.forEach((b) => {
  b.addEventListener("click", btnClick);
});

function btnClick() {
  if (this.textContent != "") return;
  btnIsClicked++;
  if (turn) this.textContent = "X";
  else this.textContent = "O";

  let obj = checkWin();
  turn = !turn; // שינוי התור לפני בדיקת תוצאת המשחק

  if (obj.win) {
    let btns = document.querySelectorAll(".btns");
    btns[obj.pos[0]].style.color = "red";
    btns[obj.pos[1]].style.color = "red";
    btns[obj.pos[2]].style.color = "red";
    textResult.textContent = (turn ? "O" : "X") + " ניצח! אכלת אותה"; // שימוש בתור הנוכחי לאחר השינוי
    textResult.style.direction = "rtl";
  } else if (obj.isTie) {
    textResult.textContent = "תיקו קלאסי, איזה שיעמום..."; // אין צורך בשימוש בתור כאן
  }
}

function reset() {
  let btns = document.querySelectorAll(".btns");
  btns.forEach((b) => {
    b.textContent = "";
    b.style.color = "";
    textResult.textContent = "בואו נמשיך לשחק";
  });
  btnIsClicked = 0;
  turn = true;
}

function checkWin() {
  let btns = document.querySelectorAll(".btns");
  let obj = { win: false, isTie: false, pos: [] };

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombinations) {
    if (
      btns[combo[0]].textContent &&
      btns[combo[0]].textContent === btns[combo[1]].textContent &&
      btns[combo[1]].textContent === btns[combo[2]].textContent &&
      btns[combo[0]].textContent != ""
    ) {
      obj.win = true;
      obj.pos = combo;
      break;
    }
  }

  if (!obj.win && btnIsClicked === 9) {
    obj.isTie = true;
  }

  return obj;
}
