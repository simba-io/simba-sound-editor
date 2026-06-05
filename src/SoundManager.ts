import {SoundEditor, UserPanelAnchor} from "./EditorView";
import * as Tone from "tone";
import {Signal} from "signals";

export interface SoundData
{
    sounds: Record<string, string>;
    events: Record<string, string[]>;
}

/** @internal */
export class SoundManager
{
    private signal!: Signal; 
    private mode!: string;

    private anchor!: UserPanelAnchor;

    private editor!: SoundEditor;

    private soundData!: SoundData;

    /** @internal */
    constructor(mode: "dev" | "prod", anchor: UserPanelAnchor)
    {
        Tone.start();

        this.mode = mode;

        this.anchor = anchor;

        const editorInit = () =>
        {
            if (this.mode === "dev")
            {
                this.editor = new SoundEditor(this.anchor);
            }
        };

        this.signal = new Signal();

        this.signal.addOnce(editorInit);

        setTimeout(() =>
        {
            this.signal.dispatch();
        }, 5);
    
    }
}