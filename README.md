<img width="30%" src="https://user-images.githubusercontent.com/85838870/144558296-c4608892-9081-401f-b774-d3c0a4c2573e.png" alt="meetball">
 <h2>같이 야구보러 가지 않을래?</h2>

<br/>

<img width="100%" src="https://user-images.githubusercontent.com/85838870/144558574-d6a0b1fc-090e-4c3d-b582-55d07c1ec4f3.jpg" alt="meetball">

<br/>

[사이트 링크 바로가기](https://meetball.shop/)

<br/>
# 🚩 목차

- [🚩 목차](#-목차)
  - [👩‍👦‍👦 meetball이란?](#-meetball이란)
  - [프로젝트 기간](#프로젝트-기간)
  - [팀원👨‍👨‍👦‍👦](#팀원)
    - [🎥 시연 영상](#-시연-영상)
  - [📚 프로젝트 아키텍처](#-프로젝트-아키텍처)
  - [🛠 Package](#-package)
  - [📌 유저 피드백 및 개선사항](#-유저-피드백-및-개선사항)
  - [페이지 구성📖](#페이지-구성)
  - [💪 역할 분담](#-역할-분담)

## 👩‍👦‍👦 meetball이란?

- 뿔뿔이 흩어진 야구 러버들을 위해, 야구 짇관을 같이 하고 싶은 사람들의 모임을 만들 수 있고 원활한 의사소통을 할 수 있게 하는 서비스
- -다양한 사람들과 야구 경기를 보고 싶은 사람들을 위해, 그냥 야구가 좋은 사람들도 부담없이 이용할 수 있는 야구 모임 형성 서비스
- 야구 비시즌에는 스크린 야구 모임을 가질 수 있으며 자신이 가진 굿즈를 자랑하며 소통하는 서비스

## 프로젝트 기간

- 21.10.23(토) - 21.12.04(금)

## 팀원👨‍👨‍👦‍👦

- Frontend : [주재일](https://github.com/jaeilnet), [최진식](https://github.com/lipton-web), [신유빈](https://github.com/sinyubin) `React`
- Backend : 김태웅(팀장님), 정영호, 정희윤`Spring`
- Designer : 구선주, 김효진 `UX/UI`

<br/>

- 📝[노션 정보](https://www.notion.so/99-11-4c5e4442ffea452baaf6b130329cc42d)
- 📁[백엔드 깃헙](https://github.com/slsnrnsep/Hanghae99-Finalproject-Backend-Baseballmate)
- 🎨[디자인 작업물](https://www.figma.com/file/sBTrAhbE09znV5ewtHqlpx/baseball-service-project-2021?node-id=0%3A1)
- ⛏[QA 리스트](https://docs.google.com/spreadsheets/d/13MDuHS-sXkQ6DfsqEc9zZM6r1PRwBrr0EIXGdHG6Cdg/edit#gid=0)

<br/>
### 🎥 시연 영상

[![Vue](https://img.youtube.com/vi/cviKHk5Aqi8/0.jpg)](https://youtu.be/cviKHk5Aqi8)

<br/>

## 📚 프로젝트 아키텍처

<img width="100%" alt="패키지" src="https://user-images.githubusercontent.com/85838870/144558214-511ba586-a01f-4284-893c-5b37406848dc.png">

## 🛠 Package

<img width="100%" alt="패키지" src="https://user-images.githubusercontent.com/85838870/144557723-042f65a7-7d2d-4228-af46-7a2d6986ec3b.png">

<br/>

## 📌 유저 피드백 및 개선사항

⛏[QA 리스트](https://docs.google.com/spreadsheets/d/13MDuHS-sXkQ6DfsqEc9zZM6r1PRwBrr0EIXGdHG6Cdg/edit#gid=0)

**1. 디자인 CSS 변경**

- 프로젝트를 하는 도중에 야구 시즌이 끝난는 것을 알게되어 보완하기 위해 스크린야구와 굿즈를 자랑하는 페이지를 만들었고
  더 사용자가 더 원활하게 소통할 수 있도록 기존에 사용했던 타임라인을 게시글에 댓글을 달 수 있는 커뮤니티로 변경하였습니다.

- 일단 보완된 스크린 야구 페이지는 야구 시즌이 비시즌일 때 사용자들이 사용할 수 있게 만든 페이지이며,사진을 보시다 시피
  지도에서 원하는 스크린 야구장을 선택할 수 있게 만들었고 스크린 야구를 즐기고 싶은 사용자들이 모임을 가질 수 있도록 모임을
  만드는 페이지를 들었습니다.

<img width="50%" alt="피드백" src="https://user-images.githubusercontent.com/85838870/144557767-8b4bd549-fb92-4dc1-833a-4f399534a7a2.png">

<br/>

**2. 페이지 전환시 초기화**

- 수정 전에는 페이지이동을 하면 데이터정보들이 초기화되지만 SESSION Storage를 사용하여 페이지에 데이터정보들을 담아 남아있게 수정하였습니다.

<img width="50%" alt="피드백" src="https://user-images.githubusercontent.com/85838870/144557723-042f65a7-7d2d-4228-af46-7a2d6986ec3b.png">

<br/>

**3. 원활한 의사소통**

- 기존에는 모임 생성을 하는 디테일 페이지에서 방명록을 남겨 소통하는 방식이였으나 사용자들이 소통하는 데 더 원활한 환경을 제공하기 위해 실시간 채팅방을 구현하였습니다.
  프론트엔드에서 채팅구현은 백엔드가 spring이기 때문에 stompjs를 사용하여 채팅을 구현하였습니다.

<img width="50%" alt="피드백" src="https://user-images.githubusercontent.com/85838870/144557677-8885e9bd-09d8-448a-88aa-0a2f39aa6eb8.png">

**4. AWS S3**

- 백엔드에서 이미지 파일을 저장하고 불러오는 방식을 사용했으나, 사용자가 많을 경우 백엔드 쪽 이미지를 저장 할 용량과 프론트에서 데이터를 받아오는 속도가 문제 될 경우를
  우려해서 이미지 파일을 s3 버켓에 저장하고 불러오는 방식으로 수정하였습니다. 수정을 한 뒤에는 통신을 통해 이미지를 받아오지 않고 버켓에 저장 된 이미지 url 만을 사용해서
  불러오므로 확실히 수정전보다 로딩속도가 빨라진 것을 확인할 수 있습니다.

<br/>

## **페이지 구성📖**

- 메인
- 로그인/회원가입/마이페이지
- 경기 모임 페이지/모임 디테일페이지/모임 추가 페이지/일정 페이지
- 스크린 모임 페이지/모임 디테일페이지/모임 추가 페이지/일정 페이지
- 타임라인(한 줄 게시판)[초기] & 커뮤니티[후기]
- 굿즈 페이지/디테일 페이지/모임 추가 페이지
- 채팅 리스트/채팅방
- 알람 페이지
- 내모임 페이지

<br/>

## 💪 역할 분담

- 주재일

        회원가입(fomik -yup vaildation),
        로그인(jwt토큰 쿠키사용) ,
        카카오로그인 ,
        로그인유지(axios 인터셉터),
        마이페이지/ 내모임수정(세션스토리이 글 임시저장) ,
        구단 선택,
        경기일정페이지 기능,
        경기모임 추가(날짜 선택 react-datepicker),
        스크린야구모임생성(카카오 지도 api) ,
       굿즈자랑 (인스타 피드형식 + 좋아요 기능),
       굿즈 생성,
        aws ssl 인증서를 사용한 cloud front https 배포 ,
       aws s3 이미지 업로드(nanoid를 이용한 파일이름 중복방지 암호화)

- 최진식

      경기모임, 스야모임 상세페이지
      (좋아요, 수정, 삭제, 모임확정, 모임취소, 모임참석, 모임취소),
       알람(모집승인, 취소, 일반 알람확인),
        stompjs 실시간 채팅,
        로딩중화면,
        PWA

- 신유빈

      메인 페이지(본인이 선택한 구단의 핫한 모임,
      구단별 선택,일정별 선택),
      스크린 페이지(지역별 선택),
      스크린 디테일 페이지(삭제,등록),
      swiper 커스텀 마이징,
      커뮤니티,커뮤니티 디테일,수정,삭제
      (댓글수정,댓글삭제,댓글등록),
      경기일정페이지(날짜별 경기모음 최대 2주)
      리드미 작성
