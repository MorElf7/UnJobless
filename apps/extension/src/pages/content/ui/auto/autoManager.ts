import { Profile, EventListener, AdditionType } from "@root/src/shared/typing/types";

export abstract class AutoFillManager {
    constructor(protected  eventEmitter: EventEmitter ) {}
    abstract fillIdentityFields(profile: Profile): void;
    abstract fillUpload(profile: Profile): void;
    abstract fillCustomFields(profile: Profile): void;
    abstract fillEEOCFields(profile: Profile): void;
    abstract fillExperience(profile: Profile): void;
    abstract fillEducation(profile: Profile): void;
    abstract autoFill(profile: Profile, additionalFields: AdditionType): void;

    
}

export class EventEmitter {
    private events: Record<string, EventListener<any>[]> = {};

    public subscribe<T>(event: string, listener: EventListener<T>): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    public publish<T>(event: string, data: T): void {
        const listeners = this.events[event];
        if (listeners) {
            listeners.forEach(listener => listener(data));
        }
    }

    public unsubscribe<T>(event: string, listenerToRemove: EventListener<T>): void {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
        }
    }
}