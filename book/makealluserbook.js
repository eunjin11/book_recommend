const fs = require("fs");

const result = fs.readFileSync("book/약학대_data.csv").toString();

//const id = "AJ1103866";

function makearr(result) {
  //const rows = result.split("\r\n");
  const rows = result.split("\n");
  console.log("읽음");

  const jsonArray = [];

  const header = [];
  header[0] = "id";
  header[1] = "major";
  header[2] = "title";
  header[3] = "author";
  header[4] = "publisher";
  header[5] = "book_number";

  jsonArray.push(header);

  // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
  for (let i = 1; i < rows.length; i++) {
    // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
    let obj = [];
    // 각 내용 행을 콤마로 구분
    let row = rows[i].split(",");

    // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
    //for (let j = 0; j < header.length; j++) {
    //obj[j] = row[j];
    //}
    obj[0] = row[0];
    obj[1] = row[1];
    obj[2] = row[4];
    obj[3] = row[6];
    obj[4] = row[7];
    obj[5] = row[8];

    jsonArray.push(obj);
  }

  return jsonArray;
}

let arr2 = makearr(result);

let arr = arr2.filter((element, index) => {
  return (
    //1차원 배열에서는 indexOf를 사용했지만 다차원 배열에서는 안먹힘
    arr2.findIndex(
      (item) =>
        item[0] === element[0] &&
        item[1] === element[1] &&
        item[2] === element[2]
    ) === index
  );
});

//console.log("중복제거");
//https://velog.io/@pdg03092/Javascript-%EB%B0%B0%EC%97%B4%EC%9D%98-%EC%A4%91%EB%B3%B5-%EC%A0%9C%EA%B1%B0-2%EC%B0%A8%EC%9B%90-%EB%B0%B0%EC%97%B4%EC%9D%98-%EC%A4%91%EB%B3%B5-%EC%A0%9C%EA%B1%B0

nodelist = [];
function makeusernode(arr) {
  let uniqueArr = arr.filter((element, index) => {
    return (
      //1차원 배열에서는 indexOf를 사용했지만 다차원 배열에서는 안먹힘
      arr.findIndex(
        (item) => item[0] === element[0] && item[1] === element[1]
      ) === index
    );
  });

  const jsonArray = [];

  const header = [];
  header[0] = "id";
  header[1] = "group";
  header[2] = "title";
  header[3] = "author";
  header[4] = "publisher";
  header[5] = "book_number";

  // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
  for (let i = 1; i < uniqueArr.length; i++) {
    // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
    let obj = {};
    // 각 내용 행을 콤마로 구분
    let row = uniqueArr[i];

    // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
    obj[header[0]] = row[0];
    obj[header[1]] = row[1];
    obj[header[2]] = row[2];
    obj[header[3]] = row[3];
    obj[header[4]] = row[4];
    obj[header[5]] = row[5];

    // 각 내용 행의 객체를 jsonArray배열에 담기
    nodelist.push(obj);
  }
  return nodelist;
}

makeusernode(arr);

function makebooknode(arr) {
  let uniqueArr = arr.filter((element, index) => {
    return (
      //1차원 배열에서는 indexOf를 사용했지만 다차원 배열에서는 안먹힘
      arr.findIndex((item) => item[2] === element[2]) === index
    );
  });

  const header = [];
  header[0] = "id";
  header[1] = "group";
  header[2] = "title";
  header[3] = "author";
  header[4] = "publisher";
  header[5] = "book_number";

  for (let i = 1; i < uniqueArr.length; i++) {
    let obj = {};

    let row = uniqueArr[i];

    //for (let j = 0; j < header.length; j++) {
    //  obj[header[0]] = row[2];
    //}
    obj[header[0]] = row[2];
    obj[header[1]] = "책";
    obj[header[2]] = row[2];
    obj[header[3]] = row[3];
    obj[header[4]] = row[4];
    obj[header[5]] = row[5];

    nodelist.push(obj);
  }
  return nodelist;
}

const booknode = makebooknode(arr);

function makelink(arr) {
  const jsonArray = [];

  const header = [];
  header[0] = "source";
  header[1] = "target";
  header[2] = "value";

  // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
  for (let i = 1; i < arr.length; i++) {
    // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
    let obj = {};
    // 각 내용 행을 콤마로 구분
    let row = arr[i];

    // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성

    obj[header[0]] = row[0];
    obj[header[1]] = row[2];
    obj[header[2]] = 1;

    // 각 내용 행의 객체를 jsonArray배열에 담기
    jsonArray.push(obj);
  }
  return jsonArray;
}

const linklist = makelink(arr);

//json파일 만들기

jsonarr = {};
jsonheader = [];
jsonheader[0] = "nodes";
jsonheader[1] = "links";
jsonarr[jsonheader[0]] = booknode;
//jsonarr[jsonheader[0]].push(usernode);
jsonarr[jsonheader[1]] = linklist;
console.log("끝");
fs.writeFileSync("book/college8.json", JSON.stringify(jsonarr));
