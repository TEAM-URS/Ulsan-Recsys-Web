import React, { useEffect } from 'react'

const kakao = window.kakao;

const ShowMap=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(35.5383773, 129.3113596),
      level: 6
    };

    new kakao.maps.Map(container, options);
  });

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
    )
}

export default ShowMap;