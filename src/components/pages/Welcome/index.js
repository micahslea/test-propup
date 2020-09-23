import React from "react";
import './styles.css';
import "react-bulma-components/dist/react-bulma-components.min.css";
import Announcer from '../Welcome/Announcer.gif';
import SignUp from '../Welcome/SignUp.gif';
import Search from '../Welcome/Search.gif';
import Keys from '../Welcome/keys.jpg';
import Collect from '../Welcome/collect.jpg'; 
import GetResults from '../Welcome/GetResults.gif';
import Enjoy from '../Welcome/Superman.gif';

const Welcome = () => {
    return (
        <div className="wrapper">            
            <div className="columns is-desktop is-centered animate__animated animate__backInDown">
                <div className="column is-half">
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="14000">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lets Walk you Through Getting Started:</h3>
                                <img src={Announcer} alt="Demo1" />                            
                            </div>
                            <div className="carousel-item">
                            <h3>First: Sign Up for an Acccount</h3>
                                <img src={SignUp} alt="SignUp" />
                            </div>
                            <div className="carousel-item">
                            <h3>Second: Start Your Search</h3>
                                <img src={Search} alt="" />
                            </div>
                            <div className="carousel-item">
                            <h3>Browse your results and make a Bid!</h3>
                                <img src={GetResults} alt="Results" />
                            </div>
                            <div className="carousel-item">
                            <h3>Time to go Have Some Fun!</h3>
                                <img src={Enjoy} alt="Have Fun" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                            <span className="prev">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="next">Next</span>
                            <span className="carousel-control-next-icon"></span>                            
                        </a>
                    </div>    
                </div>
            </div>

            <div className="columns is-desktop is-centered">
                <div className="column is-two-fifths animate__animated animate__backInUp">
                    <article className="message">
                        <div className="message-header">
                            <p className="start">How does the bidding system work?</p>
                        </div>
                        <div className="message-body">
                        <img src={Keys} alt="Keys" id="key" /><br></br><br></br>
                            Unlike other property rental platforms, <strong>PropUp</strong> allows you to make a "proposition" 
                            for the property you want at a price that you feel is fair. If you are the winning bid,
                            the property is yours at the price you set. If someone outbids you, the power is in your hands 
                            to decide whether you want to pay more or look for another property to rent. With <strong>PropUp </strong>
                            you can ensure that you will never pay more than you expect.
                        </div>
                    </article>
                </div>
                <div className="column is-two-fifths animate__animated animate__backInUp">
                    <article className="message">
                        <div className="message-header">
                            <p className="start">How do I put my property to work for me?</p>
                        </div>
                        <div className="message-body">
                        <img src={Collect} alt="Collect" /><br></br><br></br>
                            <strong>PropUp</strong> allows you to set the minimum bid for your property, so you never get
                            less than you expect. Most property managers dont have time to keep up with events and market
                            trends though. If your property is more desirable than usual because of a concert, convention
                            or other unusual event, your customers have the opportunity to outbid one another and drive up
                            the avearage per night cost for your unit without you touching a thing.
                        </div>
                    </article>
                </div>
            </div>
            <div className="column is-desktop">
                <a className="button get-started" href="/Signup">
                    <strong>Sign Up Now!</strong>
                </a>
            </div>
        </div>
    )
};

export default Welcome;