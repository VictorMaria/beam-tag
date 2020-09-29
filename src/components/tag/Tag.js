import React from 'react';
import { FaCheck } from "react-icons/fa";
import '../styles.css';

const Clipoard = ({ onClickBeamToPhone, onClickReflectPhone, beamSuccessful, reflectionSuccessful, onClickClearLocalStorage }) => {
    return (
        <div>
            <h3>Let Your Devices chat</h3>
            <div className="input-div">
                    <button
                        className="tag-action"
                        onClick={onClickBeamToPhone}
                        >
                      Beam To Phone      
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {
                       beamSuccessful ?
                       (<FaCheck style={{ color: "palegoldenrod", fontSize: 17 }}/>) :
                       (<FaCheck style={{ color: "#85a2b6", fontSize: 17 }}/>)
                   }
                </div>
                <div className="input-div">
                    <button
                        className="tag-action"
                        onClick={onClickReflectPhone}
                        >
                      Reflect Phone
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                   {
                       reflectionSuccessful ?
                       (<FaCheck style={{ color: "palegoldenrod", fontSize: 17 }}/>) :
                       (<FaCheck style={{ color: "#85a2b6", fontSize: 17 }}/>)
                   }    
                </div>
                <span onClick={onClickClearLocalStorage}>Sign Out</span>
        </div>
    )
};

export default Clipoard;
