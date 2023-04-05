import React, { useEffect } from 'react'

const kakao = window.kakao;
let map = null; 
let places = {};

const ShowMap=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(35.5383773, 129.3113596),
      level: 6
    };

    map = new kakao.maps.Map(container, options);
  });

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
    )
}

export function saveCoordinatesToAddress(addresses) {
  return new Promise(function(resolve, reject) {
    places = [];
    var geocoder = new kakao.maps.services.Geocoder();

    addresses.forEach((address, index) => {
      geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {

          places[index] = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 모든 주소 변환 작업이 완료되면 resolve()를 실행합니다.
          if (index === addresses.length - 1) {
            resolve();
          }
        } else {
          console.log(`Error : ${address}를 찾지 못했습니다.`)
          reject(new Error('주소 변환 실패'));
        }
      });
    });
  });   
}

export function cordinatesToMarker() {

  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

  // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
  var bounds = new kakao.maps.LatLngBounds();

  for (const prop in places) {

    var marker = null;

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    // 마커를 생성합니다
    marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: places[prop], // 마커를 표시할 위치
        image : markerImage // 마커 이미지 
    });
    marker.setMap(map);

    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(places[prop]); 
  }

  map.setBounds(bounds);
}

export default ShowMap;