export interface SoundData
{
    sounds: Record<string, SoundFileConfig>;
    playContainers: Record<string, PlayContainerConfig>;
    beatSyncContainers: Record<string, BeatSyncContainerConfig>;
    events: Record<string, EventConfig>;
    groups: string[];
    channels: Record<string, ChannelConfig>;
}

export interface ChannelConfig
{
    volume: number;
    pan: number;
}

export interface SoundFileConfig
{
    path: string;
    gain: number;
    pool: number;
    groups: string[];
}

export interface EventConfig
{
    actions: Action[];
}

export interface PlayContainerConfig
{
    sounds: string[];
}

export interface BeatSyncContainerConfig
{
    stems: string[];
    bpm: number;
    loop: boolean;
}

export interface BeatSyncStartAction extends Action
{
    containerId: string;
    volume: number;
    fade: number;
    duration: number;
}

export interface BeatSyncStemsAction extends Action
{
    containerId: string;
    addStems: string[];
    removeStems: string[];
    volume: number;
    fade: number;
    duration: number;
}

export interface BeatSyncStopAction extends Action
{
    containerId: string;
    fade: number;
}

export interface PlayAction extends Action
{
    sounds: string[];
    containers: PlayContainerAction[];
    volume: number;
    loop: boolean;
    fade: number;
    duration: number;
}

export interface StopAction extends Action
{
    sounds: string[];
    containers: PlayContainerAction[];
    fade: number;
}

export interface PlayContainerAction
{
    id: string;
    random: boolean;
}

export interface Action
{
    actionId: string;
    delay: number;
}