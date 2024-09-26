import React, { useEffect, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../redux/actions/listActions";
import { AuthContext } from '../../context/AuthContext';
import fetchLocations from './fetchLoc';

const PlanInfo = ({ setPositions, contentId }) => {
    const dispatch = useDispatch();
    const allLists = useSelector((state) => state.lists.lists);
    const { isAuthenticated, userInfo } = useContext(AuthContext);

    const lists = useMemo(()=>{     //useEffect에 객체 전달로 인한 리랜더링 방지
        if(isAuthenticated && userInfo){
            return allLists.filter(list => list.user_content_id === contentId);
        }
        return [];
    }, [allLists, isAuthenticated, userInfo, contentId]);

    useEffect(() => {
        dispatch(fetchLists());
    }, [dispatch]);    

    useEffect(() => {
        if (lists.length > 0) {
            (async () => {
                const locations = await fetchLocations(lists);
                setPositions(locations);
            })();
        }
    }, [lists, setPositions]);

    return null;
}

export default PlanInfo;