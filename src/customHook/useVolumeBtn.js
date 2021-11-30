import React, { memo, useState } from "react"

export const useVolumeBtn = memo((people) => {
  //  인원수 + - 버튼 커스텀훅

  const [peopleLimit, setPeopleLimit] = useState(people)

  const plusBtn = () => {
    if (peopleLimit < 8) {
      setPeopleLimit(peopleLimit + 1)
    } else {
      window.alert("최대 8명 입니다.")
      return
    }
  }
  // 인원수 - 버튼
  const minusBtn = () => {
    if (peopleLimit !== 1) {
      setPeopleLimit(peopleLimit - 1)
    } else {
      window.alert("1명이하는 선택할 수 없습니다.")
    }
  }

  const onChangeBtn = (e) => {
    setPeopleLimit(e.target.vlaue)
  }

  return [plusBtn, minusBtn, onChangeBtn, peopleLimit]
})
