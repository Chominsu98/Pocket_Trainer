import React from 'react';
import Footer from '../SameLayout/Footer';
import InfoCard from './InfoCard';
import InfoMask from './InfoMask';
import ResultCard from './ResultCard';
import style from "../../CustomCss/ExerciseCounter/CardLayout.module.css"


class CardLayout extends React.Component{
    render(){
        return(
            <div>
                <InfoMask/>
                <div class={"container-fluid"+" "+style.bg_card_layout+" "+"mt--7" }>
                    <div className="row" data-component="ProfileCardLayout">
                        <InfoCard/>
                        <div className="col-xl-8 order-xl-1">
                            <ResultCard/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}
export default CardLayout;