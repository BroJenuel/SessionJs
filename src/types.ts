export type snapStorageType = {
    flash: {
        parent: () => Storage;
        get: (key: string) => any;
        set: (key: string, value: any) => void;
        remove: (key: string) => void;
    };
    getAll: () => any;
    /**
     * Set a value in the local storage, can be used to add or update a property in the local storage.
     */
    set: (key: string, value: any) => boolean;
    /**
     * Get the Item by passing the key.
     */
    get: (key: string) => any;
    /**
     * Start a new session and setting its new session ID.
     */
    start: () => void;
    /**
     * Renew session by passing your own session ID.
     */
    renew: (sessionId: string) => void;
    /**
     * Check if a Session in Local Storage exist.
     */
    exists: () => boolean;
    /**
     * Check if the value exist
     */
    has: (key: string) => boolean;
    /**
     * Remove an Item in the Local Storage
     */
    remove: (key: string) => boolean;
    /**
     * clear every item in the local storage
     */
    clear: () => void;
    /**
     * Destroy everything session.
     */
    destroy: () => void;
    /**
     * return the ID of the current session being used.
     */
    id: () => any;
};