// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  let todoListArr = props.todoListArr;
  let DeleteItem = props.deleteItem;
  let EmendItemNo = props.emendItemNo;
  let ChangeCkBox = props.changeCkBox;

  //function emend() {}
  return (
    <div>
      <table id="todoListTbl" className="table table-hover">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Confirm</th>
            <th>Title</th>
            <th>Emend</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todoListArr.map((item, idx) => {
            // 중괄호 enter하면 return문을 꼭 넣어야 한다.
            return (
              <tr key={item.no}>
                <td>
                  <input
                    type="checkbox"
                    onClick={() => {
                      ChangeCkBox(item.done, item.no);
                    }}
                  ></input>
                </td>
                <td>
                  <span
                    style={{ textDecoration: item.done ? "line-through" : "" }}
                  >
                    {item.title}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      //수정 위치를 판별하기 위해 EmendItemNo에 no전달
                      EmendItemNo(item.no);
                    }}
                  >
                    Emend
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => {
                      //todo 삭제를 위해 DeleteItem함수에 no전달
                      DeleteItem(item.no);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
