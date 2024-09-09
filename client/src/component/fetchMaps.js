import { useEffect, useState } from "react";
import fetchLocations from "./fetchLoc";
import "../css/list_map.css";

const { kakao } = window;

const useFetchMaps = ({ content }) => {
    const [locations, setLocations] = useState([]);  // 위치 상태를 추가
    const [mapDetails, setMapDetails] = useState({ option: {}, markers: [] });
    
    useEffect(() => {
        const fetchLoc = async () => {
            if (content && content.length > 0) {
                const locs = await fetchLocations(content);
                if (locs) {
                    setLocations(locs);
                }
            }
        };
        fetchLoc();
    }, [content]);

    useEffect(() => {
        if (locations.length > 0) {
            const options = {
                center: locations[0].latlng,
                level: 4
            };
            
            const markers = locations.map(loc => new kakao.maps.Marker({
                position: loc.latlng,
                clickable: true
            }));

            const overlays = locations.map((loc, index) => {
                const imgSrc = content[index]?.img_src;
                const infoText = content[index]?.content || '정보 없음';

                const contentDiv = document.createElement('div');
                contentDiv.className = 'customoverlay';
                
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imgElement.style.width = '150px';
                imgElement.style.height = '150px';

                const textBox = document.createElement('div');
                textBox.className = 'text-box';
                textBox.innerHTML = infoText;

                textBox.addEventListener('click', () => {
                    if (textBox.style.height === '140px') {
                        textBox.style.height = 'auto';
                    } else {
                        textBox.style.height = '140px';
                    }
                });

                contentDiv.appendChild(imgElement);
                contentDiv.appendChild(textBox);

                const overlay = new kakao.maps.CustomOverlay({
                    content: contentDiv,
                    position: loc.latlng,
                    xAnchor: -0.1,
                    yAnchor: 0.6
                });

                return overlay;
            });

            setMapDetails({
                option: options,
                markers: markers,
                overlays: overlays,
            });
        }
    }, [locations]);

    return mapDetails;
};

export default useFetchMaps;