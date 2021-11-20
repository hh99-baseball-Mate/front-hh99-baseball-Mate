import React from "react"
import styled from "styled-components"

export const UserProfile = (props) => {
  const { size, url, children } = props
  return (
    <Profile size={size} url={url}>
      {children}
    </Profile>
  )
}

UserProfile.defaultProps = {
  children: null,
  url: "https://img1.daumcdn.net/thumb/S272x320/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQFcXC%2FbtqCFy6Fjlq%2FLKXlrrmaoXVIgFkHXixNr0%2Fimg.jpg",
}

const Profile = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`
