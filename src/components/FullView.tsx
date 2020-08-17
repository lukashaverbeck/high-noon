import React from "react";
import ENTRIES from "../util/Entry";
import DetailContainer from "./DetailContainer";
import { generateDateString, generateImage, generateImageDescription } from "../util/generate";
import { DIASHOW_INTERVAL } from "../util/constants";

type FullViewProps = {
    initialEntryIndex: number;
    initialImageIndex: number;
    toggleOverView: () => void;
}

type FullViewState = {
    diashow: boolean;
    entryIndex: number;
    imageIndex: number;
}

export default class FullView extends React.Component<FullViewProps, FullViewState> {
    private diashowTimeout: NodeJS.Timeout | null = null;

    public constructor(props: FullViewProps) {
        super(props);
        
        this.state = {
            diashow: true,
            entryIndex: props.initialEntryIndex,
            imageIndex: props.initialImageIndex
        };

        this.toggleDiashow = this.toggleDiashow.bind(this);
    }

    public readonly componentDidMount = () => {
        this.startDiashow();

        window.addEventListener("keydown", event => {
            if (event.keyCode === 37) this.previous();
            else if (event.keyCode === 39) this.next();
        });
    }

    public readonly componentDidUpdate = () => {
        if (this.state.diashow) {
            this.startDiashow();
        }
    }

    public readonly componentWillUnmount = () => {
        this.clearDiashowTimeout();
    }

    public readonly render = () => (
        <div className="fullview">
            {this.renderDetails()}
            {this.renderImage()}
            {this.renderDescription()}
            
            <section className="action-buttons">
                <button className="action" onClick={this.toggleDiashow}>
                    <span className="material-icons">{this.state.diashow ? "pause" : "play_arrow"}</span>
                </button>

                <button className="action" onClick={this.props.toggleOverView}>
                    <span className="material-icons">close</span>
                </button>
            </section>

            <button className="action bottom left" onClick={this.previous}>
                <span className="material-icons">chevron_left</span>
            </button>

            <button className="action bottom right" onClick={this.next}>
                <span className="material-icons">chevron_right</span>
            </button>
        </div>
    );
    
    private readonly renderDetails = () => {
        const entry = ENTRIES[this.state.entryIndex];
        if (entry.date) return <DetailContainer details={[generateDateString(entry.date)]} />
    }

    private readonly renderImage = () => {
        const entry = ENTRIES[this.state.entryIndex];

        if (!entry.images || this.state.imageIndex >= entry.images.length) return null;
        else return (
            <div className={entry.description ? "image" : "image full"}>
                <img src={generateImage(entry.images[this.state.imageIndex])} alt={generateImageDescription(entry.date)} />
            </div>
        );
    }

    private readonly renderDescription = () => {
        const entry = ENTRIES[this.state.entryIndex];
        
        if (!entry.description) return null;
        else return (
            <div className={entry.images && entry.images.length > 0 ? "description" : "description full"}>
                <p>{entry.description}</p>
            </div>
        );
    }

    private readonly next = () => {
        const entry = ENTRIES[this.state.entryIndex];

        if (!entry.images || this.state.imageIndex >= entry.images.length - 1) {
            if (this.state.entryIndex < ENTRIES.length - 1) {
                this.setState({ entryIndex: this.state.entryIndex + 1, imageIndex: 0 });
            }
        } else {
            this.setState({ imageIndex: this.state.imageIndex + 1 });
        }
    }

    private readonly previous = () => {
        const entry = ENTRIES[this.state.entryIndex];

        if (!entry.images || this.state.imageIndex <= 0) {
            if (this.state.entryIndex > 0) {
                const previousEntry = ENTRIES[this.state.entryIndex - 1];
                this.setState({ entryIndex: this.state.entryIndex - 1, imageIndex: previousEntry.images ? previousEntry.images.length - 1 : 0 });
            }
        } else {
            this.setState({ imageIndex: this.state.imageIndex - 1 });
        }
    }

    private readonly toggleDiashow = () => {
        if (this.state.diashow) this.stopDiashow();
        else this.startDiashow();
    }

    private readonly startDiashow = () => {
        this.clearDiashowTimeout();
        this.diashowTimeout = setTimeout(this.next, DIASHOW_INTERVAL);
        
        if (!this.state.diashow) {
            this.setState({ diashow: true });
        }
    }

    private readonly stopDiashow = () => {
        this.clearDiashowTimeout();
        if (this.state.diashow) {
            this.setState({ diashow: false });
        }
    }

    private readonly clearDiashowTimeout = () => {
        if (this.diashowTimeout) {
            clearTimeout(this.diashowTimeout);
        }
    }
}