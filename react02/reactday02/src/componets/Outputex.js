// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const sumdit = () => {
    var input = document.getElementById("input");
    var todoListUl = document.getElementById("todoList");
    var todoli = document.createElement("li");
    var deleBtn = document.createElement("button");
    var ckBtn = document.createElement("input");
    var textBox = document.createElement("span");

    ckBtn.setAttribute("type", "checkbox");

    deleBtn.innerText = "삭제";
    textBox.innerText = input.value;
    todoli.append(ckBtn);
    todoli.append(textBox);
    todoli.append(deleBtn);

    todoListUl.appendChild(todoli);
    input.value = "";
    input.focus();

    deleBtn.addEventListener("click", (e) => {
      todoli.remove(e);
    });

    var checked = false;
    ckBtn.addEventListener("change", (e) => {
      checked = !checked;

      if (checked) {
        todoli.setAttribute("style", "text-decoration: line-through");
      } else {
        todoli.removeAttribute("style", "text-decoration: line-through");
      }
    });
    
    //span태그 영역을 떠블클릭 하면 input태그로 변경됨
    //그다음 input에 keyup이밴트 추가후 엔터를 누르면
    //span태그에 input 값으로 변경
    textBox.addEventListener("dblclick", (e) => {
      textBox.innerHTML = "<input/>";
      e.target.firstChild.focus();
      console.dir(e.target.firstChild);
      e.target.firstChild.addEventListener("keyup", (e) => {
        console.dir(e);
        if (e.keyCode === 13) {
          textBox.innerHTML = e.target.value;
        }
      });
    });
  };
  return (
    <>
      <input id="input" type="text" />
      <button onClick={sumdit}>등록</button>
      <br />
      <ul id="todoList"></ul>
    </>
  );
};
