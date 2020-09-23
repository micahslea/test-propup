import React from 'react';

export default function Input(props) {
    return (
        <div className="row" id="local">
            <div className="col-md-6">
                <h1 className="title">Today's Weather</h1>
            </div>

            <div className="columns">
                <div className="column">
                    <label>Search by city or zip code:</label>
                    <form className="region" onSubmit={(e) => { props.changeLocation(e) }}>
                        <input type="text" className="regioninput" placeholder="Enter any city" onChange={(e) => { props.changeRegion(e.target.value) }} />
                    </form>
                </div>
            </div>

        </div>
    )
}