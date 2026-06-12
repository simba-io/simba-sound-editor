import {SoundEditor, UserPanelAnchor} from "./EditorView";
import * as Tone from "tone";
import {Signal} from "signals";
import {SoundData} from "./Types";

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

    public load(): SoundData;
    public load(source: string | SoundData): Promise<SoundData>;
    public load(source?: string | SoundData): SoundData | Promise<SoundData>
    {
        if (source === undefined)
        {
            return this.soundData;
        }

        return this.loadSource(source);
    }

    private async loadSource(source: string | SoundData): Promise<SoundData>
    {
        const soundData = typeof source === "string"
            ? await this.fetchSoundData(source)
            : source;

        if (!this.isSoundData(soundData))
        {
            throw new Error("Invalid sound data JSON.");
        }

        this.soundData = soundData;

        return this.soundData;
    }

    private async fetchSoundData(source: string): Promise<unknown>
    {
        const response = await fetch(source);

        if (!response.ok)
        {
            throw new Error(`Failed to load sound data from ${source}.`);
        }

        return response.json();
    }

    private isSoundData(value: unknown): value is SoundData
    {
        if (!value || typeof value !== "object")
        {
            return false;
        }

        const soundData = value as Partial<SoundData>;

        return this.isRecord(soundData.sounds)
            && this.isRecord(soundData.playContainers)
            && this.isRecord(soundData.beatSyncContainers)
            && this.isRecord(soundData.events)
            && Array.isArray(soundData.groups)
            && this.isRecord(soundData.channels);
    }

    private isRecord(value: unknown): value is Record<string, unknown>
    {
        return !!value && typeof value === "object" && !Array.isArray(value);
    }
}