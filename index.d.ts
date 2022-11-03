export declare type SessionType = {
    flash: any;
    getAll: Function;
    set: Function;
    get: Function;
    start: Function;
    renew: Function;
    exists: Function;
    has: Function;
    remove: Function;
    clear: Function;
    destroy: Function;
    id: Function;
};
export declare const Storage: SessionType;
export default Storage;
