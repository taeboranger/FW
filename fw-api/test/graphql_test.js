//0. graphQL에서 불러온다.
const { graphql, buildSchema } = require("graphql");

//1.데이터구조(쿼리)를 작성
const schema = buildSchema(`
  type Query{
      hello:String,
      nodejs:Int
  }
`);

//2.resolver - hello라는 쿼리로 요청이 들어오면 "helloWorld"라는 응답을 보낸다.
const root = {
  hello: () => "helloWorld",
  nodejs: () => 20,
};

//3.첫번째 인자로는 스키마, 두번째로는 쿼리, 세번째에는 응답쿼리를 넣어줍니다.
graphql(schema, '{hello}', root).then((response) => {
  console.log(response);       //{hello:'helloWorld'}
});