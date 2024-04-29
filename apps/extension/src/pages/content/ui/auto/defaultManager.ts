import { AutoFillManager, EventEmitter } from "./autoManager";
import { Profile } from "@root/src/shared/typing/types";

export class DefaultManager extends AutoFillManager{
    private eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter) {
        super();
        this.eventEmitter = new EventEmitter();
    }

    fillIdentityFields(profile: Profile): void {
        alert("Provider not supported")
    }

    fillUpload(profile: Profile): void {
        alert("Provider not supported")
    }

    fillCustomFields(profile: Profile): void {
        alert("Provider not supported")
    }

    fillEEOCFields(profile: Profile): void {
        alert("Provider not supported")
    }

    autoFill(profile: Profile): void {
        alert("Provider not supported")
    }
}