const TIMELINE = "TIMELINE"

const timeLines = createAction(TIMELINE, (contents) => ({ contents }))
// 초기값

const apis = axios.create({
  baseURL: "http://52.78.93.38",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-AUTH-TOKEN": getCookie("kakao_login"),
  },
})

const timeLine = (content) => {
  console.log(content)
  return function (dispatch, getState, { history }) {
    // const cookie = getCookie("kakao_login")
    // console.log(cookie)
    apis
      .post("/page/timeLine", {
        content,
        headers: {
          "content-type": "application/json;charset=UTF-8",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-AUTH-TOKEN": getCookie("kakao_login"),
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err, "타임라인에러"))
  }
}

const [timeline, setTimeline] = useState("")
{
  ;<Inputs
    type="text"
    placeholder="타임라인내용 입력해주세요"
    value={timeline}
    _onChange={(e) => {
      setTimeline(e.target.value)
    }}
  />
}
{
  ;<Buttons
    margin="30px 0"
    _onClick={() => dispatch(userActions.timeLine(timeline))}
  >
    로그인
  </Buttons>
}
