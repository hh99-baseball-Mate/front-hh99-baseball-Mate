import React, { useEffect, useState } from "react"
import { Container } from "../components"

export const KaKaoMap = ({ setLocation, setShowModal }) => {
  const { kakao } = window

  useEffect(() => {
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 9, // 지도의 확대 레벨
      }

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption)

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places()

    // 키워드로 장소를 검색합니다
    ps.keywordSearch("레전드야구존", placesSearchCB)
    ps.keywordSearch("스트라이크존", placesSearchCB)
    ps.keywordSearch("리얼야구존", placesSearchCB)

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      console.log("검색완료")

      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        // navigator.geolocation.getCurrentPosition((position) => {
        //   var lat = position.coords.latitude
        //   var lon = position.coords.longitude

        // var bounds = new kakao.maps.LatLngBounds(lat, lon)

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i])
          // bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds)
        // })
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(34, 34), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      )
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      })

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>",
          setLocation(place.place_name),
          setShowModal(false)
        )
        infowindow.open(map, marker)
      })
    }

    var zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)
  }, [])
  return (
    <Container>
      <div
        style={{ width: "375px", height: "650px", margin: "0px -20px 0" }}
        id="map"
      ></div>
    </Container>
  )
}
