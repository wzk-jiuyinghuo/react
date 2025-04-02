import "./style.scss";
import { useRef, useState } from "react";

export default function MyGame() {
  const [numList, _setNumList] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const numListRef = useRef(numList);
  const setNumList = (data) => {
    numListRef.current = data;
    _setNumList(data);
  };
  const [isX, setIsX] = useState(true);
  const [status, setStatus] = useState("该:X");
  const [winner, _setWinner] = useState("");
  const winnerRef = useRef(winner);
  const setWinner = (data) => {
    winnerRef.current = data;
    _setWinner(data);
  };
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  function handleBox(item, index) {
    if (numList[index] || checkWin(numList)) return;
    const newList = [...numList];
    // 修改副本
    newList[index] = isX ? "X" : "O";
    setIsX(!isX);
    setWinner(checkWin(newList));
    if (winnerRef.current) {
      setStatus("当前的胜利者为" + winnerRef.current);
    } else {
      setStatus(!isX ? "该:X" : "该:O");
    }
    const isAllNll = newList.every((item) => item);

    if (isAllNll && !winnerRef.current) {
      setStatus("平局");
    }
    setNumList(newList);
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      numListRef.current,
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function checkWin(list) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (list[a] && list[a] === list[b] && list[a] === list[c]) return list[a];
    }

    return null;
  }
  const boxItem = numList.map((item, index) => (
    <div
      className={item === winner ? "box win" : "box"}
      style={{ cursor: "pointer" }}
      key={index}
      onClick={() => handleBox(item, index)}
    >
      {item}
    </div>
  ));

  const moves = history.map((item, index) => {
    const details = item.map((d, j) => <span key={j}>{!d ? "-" : d}</span>);
    return (
      <div key={index}>
        {details}#{index}
      </div>
    );
  });
  function resetGame() {
    setStatus("该:X");
    setNumList(Array(9).fill(null));
    setHistory([Array(9).fill(null)]);
  }
  return (
    <>
      <div className="game">
        <div>
          <div className="title">{status}</div>
          <div className="container">{boxItem}</div>
        </div>
        <button onClick={resetGame}>重新开始</button>
        <div>{moves}</div>
      </div>
    </>
  );
}
