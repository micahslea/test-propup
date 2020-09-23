import React from "react";
import './Events.css';
import "react-bulma-components/dist/react-bulma-components.min.css";




const Events = () => {
  return(
    <div className="hero">
      <div className="container" id="eventcontainer"> 
        <div className="columns is-desktop">

            <div className="column is-one-third">
                <div className="control">
                  <input className="input is-large col-md-6" type="text" id="cities" placeholder="Find things to do" name= "search" />
                </div>
            </div>
          

          <div className="column is-one-third">
              <div className="row text-center">
                <div className="dropdown is-active"> 
                  <div className="dropdown-trigger">    
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                      <div className="dropdown-content">
                        <select>  
                            <option className="dropdown-item" value="1">Performer</option>
                            
                            <hr className="dropdown-divider" />
                            <option className="dropdown-item" value="2">Venue</option>
                            
                            <hr className="dropdown-divider" />
                            <option className="dropdown-item" value="3">Zip Code</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-one-third">
                <button
                  type="button"
                  id="eventsubmit"
                  class="button is-primary text-center"
                  data-toggle="modal"
                  data-target="#citesModal"
                >
                  Search
                </button>
            </div>
        </div>      
        
        <div className="table-container">
          <div className="row">          
            <div className="col-md-6" id="event-wrap">
            
                  {/* The bottom two header should only populate when there are no results to return */}
                  <h1 className="sryMsg"></h1>
                  <h3 className="sryMsgSub"></h3>

                  {/*  response cards for events that do appear will populate in the below div tags */}
                  <div className="headLine"></div>
                  <div className="venueName"></div>
                  <div className="eventLocation"></div>
                  <div className="eventDate"></div>
                  <a href="" className="eventLink"></a>
              </div>                
            </div>
        </div>         

      </div>
    </div>
  
    )
};

export default Events;