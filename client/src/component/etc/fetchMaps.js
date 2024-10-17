import { useEffect, useState } from "react";
import fetchLocations from "./fetchLoc";
import "../../css/list_map.css";

const { kakao } = window;

const useFetchMaps = ({ content, onImgClick }) => {
    const [locations, setLocations] = useState([]);  // 위치 상태를 추가
    const [mapDetails, setMapDetails] = useState({ option: {}, markers: [] });

    useEffect(() => {
        const fetchLoc = async () => {
            if (content) {
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
                const imgSrc = content[index]?.img_src || '/img/디테일 작성.png';
                const isImg = imgSrc === '/img/디테일 작성.png';
                const infoText = content[index]?.content;

                const contentDiv = document.createElement('div');
                contentDiv.className = 'customoverlay';

                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imgElement.style.width = '150px';
                imgElement.style.height = '150px';

                if(isImg) {
                    contentDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                    contentDiv.style.padding = '5px';
                    contentDiv.style.borderRadius = '5px';
                    contentDiv.style.boxShadow = '0 0 4px rgba(0, 0, 0, 0.3)';
                    contentDiv.style.cursor = 'pointer';
                    imgElement.style.width = '30px';
                    imgElement.style.height = '30px';
                }

                if (infoText) {
                    const textBox = document.createElement('div');
                    textBox.className = 'text_box';
                    textBox.innerHTML = infoText;

                    textBox.addEventListener('click', () => {
                        if (textBox.style.height === '140px') {
                            textBox.style.height = 'auto';
                        } else {
                            textBox.style.height = '140px';
                        }
                    });
                    contentDiv.appendChild(textBox);
                }

                if(isImg) {
                    contentDiv.addEventListener('click', () => {
                        if (onImgClick) {
                            onImgClick(content[index]);
                        }
                    });
                }

                contentDiv.appendChild(imgElement);

                const overlay = new kakao.maps.CustomOverlay({
                    content: contentDiv,
                    position: loc.latlng,
                    xAnchor: 0.485,
                    yAnchor: isImg ? 2.5 : 1.3
                });

                return overlay;
            });

            setMapDetails({
                option: options,
                markers: markers,
                overlays: overlays,
            });
        }
    }, [locations, content]);

    return mapDetails;
};

export default useFetchMaps;