import React from "react";
import { generateImageDescription, generateImage, generateDateString } from "../util/generate";
import ENTRIES from "../util/Entry";
import DetailContainer from "./DetailContainer";

type EntryProps = {
    id: string;
    date: Date | null;
    images: string[] | null;
    description: string | null;
    onClick: (imageIndex: number) => void;
}

const Entry = (props: EntryProps) => {
    const renderDetails = () => {
        if (props.date) return <DetailContainer details={[generateDateString(props.date)]} />;
    }

    const renderImages = () => {
        if (props.images) return props.images.map((name, index) => <img
            src={generateImage(name)}
            alt={generateImageDescription(props.date)}
            key={`img-${name}`}
            onClick={() => props.onClick(index)}
        />);
    }

    const renderDescription = () => {
        if (props.description) return <p>{props.description}</p>;
    }

    return (
        <section className="entry" id={`entry-${props.id}`}>
            {renderDetails()}
            <div className="content">
                {renderImages()}
                {renderDescription()}
            </div>
        </section>
    );
}

type OverViewProps = { toggleFullView: (entryIndex?: number, imageIndex?: number) => void };

export default class OverView extends React.Component<OverViewProps> {
    private static yPos = window.scrollY;

    public readonly componentDidMount = () => window.scroll({ top: OverView.yPos });

    public readonly componentWillUnmount = () => OverView.yPos = window.scrollY;

    public readonly render = () => (
        <div className="overview">
            <h1>Ein kleines Tagebuch in der Coron-Krise 2020 im Architekturbüro Schoeps & Schlüter mit Bildern von Klaus-Dieter Hedwig</h1>
            {this.renderEntries()}
            
            <section className="action-buttons">
                <button className="action" onClick={() => this.props.toggleFullView()}>
                    <span className="material-icons">fullscreen</span>
                </button>
            </section>
        </div>
    );

    private readonly renderEntries = () => ENTRIES.map((entry, entryIndex) => <Entry
        id={entry.key}
        date={entry.date}
        description={entry.description}
        images={entry.images}
        key={`over-${entry.key}`}
        onClick={(imageIndex) => this.props.toggleFullView(entryIndex, imageIndex)}
    />);
}
