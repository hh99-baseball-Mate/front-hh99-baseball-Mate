import React from "react"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

export const ClubChoice = (props) => {
  return (
    <>
      <div style={{ margin: "16px" }}>
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
            rounded
            style={{ width: "120px" }}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSCeqRqVMx4w8wh3lOdYbf6e4BoA2BRPnZZiHrfJp8hqEH52o6dDCS6pNotpWWZ5hOSU0&usqp=CAU"
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
