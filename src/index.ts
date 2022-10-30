var STORAGE: any = localStorage;
var SessionStorage: Storage = sessionStorage;
var StorageContainer = {
    key: "storage-container-key",
    flash_key: "storage-flash-container-key",
    setAll: function (all: any) {
        STORAGE.setItem(StorageContainer.key, JSON.stringify(all));
    },
};

type SessionType = {
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

export const Storage: SessionType = {
    flash: {
        parent: function () {
            return SessionStorage;
        },
        get: function (key: string) {
            var all = this.parent().getAll();
            var all_flash = all[StorageContainer.flash_key] || {};

            var flash_value = all_flash[key];

            this.remove(key);

            return flash_value;
        },
        set: function (key: string, value: any) {
            var all = this.parent().getAll();
            var all_flash = all[StorageContainer.flash_key] || {};

            all_flash[key] = value;
            all[StorageContainer.flash_key] = all_flash;

            StorageContainer.setAll(all);
        },
        remove: function (key: string) {
            var all = this.parent().getAll();
            var all_flash = all[StorageContainer.flash_key] || {};

            delete all_flash[key];

            all[StorageContainer.flash_key] = all_flash;
            StorageContainer.setAll(all);
        },
    },
    getAll: function () {
        var all = JSON.parse(STORAGE.getItem(StorageContainer.key));
        return all || {};
    },
    set: function (key: string, value: any) {
        if (key == "session-id") return false;
        var all = this.getAll();

        if (!("session-id" in all)) {
            this.start();
            all = this.getAll();
        }

        all[key] = value;

        StorageContainer.setAll(all);
    },
    get: function (key: string) {
        var all = this.getAll();
        return all[key];
    },
    start: function () {
        var all = this.getAll();
        all["session-id"] = "sess:" + Date.now();

        StorageContainer.setAll(all);
    },
    renew: function (sessionId: string) {
        var all = this.getAll();
        all["session-id"] = "sess:" + sessionId;
        StorageContainer.setAll(all);
    },
    exists: function () {
        var all = this.getAll();
        return "session-id" in all;
    },
    has: function (key: string) {
        var all = this.getAll();
        return key in all;
    },
    remove: function (key: string) {
        var all = this.getAll();
        delete all[key];

        StorageContainer.setAll(all);
    },
    clear: function () {
        var all = this.getAll();

        StorageContainer.setAll({ "session-id": all["session-id"] });
    },
    destroy: function () {
        StorageContainer.setAll({});
    },
    id: function () {
        return this.get("session-id");
    },
};

export default Storage;
