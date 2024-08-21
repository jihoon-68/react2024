const Output = ({ saramlist, deleted, modifyValueCall }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>번호</td>
            <td>이름</td>
            <td>부서</td>
            <td>직책</td>
            <td>수정</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {saramlist.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.no}</td>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.position}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      modifyValueCall(item);
                    }}
                  >
                    수정
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      deleted(item.no);
                    }}
                  >
                    삭제
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
export default Output;
