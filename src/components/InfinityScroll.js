import React, { useCallback, useEffect } from "react"
import _ from "lodash"

export const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window
    const { scrollHeight } = document.body

    // 스크롤 계산

    // 브라우저 호환 문제로 documentElement(최상위 html) / body(body)

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop

    // 브라우저 총 높이 - 현재화면 총 높이 - 스크롤 숨겨진 높이
    if (scrollHeight - innerHeight - scrollTop < 250) {
      if (!loading) {
        // console.log("무한스크롤")
        return
      }
      callNext()
    }
  }, 300)

  // useCallback 메모이제이션 잠깐 보관한다
  const handleScroll = useCallback(_handleScroll, [loading])

  useEffect(() => {
    if (is_next) {
      window.addEventListener("scroll", handleScroll)
    } else {
      window.removeEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [is_next, loading])

  return <>{children}</>
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
}
