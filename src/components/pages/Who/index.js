import React from "react";
import './styles.css';
import "react-bulma-components/dist/react-bulma-components.min.css";
import Chip from '../Who/images/Chip.jpg';
import Jason from '../Who/images/Jason.jpg';
import Mason from '../Who/images/Mason.jpg';
import Micah from '../Who/images/Micah.jpg';


const Who = () => {
    return (
        <div className="who-container">
            <div className="columns is-desktop">
                <div className="column animate__animated animate__fadeInDownBig">
                    <article className="media">
                        <div className="media-left">
                            <figure className="image">
                                <img src={Jason} 
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    window.open("https://github.com/jaswhitehead", "Popup", "width=580, height=600, top=30")
                                }}
                                alt="Jason Whitehead" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>Jason Whitehead</strong>&nbsp;&nbsp;&nbsp;<i className="fab fa-twitter"></i><small> @JasonWhitehead2</small>
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean efficitur sit amet massa fringilla egestas. Nullam
                                    condimentum luctus turpis.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean efficitur sit amet massa fringilla egestas. Nullam
                                    condimentum luctus turpis.
                                </p>
                            </div>
                            <nav className="level is-desktop">
                                <div className="level-left">
                                    <a className="level-item" aria-label="reply" href="mailto:jaswhitehead@gmail.com">
                                        <span className="icons">
                                            <i className="fas fa-envelope fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a className="level-item" 
                                        aria-label="linkedIn" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                        window.open("https://www.linkedin.com/in/jasonwhitehead1/", "Popup", "width=580, height=600, top=30")
                                        }} >
                                        <span className="icons">
                                            <i className="fab fa-linkedin fa-2x" aria-hidden="true" />
                                        </span>
                                    </a>
                                    <a className="level-item" 
                                        aria-label="github"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                        window.open("https://github.com/jaswhitehead", "Popup", "width=580, height=600, top=30")
                                        }} >
                                        <span className="icons">
                                            <i className="fab fa-github fa-2x" aria-hidden="true" />
                                        </span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>

                <div className="column animate__animated animate__fadeInRightBig">
                    <article className="media">
                        <div className="media-left">
                            <figure className="image">
                                <img src={Chip} 
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    window.open("https://github.com/cjohnson1580", "Popup", "width=580, height=600, top=30")
                                }}                                
                                alt="Chip Johnson" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>Chip Johnson</strong>&nbsp;&nbsp;&nbsp;<i className="fab fa-twitter"></i><small> @ChipJohsnon</small>
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean efficitur sit amet massa fringilla egestas. Nullam
                                    condimentum luctus turpis.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean efficitur sit amet massa fringilla egestas. Nullam
                                    condimentum luctus turpis.
                                </p>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-left">
                                    <a className="level-item" aria-label="reply" href="mailto:cjohnson1580@gmail.com" target="blank">
                                        <span className="icons">
                                            <i className="fas fa-envelope fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a className="level-item" 
                                        aria-label="linkedIn" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                        window.open("https://www.linkedin.com/in/chip-johnson-17077839/", "Popup", "width=580, height=600, top=30")
                                        }} >
                                        <span className="icons">
                                            <i className="fab fa-linkedin fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a className="level-item" 
                                        aria-label="github" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                        window.open("https://github.com/cjohnson1580", "Popup", "width=580, height=600, top=30")
                                        }} >
                                        <span className="icons">
                                            <i className="fab fa-github fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>
            </div>

            <div className="columns">
                <div className="column animate__animated animate__fadeInLeftBig">
                    <article className="media">
                        <div className="media-left">
                            <figure className="image">
                                <img src={Micah} 
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    window.open("https://github.com/micahslea", "Popup", "width=580, height=600, top=30")
                                }}   
                                alt="Micah Lea" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>Micah Lea</strong>&nbsp;&nbsp;&nbsp;<i className="fab fa-twitter"></i><small> @MicahLea</small>
                                    <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aenean efficitur sit amet massa fringilla egestas. Nullam
                                        condimentum luctus turpis.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aenean efficitur sit amet massa fringilla egestas. Nullam
                                        condimentum luctus turpis.
                                    </p>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-left">
                                    <a className="level-item" aria-label="reply" href="mailto:jaswhitehead@gmail.com">
                                        <span className="icons">
                                            <i className="fas fa-envelope fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a className="level-item" 
                                        aria-label="LinkedIn"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                        window.open("https://www.linkedin.com/in/micah-lea-36357511/", "Popup", "width=580, height=600, top=30")
                                        }} >
                                        <span className="icons">
                                            <i className="fab fa-linkedin fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a className="level-item" 
                                        aria-label="GitHub" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                        window.open("https://github.com/micahslea", "Popup", "width=580, height=600, top=30")
                                        }} >
                                        <span className="icons">
                                            <i className="fab fa-github fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>
                <div className="column animate__animated animate__fadeInUpBig">
                    <article className="media">
                        <div className="media-left">
                            <figure className="image">
                                <img src={Mason} 
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    window.open("https://github.com/Mason-Shadrick", "Popup", "width=580, height=600, top=30")
                                }}   
                                alt="Mason Shadrick" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>Mason Shadrick</strong>&nbsp;&nbsp;&nbsp;<i className="fab fa-twitter"></i><small> @MasonShadrick</small>
                                    <br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aenean efficitur sit amet massa fringilla egestas. Nullam
                                        condimentum luctus turpis.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aenean efficitur sit amet massa fringilla egestas. Nullam
                                        condimentum luctus turpis.
                                    </p>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-left">
                                    <a className="level-item" aria-label="reply" href="mailto:jaswhitehead@gmail.com">
                                        <span className="icons">
                                            <i className="fas fa-envelope fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a className="level-item" 
                                        aria-label="linkedIn"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                        window.open("https://www.linkedin.com/in/masondshadrick/", "Popup", "width=580, height=600, top=30")
                                        }} >
                                        <span className="icons">
                                            <i className="fab fa-linkedin fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                    <a className="level-item" 
                                        aria-label="github" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                        window.open("https://github.com/Mason-Shadrick", "Popup", "width=580, height=600, top=30")
                                        }} >
                                        <span className="icons">
                                            <i className="fab fa-github fa-2x" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>
            </div>
        </div>

    )
};

export default Who;