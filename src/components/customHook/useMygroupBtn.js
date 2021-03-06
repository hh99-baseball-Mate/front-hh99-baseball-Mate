import React, { useState } from "react"

export const useMygroupBtn = (setShowModal) => {
  const [allList, setAllList] = useState(true)
  const [game, setGame] = useState(false)
  const [screen, setScreen] = useState(false)

  // 내모임에서 모달필터 커스텀 훅

  // 전체보기 버튼
  const allListBtn = () => {
    setAllList(true)
    setGame(false)
    setScreen(false)
    setShowModal(false)
  }

  // 경기만 보기 버튼
  const partiBtn = () => {
    setGame(true)
    setAllList(false)
    setScreen(false)
    setShowModal(false)
  }

  // 스크린만 보기 버튼
  const writeBtn = () => {
    setScreen(true)
    setAllList(false)
    setGame(false)
    setShowModal(false)
  }
  return [allListBtn, partiBtn, writeBtn, allList, game, screen]
}
