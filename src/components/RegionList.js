import React from "react"
import styled from "styled-components"

export const RegionList = ({ setRegoin, setShowModal }) => {
  // 지역선택 필터에 사용되는 row Date

  const regionList = [
    { id: "1", region: "전국" },
    { id: "2", region: "서울" },
    { id: "3", region: "경기" },
    { id: "4", region: "인천" },
    { id: "5", region: "부산" },
    { id: "6", region: "대전" },
    { id: "7", region: "대구" },
    { id: "8", region: "울산" },
    { id: "9", region: "세종" },
    { id: "10", region: "광주" },
    { id: "11", region: "강원" },
    { id: "12", region: "충북" },
    { id: "13", region: "충남" },
    { id: "14", region: "경북" },
    { id: "15", region: "경남" },
    { id: "16", region: "전북" },
    { id: "17", region: "전남" },
    { id: "18", region: "제주" },
  ]
  return (
    <ListBox>
      {regionList.map((e) => (
        <List
          key={e.id}
          onClick={() => {
            setRegoin(e.region)
            setShowModal(false)
          }}
        >
          {e.region}
        </List>
      ))}
    </ListBox>
  )
}

const ListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`

const List = styled.button`
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 100px;
  color: #777777;
  text-align: center;
  font-size: 12px;
  height: 22px;
  line-height: 1.5;
  cursor: pointer;
  :hover {
    background-color: #3e3b3b;
    color: #fff;
  }
`
