import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "./styles.css";
import Typed from 'react-typed';



const Feedback = () => {
    return (
        <div className="hero">
            <div className="notification-feedback is-desktop">
                <div className="field">
                    <label class="label"><i class="fas fa-user"></i> Your Name:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="John Doe..."
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label"><i class="fas fa-envelope"></i> Email Address:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            placeholder="joesomebody@email.net"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Subject</label>
                    <div className="control">
                        <div className="select">
                            <select>
                                <option>Select dropdown</option>
                                <option>General Inquiry</option>
                                <option>Issue with the Website</option>
                                <option>Employment Opportunities</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field1">
                    <label className="label"><i class="fas fa-pencil-alt"></i> Message:</label>
                    <div className="control">
                        <Typed
                            strings={[
                                "Hello, \n\nThis is a really great looking website. Thanks for making vacation property fairly priced and easy again. I am so excited to start finding properties the way it should be done and not the old fashioned way of set prices. \n\n- Joe Somebody",
                                "To Whom it May Concern: \n\nAre you currently looking to hire for any coding positions? I love how dynamic the content of this app is and I would love to become part of the team.\n\n-James Zimmerman",
                            ]}
                            typeSpeed={30}
                            backSpeed={10}
                            attr="placeholder"
                            loop
                        >
                            <textarea className="typed2" type="text" />
                        </Typed>
                    </div>

                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Feedback;