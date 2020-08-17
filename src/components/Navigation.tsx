import React from "react";
import DEVICE from "../util/Device";
import ENTRIES from "../util/Entry";

type NavigationState = { currentEntryIndex: number };

let jumping = false;

export default class Navigation extends React.Component<{}, NavigationState> {
    public constructor(props: {}) {
        super(props);
        this.state = { currentEntryIndex: 0 };

        this.onScroll = this.onScroll.bind(this);
        this.onClick = this.onClick.bind(this);

        window.addEventListener("scroll", this.onScroll);
    }

    private readonly onScroll = () => {
        if (!jumping) {
            let firstVisibleEntryWithDate;
            let firstVisibleElementWithDate;
            let i = 0;
            
            do {
                if (i >= ENTRIES.length - 1) break;
                firstVisibleEntryWithDate = ENTRIES[i++];
                firstVisibleElementWithDate = document.getElementById(`entry-${firstVisibleEntryWithDate.key}`);
            } while (firstVisibleElementWithDate ? firstVisibleElementWithDate!.offsetTop <= window.scrollY + 40 : true);
            
            if (firstVisibleEntryWithDate) {
                while (!ENTRIES[i].date && i < ENTRIES.length - 2) i++;
                while (!ENTRIES[i].date && i > 0) i--;
            }
            
            this.activateEntry(i);
        }
    }

    private readonly onClick = (index: number) => {
        jumping = true;
        setTimeout(() => jumping = false, 800);
        
        const entryContainer = document.getElementById(`entry-${ENTRIES[index].key}`);
        entryContainer!.scrollIntoView();
        this.activateEntry(index);
    }

    public readonly render = () => (
        <nav>
            {this.renderHeader()}
            <div id="dates" className="entries">
                {this.renderEntries()}
            </div>
        </nav>
    );

    private readonly renderHeader = () => {
        if (DEVICE.isMobile) return null;
        else return (
            <div>
                <header>
                    <h1>High Noon</h1>
                </header>
                <hr />
            </div>
        );
    }

    private readonly renderEntries = () => {
        return ENTRIES.map((entry, index) => {
            if (!entry.date) return null;
            else return (
                <button
                    id={`nav-${entry.key}`}
                    key={`nav-${entry.key}`}
                    className={index === this.state.currentEntryIndex ? "entry active" : "entry"}
                    onClick={() => this.onClick(index)}
                >
                    {entry.formatedDate(false)}
                </button>
            );
        });
    }

    private readonly activateEntry = (index: number) => {
        const activeButton = document.getElementById(`nav-${ENTRIES[index].key}`);
        if (DEVICE.isMobile) {
            const container = document.getElementById("dates");
            if (activeButton && container) {
                const left = activeButton.offsetLeft + 0.5 * activeButton.clientWidth - 0.5 * container.clientWidth;
                container.scrollLeft = left;
            }
        } else {
            const firstVisibleButton = document.getElementById(`nav-${ENTRIES[index - 4 >= 0 ? index - 4 : index].key}`);
            
            firstVisibleButton?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        document.querySelectorAll("nav button.entry.active").forEach(button => button.classList.remove("active"));
        if (activeButton) activeButton.classList.add("active");
    }
}