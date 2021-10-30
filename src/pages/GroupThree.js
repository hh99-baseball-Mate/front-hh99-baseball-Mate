import React, { useState } from "react";
import {
  Inputs,
  Text,
  InputCheck,
  Container,
  Header,
  Buttons,
} from "../components"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
import { Picture } from "../componentsGroupAdd/Picture"
import styled from "styled-components"
import { clubImageSrc } from "../shared/clubImage"

export const GroupThree = (props) => {
  const [inputValue, setInputValue] = useState({
    contents: "",
    count: 0,
    textarea: "",
    choiceClub: "",
  })

  const { contents, count, textarea, choiceClub } = inputValue

  const onChange = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const plusBtn = () => {
    if (count < 8) {
      setInputValue({
        ...inputValue,
        count: count + 1,
      })
    } else {
      window.alert("8명 이상은 안됩니다")
      return
    }
  }

  const minusBtn = () => {
    if (count !== 0) {
      setInputValue({
        ...inputValue,
        count: count - 1,
      })
    } else {
      window.alert("0이하는 선택불가")
    }
  }

  return (
    <Container margin="0px auto">
      <Header>모임 생성</Header>

      {/* 입력 창 */}
      <div style={{ marginTop: "15px" }}>
        <Inputs
          value={contents}
          name="contents"
          onChange={onChange}
          placeholder="모임명을 입력해주세요"
        >
          모임명
          <InputCheck />
        </Inputs>

        <Grid>
          <Text>
            구단선택
            <InputCheck />
          </Text>
          <Inputs value={choiceClub} dropdown>
            {clubImageSrc.map((e) => (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            ))}
            <InputCheck />
          </Inputs>
        </Grid>

        <Grid>
          <Text>
            일정선택 <InputCheck />
          </Text>
          <Inputs dropdown>
            <option value="롯데">롯데</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <InputCheck />
          </Inputs>
        </Grid>

        {/* <div>인원수 선택</div> */}
        <PeopleSelectContainer>
          <Text>인원수 선택</Text>

          <PeopleSelect>
            <AiOutlineMinusCircle onClick={minusBtn} />
            <PeopleCount>
              <Text center size="18px" name={count} onChange={onChange}>
                {count}
              </Text>
            </PeopleCount>
            <AiOutlinePlusCircle onClick={plusBtn} />
          </PeopleSelect>
        </PeopleSelectContainer>

        {/* 모임소개 글 */}
        <Inputs textarea name="textarea" value={textarea} onChange={onChange}>
          모임소개
          {/* <InputCheck /> */}
        </Inputs>

        {/* 사진 */}
        <Text margin="20px 0">사진</Text>
        <Picture basic />
      </div>
      <div style={{ position: "fixed", width: "335px", bottom: "20px" }}>
        <Buttons complete _onClick={() => console.log(inputValue)}>
          모임생성
        </Buttons>
      </div>
    </Container>
  )
}

const Grid = styled.div`
  margin-top: 20px;
`

const PeopleCount = styled.div`
  width: 50px;
`

const PeopleSelectContainer = styled.div`
  margin: 24px 0;
  display: flex;
  position: relative;
  align-items: center;
`

const PeopleSelect = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
`