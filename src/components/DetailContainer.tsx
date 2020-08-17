import React from "react";
import { generateKey } from "../util/generate";

type DetailContainerProps = { details: string[] };

const DetailContainer = (props: DetailContainerProps) => {
    const renderDetails = () => props.details.map(detail => (
        <div className="detail" key={generateKey()}>
            <span className="material-icons">event</span>
            <span className="description">{detail}</span>
        </div>
    ));

    if (!props.details) return null;
    else return (
        <div className="details">
            {renderDetails()}
        </div>
    );
}

export default DetailContainer;
