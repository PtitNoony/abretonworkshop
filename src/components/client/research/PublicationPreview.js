import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';


//TODO in functinal component

export default class PublicationPreview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="abw_researchPublicationPreview" >
                    <div className="abw_researchPublicationPreview_container">
                        <div className="abw_researchPublicationPreview_year">
                            <h3 style={{color:publiYearColor(this.props.p)}}>{this.props.p.year}</h3>
                        </div>
                        <div className="abw_researchPublicationPreview_content">
                            <h3 className="abw_researchPublicationTitle">{this.props.p.title}</h3>
                            <p className="abw_researchPublicationAuthor">{this.props.p.authors.map(a => <span>{a}, { }</span>)}</p>
                            <p className="abw_researchPublicationIn">{this.props.p.in}</p>
                        </div>
                    </div>
                </div>
                );
    }
}

function publiYearColor(publi){
    var color = "whitesmoke";
    if(publi.type === "int_conf"){
        color= "#0073e6";
    }else if(publi.type === "int_workshop"){
        color= "#ffcc00";
    }else if(publi.type === "phd"){
        color= "#008000";
    }
    return color;
}