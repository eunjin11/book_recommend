//const fs = require("fs");

function clicked(d) {
  console.log(d.id);
  console.log(d.group);
  if (d.group == "책") {
    d3.selectAll("rect")
      .attr("height", 10)
      .attr("width", 10)
      .style("stroke-width", 1.5)
      .style("stroke", "#fff"); //하이라이트 초기화

    d3.select(this)
      .select("rect")
      .attr("height", 30)
      .attr("width", 30)
      .style("stroke-width", 6)
      .style("stroke", "#ff0000"); //하이라이트 강조
    document.getElementById("result").innerText = d.id;
    document.getElementById("bookInfo").innerText =
      "제목: " +
      d.id +
      " 작가: " +
      d.author +
      " 출판사: " +
      d.publisher +
      " 청구기호: " +
      d.book_number;
    //"아이디: " + d.id + "학과: " + d.group;
  } else {
    d3.selectAll("circle")
      .attr("r", 6)
      .style("stroke-width", 1.5)
      .style("stroke", "#fff"); //하이라이트 초기화

    d3.select(this)
      .select("circle")
      .attr("r", 20)
      .style("stroke-width", 6)
      .style("stroke", "#ff0000"); //하이라이트 강조

    document.getElementById("result").innerText = d.id;
    document.getElementById("bookInfo").innerText =
      "아이디: " + d.id + "  학과: " + d.group;
    //"아이디: " + d.id + "학과: " + d.group;
  }

  //id가 사용자 맞는지, 책 아닌지 찾기
  //var inputID = d.id;
}

async function clickinputId() {
  var inputID2 = document.getElementById("userid").value;
  if (inputID != null) {
    document.getElementById("result").innerText = inputID2;
    console.log(inputID2);
  }
  console.log("새로운 네트워크 그리기 시작");
  var inputID = document.getElementById("result").innerText;
  console.log(inputID);
  // console.log();
  const d = await window.axios.get("./book/data_1205_new.csv");
  // console.log(d.data);
  const result = d.data;
  const id = inputID;

  function makearr(result) {
    //const rows = result.split("\r\n");
    const rows = result.split("\n");

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

  function makelayer2(arr) {
    //id가 읽은 책만 뽑기
    const arr2 = arr.filter((ID) => ID[0] == id); //id 겹치는거 뽑기

    //let onlyarr2 = arr2.filter((item, pos) => arr2.indexOf(item) === pos); // 겹치는 링크 제거는 나중에 하기....

    //for (i = 0; i < arr2.length; i++) console.log(arr2[i]); //id 겹치는거 뽑기

    return arr2;
  }

  const layer2 = makelayer2(arr);

  function makelayer3(layer2, arr) {
    //const arr2 = arr.filter((ID) => ID[0] == id);
    temp_arr = [];
    var arr4 = [];
    for (i = 0; i < layer2.length; i++) {
      temp_arr = arr.filter((Title) => Title[2] == layer2[i][2]);
      for (j = 0; j < temp_arr.length; j++) arr4.push(temp_arr[j]);
    }
    return arr4;
  }

  const layer3 = makelayer3(layer2, arr);

  console.log("레이어 4 출력");

  /*
for (i = 0; i < layer3.length; i++) {
  console.log("i: " + i);
  const uniqueArr = layer3.filter((ID) => ID[0] == layer3[i][0]);
  if (uniqueArr.length > 1)
    for (j = 0; j < uniqueArr.length; j++) {
      console.log("j: " + j);
      console.log(uniqueArr[j]);
    }
}*/
  /*
let find = layer3.filter((v, i) => layer3.indexOf(v) === i);
console.log(find);*/

  let uniqueArr = layer3.filter((element, index) => {
    return (
      //1차원 배열에서는 indexOf를 사용했지만 다차원 배열에서는 안먹힘
      layer3.findIndex((item) => item[0] === element[0]) === index
    );
  });

  function makelayer4(uniqueArr, arr) {
    arr5 = [];
    temp_arr2 = [];
    for (i = 0; i < uniqueArr.length; i++) {
      temp_arr2 = arr.filter((ID) => ID[0] == uniqueArr[i][0]);
      for (j = 0; j < temp_arr2.length; j++) {
        arr5.push(temp_arr2[j]);
      }
    }

    return arr5;
  }

  const layer4 = makelayer4(uniqueArr, arr);

  /*One solution you could try is to convert the array to a string when doing the console.log command:

let fruits = [['Apple', 'Banana'],['Apple', 'Banana']];
console.log(fruits.toString());  // Apple,Banana,Apple,Banana
console.log('' + fruits);  // Apple,Banana,Apple,Banana
console.log(JSON.stringify(fruits));  // [["Apple","Banana"],["Apple","Banana"]]
 */
  nodelist = [];
  function makeusernode(layer4) {
    let uniqueArr = layer4.filter((element, index) => {
      return (
        //1차원 배열에서는 indexOf를 사용했지만 다차원 배열에서는 안먹힘
        layer4.findIndex(
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
    for (let i = 0; i < uniqueArr.length; i++) {
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

  makeusernode(layer4);

  function makebooknode(layer4) {
    let uniqueArr = layer4.filter((element, index) => {
      return (
        //1차원 배열에서는 indexOf를 사용했지만 다차원 배열에서는 안먹힘
        layer4.findIndex((item) => item[2] === element[2]) === index
      );
    });

    const header = [];
    header[0] = "id";
    header[1] = "group";
    header[2] = "title";
    header[3] = "author";
    header[4] = "publisher";
    header[5] = "book_number";

    for (let i = 0; i < uniqueArr.length; i++) {
      let obj = {};

      let row = uniqueArr[i];

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

  const booknode = makebooknode(layer4);

  function makelink(arr) {
    const jsonArray = [];

    const header = [];
    header[0] = "source";
    header[1] = "target";
    header[2] = "value";

    // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기
    for (let i = 0; i < arr.length; i++) {
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

  const linklist = makelink(layer4);

  //json파일 만들기

  jsonarr = {};
  jsonheader = [];
  jsonheader[0] = "nodes";
  jsonheader[1] = "links";
  jsonarr[jsonheader[0]] = booknode;
  //jsonarr[jsonheader[0]].push(usernode);
  jsonarr[jsonheader[1]] = linklist;
  console.log(jsonarr);
  createNetwork(jsonarr);
  //writeFileSync("book/new_data.json", JSON.stringify(jsonarr));
}
