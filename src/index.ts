import { snapStorageType } from "./types";

const STORAGE: Storage = localStorage;
const SessionStorage: Storage = sessionStorage;
const StorageContainer = {
    key: "storage-container-key",
    flash_key: "storage-flash-container-key",
    setAll: function(all: any) {
        STORAGE.setItem(StorageContainer.key, JSON.stringify(all));
    }
};



export default {
    flash: {
        parent: function () {
            return SessionStorage;
        },
        get: function (key: string) {
            const all = this.parent().getAll();
            const all_flash = all[StorageContainer.flash_key] || {};

            const flash_value = all_flash[key];

            this.remove(key);

            return flash_value;
        },
        set: function (key: string, value: any) {
            const all = this.parent().getAll();
            const all_flash = all[StorageContainer.flash_key] || {};

            all_flash[key] = value;
            all[StorageContainer.flash_key] = all_flash;

            StorageContainer.setAll(all);
        },
        remove: function (key: string) {
            const all = this.parent().getAll();
            const all_flash = all[StorageContainer.flash_key] || {};

            delete all_flash[key];

            all[StorageContainer.flash_key] = all_flash;
            StorageContainer.setAll(all);
        },
    },
    getAll: function () {
        const item = STORAGE.getItem(StorageContainer.key);
        return item ? JSON.parse(item) : {};
    },
    set: function (key: string, value: any) {
        try {
            if (key == "session-id") return false;
            let all = this.getAll();

            if (!("session-id" in all)) {
                this.start();
                all = this.getAll();
            }

            all[key] = value;

            StorageContainer.setAll(all);
            return true;
        } catch (e) {
            return false;
        }
    },
    get: function (key: string) {
        const all = this.getAll();
        return all[key];
    },
    start: function () {
        const all = this.getAll();
        all["session-id"] = "sess:" + Date.now();

        StorageContainer.setAll(all);
    },
    renew: function (sessionId: string) {
        const all = this.getAll();
        all["session-id"] = "sess:" + sessionId;
        StorageContainer.setAll(all);
    },
    exists: function () {
        const all = this.getAll();
        return "session-id" in all;
    },
    has: function (key: string) {
        const all = this.getAll();
        return key in all;
    },
    remove: function (key: string) {
        try {
            const all = this.getAll();
            delete all[key];

            StorageContainer.setAll(all);
            return true;
        } catch (e) {
            return false;
        }
    },
    clear: function () {
        const all = this.getAll();

        StorageContainer.setAll({ "session-id": all["session-id"] });
    },
    destroy: function () {
        StorageContainer.setAll({});
    },
    id: function () {
        return this.get("session-id");
    },
} as snapStorageType;
