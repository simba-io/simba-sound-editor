"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundManager = void 0;
const EditorView_1 = require("./EditorView");
const Tone = __importStar(require("tone"));
const signals_1 = require("signals");
/** @internal */
class SoundManager {
    signal;
    mode;
    anchor;
    editor;
    soundData;
    /** @internal */
    constructor(mode, anchor) {
        Tone.start();
        this.mode = mode;
        this.anchor = anchor;
        const editorInit = () => {
            if (this.mode === "dev") {
                this.editor = new EditorView_1.SoundEditor(this.anchor);
            }
        };
        this.signal = new signals_1.Signal();
        this.signal.addOnce(editorInit);
        setTimeout(() => {
            this.signal.dispatch();
        }, 5);
    }
    load(source) {
        if (source === undefined) {
            return this.soundData;
        }
        return this.loadSource(source);
    }
    async loadSource(source) {
        const soundData = typeof source === "string"
            ? await this.fetchSoundData(source)
            : source;
        if (!this.isSoundData(soundData)) {
            throw new Error("Invalid sound data JSON.");
        }
        this.soundData = soundData;
        return this.soundData;
    }
    async fetchSoundData(source) {
        const response = await fetch(source);
        if (!response.ok) {
            throw new Error(`Failed to load sound data from ${source}.`);
        }
        return response.json();
    }
    isSoundData(value) {
        if (!value || typeof value !== "object") {
            return false;
        }
        const soundData = value;
        return this.isRecord(soundData.sounds)
            && this.isRecord(soundData.playContainers)
            && this.isRecord(soundData.beatSyncContainers)
            && this.isRecord(soundData.events)
            && Array.isArray(soundData.groups)
            && this.isRecord(soundData.channels);
    }
    isRecord(value) {
        return !!value && typeof value === "object" && !Array.isArray(value);
    }
}
exports.SoundManager = SoundManager;
//# sourceMappingURL=SoundManager.js.map