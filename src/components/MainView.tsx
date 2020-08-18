import React from "react";
import FullView from "./FullView";
import OverView from "./OverView";
import Navigation from "./Navigation";

type View = "over" | "full";
type MainViewState = {
    view: View;
    entryIndex: number;
    imageIndex: number;
};

export default class MainView extends React.Component<{}, MainViewState> {
    private static yPos = window.scrollY;

    public constructor(props: {}) {
        super(props);

        this.state = {
            view: "over",
            entryIndex: 0,
            imageIndex: 0
        };

        this.toggleFullView = this.toggleFullView.bind(this);
        this.toggleOverView = this.toggleOverView.bind(this);
    }
    
    public readonly render = () => {
        if (this.state.view === "full") {
            return <FullView
                initialEntryIndex={this.state.entryIndex}
                initialImageIndex={this.state.imageIndex}
                toggleOverView={this.toggleOverView}
            />;
        } else {
            return (
                <div>
                    <Navigation />
                    <main>
                        <OverView toggleFullView={this.toggleFullView} />
                    </main>
                </div>
            );
        }
    }

    private readonly onViewChange = (view: View) => {
        this.setState({ view: view });

        if (view === "full") {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            }
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }           
        }
    }

    private readonly toggleFullView = (entryIndex?: number, imageIndex?: number) => {
        this.onViewChange("full");
        this.setState({ entryIndex: entryIndex || 0, imageIndex: imageIndex || 0 });
    }

    private readonly toggleOverView = () => this.onViewChange("over");
}
