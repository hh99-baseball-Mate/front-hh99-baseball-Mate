import React from "react"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { history } from "../redux/configStore"

export const ClubChoice = (props) => {
  return (
    <>
      <div style={{ margin: "16px" }}>
        <AiOutlineArrowLeft
          style={{ position: "absolute" }}
          onClick={() => {
            history.push("/login")
          }}
        />
        <div style={{ margin: "32px 16px" }}>
          <div
            style={{
              padding: "36px 50px 50px 0 ",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            구단선택
          </div>

          <div
            style={{
              fontSize: "24px",
              maxWidth: "250px",
              fontWeight: "bold",
            }}
          >
            신유빈님이 좋아하는 구단을 선택해주세요.
          </div>
        </div>

        {/* 구단선택 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          }}
        >
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/u5t0x01589709824.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/e96s4z1589709054.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/pesj9z1589709516.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/qcj18p1589709259.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/qk8erg1589709962.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/vvii3b1589708608.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/l9quje1589708840.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/6gwcg81589708218.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/5u6k511589709673.png"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://www.thesportsdb.com/images/media/team/badge/49cfnl1623632712.png"
            rounded
            style={{ width: "120px" }}
          />
        </div>

        <div
          style={{
            position: "fixed",
            margin: "0 auto",
            width: "80%",
            right: "0px",
            transform: "translate(-10%, -40%)",
            bottom: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="primary"
            style={{
              maxWidth: "450px",
              width: "100%",
              boxSizing: "border-box",
              height: "50px",
              borderRadius: "30px",
              border: "1px solid #00000057",
            }}
          >
            로그인
          </Button>
        </div>
      </div>
    </>
  )
}
