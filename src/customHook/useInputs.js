import React, { useState } from "react"

export const useInputs = (initialValue) => {
  const [inputValue, setInputValue] = useState(initialValue)

  // 인풋 커스텀훅

  const onChange = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }
  return [inputValue, onChange]
}
