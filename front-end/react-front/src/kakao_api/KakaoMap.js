import React, { useEffect } from 'react'

// kakaolmaps 객체 참조
var kakao = window.kakao;
// event 모듈 가져오기
var event = kakao.maps.event;
// 지도를 담을 영역의 DOM 레퍼런스
let map = null; 
// 좌표를 담을 오브젝트
let places = {};

var MARKER_WIDTH = 33, // 기본, 클릭 마커의 너비
    MARKER_HEIGHT = 36, // 기본, 클릭 마커의 높이
    OFFSET_X = 12, // 기본, 클릭 마커의 기준 X좌표
    OFFSET_Y = MARKER_HEIGHT, // 기본, 클릭 마커의 기준 Y좌표
    OVER_MARKER_WIDTH = 40, // 오버 마커의 너비
    OVER_MARKER_HEIGHT = 42, // 오버 마커의 높이
    OVER_OFFSET_X = 13, // 오버 마커의 기준 X좌표
    OVER_OFFSET_Y = OVER_MARKER_HEIGHT, // 오버 마커의 기준 Y좌표
    SPRITE_WIDTH = 126, // 스프라이트 이미지 너비
    SPRITE_HEIGHT = 146, // 스프라이트 이미지 높이
    SPRITE_GAP = 10, // 스프라이트 이미지에서 마커간 간격
    SPRITE_MARKER_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png'; // 스프라이트 마커 이미지 URL

var markerSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT), // 기본, 클릭 마커의 크기
    markerOffset = new kakao.maps.Point(OFFSET_X, OFFSET_Y), // 기본, 클릭 마커의 기준좌표
    overMarkerSize = new kakao.maps.Size(OVER_MARKER_WIDTH, OVER_MARKER_HEIGHT), // 오버 마커의 크기
    overMarkerOffset = new kakao.maps.Point(OVER_OFFSET_X, OVER_OFFSET_Y), // 오버 마커의 기준 좌표
    spriteImageSize = new kakao.maps.Size(SPRITE_WIDTH, SPRITE_HEIGHT); // 스프라이트 이미지의 크기

var selectedMarker = null;

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
          <div id="map" style={{ width: '100%', height: '100%' }}>
            <button
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                padding: '10px',
                background: 'white',
                border: '1px solid black',
                borderRadius: '5px',
                zIndex: 10,
              }}
            onClick={() => {console.log('hello!!')}}></button>
          </div>
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

export function initMarker(parentRef) {
  setTimeout(() => {
  }, 1000);

  var bounds = new kakao.maps.LatLngBounds();

  var i = 0;

  for (const prop in places) {
    var gapX = (MARKER_WIDTH + SPRITE_GAP), // 스프라이트 이미지에서 마커로 사용할 이미지 X좌표 간격 값
        originY = (MARKER_HEIGHT + SPRITE_GAP) * i, // 스프라이트 이미지에서 기본, 클릭 마커로 사용할 Y좌표 값
        overOriginY = (OVER_MARKER_HEIGHT + SPRITE_GAP) * i, // 스프라이트 이미지에서 오버 마커로 사용할 Y좌표 값
        normalOrigin = new kakao.maps.Point(0, originY), // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
        clickOrigin = new kakao.maps.Point(gapX, originY), // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
        overOrigin = new kakao.maps.Point(gapX * 2, overOriginY); // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

    addMarker(prop, places[prop], normalOrigin, overOrigin, clickOrigin, parentRef);
    
    bounds.extend(places[prop]); 

    i = (i + 1) % 3;
  }

  map.setBounds(bounds);
}

function addMarker(index, position, normalOrigin, overOrigin, clickOrigin, parentRef) {
  var normalImage = createMarkerImage(markerSize, markerOffset, normalOrigin), // 기본 마커 이미지
      overImage = createMarkerImage(markerSize, markerOffset, overOrigin), // 오버 마커 이미지
      clickImage = createMarkerImage(markerSize, markerOffset, clickOrigin); // 클릭 마커 이미지

  // 마커를 생성하고 이미지는 기본 마커 이미지를 사용
  var marker = new kakao.maps.Marker({
    map: map,
    position: position,
    image: normalImage,
  });

  // 마커 객체애 마커아이디와 마커의 기본 이미지를 추가
  marker.normalImage = normalImage;

  event.addListener(marker, 'mouseover', function () {
    // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아닐 경우
    // 마커의 이미지를 오버 이미지로 변경
    if (!selectedMarker || selectedMarker !== marker) {
      marker.setImage(overImage);
    }
  });

  event.addListener(marker, 'mouseout', function () {
    // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아닐 경우
    // 마커의 이미지를 기본 이미지로 변경
    if (!selectedMarker || selectedMarker !== marker) {
      marker.setImage(normalImage);
    }
  });

  event.addListener(marker, 'click', function () {
    // 클릭된 마커가 없고 click 마커가 클릭된 마커가 아니면
    // 마커의 이미지를 클릭 이미지로 변경

      // 클릭된 마커 객체가 null이 아니면
      // 클릭된 마커의 이미지를 기본 이미지로 변경
      !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

      // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경
      marker.setImage(clickImage);

      // 사이드바를 호출하여 값 초기화
      parentRef.current.setTitle(index);
      parentRef.current.setMenuOpen();
      parentRef.current.setScrollTop();

    // 클릭된 마커를 현재 클릭된 마커 객체로 설정
    selectedMarker = marker;
  });
}

function createMarkerImage(markerSize, offset, spriteOrigin) {
  var markerImage = new kakao.maps.MarkerImage(
    SPRITE_MARKER_URL,
    markerSize,
    {
      offset: offset,
      spriteOrigin: spriteOrigin,
      spriteSize: spriteImageSize,
    }
  );

  return markerImage;
}

export default ShowMap;