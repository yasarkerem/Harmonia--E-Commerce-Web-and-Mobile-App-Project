import React from 'react';
import {useLocation} from 'react-router-dom';

function PageNotFound(){

    let location = useLocation();

    return (
        <div>
            Sorry, the page {location.pathname} doesn't exist!
        </div>
    )
}
export default PageNotFound;