import { UserPanelAnchor } from "./EditorView";
import { SoundData } from "./Types";
/** @internal */
export declare class SoundManager {
    private signal;
    private mode;
    private anchor;
    private editor;
    private soundData;
    /** @internal */
    constructor(mode: "dev" | "prod", anchor: UserPanelAnchor);
    load(): SoundData;
    load(source: string | SoundData): Promise<SoundData>;
    private loadSource;
    private fetchSoundData;
    private isSoundData;
    private isRecord;
}
//# sourceMappingURL=SoundManager.d.ts.map