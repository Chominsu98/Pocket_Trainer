import React, { Component } from 'react';
import humanIcon from '../../icons/human.png'
import timerIcon from '../../icons/timer.png'
import switchCameraIcon from '../../icons/switchCamera.png'
import takePhotoImgIcon from '../../icons/takePhoto.png'
import '../../css/OnBoarding/ScanPage.css';


class ScanPage extends Component {
    render() {
    return (
    <div className="ScanPage">
        <div className="GNB">가이드에 맞춰 서 주세요</div>
        
        <div className="mainsource">
            <div className="humanIcon">
                <img src={humanIcon} alt="" />
            </div>

            <div className="upLineIcon">
                <img id="timerIcon" src={timerIcon} alt="" />
                <img id="switchCameraIcon" src={switchCameraIcon} alt="" />   
            </div> 
            <div className="downLineIcon">
                <img src={takePhotoImgIcon} alt="" onClick={function(e){
                    e.preventDefault();
                    this.props.goResultPage();
                }.bind(this)}/> 
            </div> 
        </div>
    </div>
    );
  }
}

export default ScanPage;