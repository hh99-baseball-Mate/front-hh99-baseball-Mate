import React, { useState } from "react"

export const useVolumeBtn = (people) => {
  //  인원수 + 버튼

  const [peopleLimit, setPeopleLimit] = useState(people)

  const plusBtn = () => {
    if (peopleLimit < 8) {
      setPeopleLimit(peopleLimit + 1)
    } else {
      window.alert("8명 이상은 안됩니다")
      return
    }
  }
  // 인원수 - 버튼
  const minusBtn = () => {
    if (peopleLimit !== 0) {
      setPeopleLimit(peopleLimit - 1)
    } else {
      window.alert("0이하는 선택불가")
    }
  }

  const onChangeBtn = (e) => {
    setPeopleLimit(e.target.vlaue)
  }

  // console.log(peopleLimit)
  // console.log(inputValue)
  return [plusBtn, minusBtn, onChangeBtn, peopleLimit]
}
