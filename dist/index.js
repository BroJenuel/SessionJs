"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
var STORAGE = localStorage;
var SessionStorage = sessionStorage;
var StorageContainer = {
    key: "storage-container-key",
    flash_key: "storage-flash-container-key",
    setAll: function (all) {
        STORAGE.setItem(StorageContainer.key, JSON.stringify(all));
    },
};
exports.Storage = {
    flash: {
        parent: function () {
            return SessionStorage;
        },
        get: function (key) {
            var all = this.parent().getAll();
            var all_flash = all[StorageContainer.flash_key] || {};
            var flash_value = all_flash[key];
            this.remove(key);
            return flash_value;
        },
        set: function (key, value) {
            var all = this.parent().getAll();
            var all_flash = all[StorageContainer.flash_key] || {};
            all_flash[key] = value;
            all[StorageContainer.flash_key] = all_flash;
            StorageContainer.setAll(all);
        },
        remove: function (key) {
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
    set: function (key, value) {
        if (key == "session-id")
            return false;
        var all = this.getAll();
        if (!("session-id" in all)) {
            this.start();
            all = this.getAll();
        }
        all[key] = value;
        StorageContainer.setAll(all);
    },
    get: function (key) {
        var all = this.getAll();
        return all[key];
    },
    start: function () {
        var all = this.getAll();
        all["session-id"] = "sess:" + Date.now();
        StorageContainer.setAll(all);
    },
    renew: function (sessionId) {
        var all = this.getAll();
        all["session-id"] = "sess:" + sessionId;
        StorageContainer.setAll(all);
    },
    exists: function () {
        var all = this.getAll();
        return "session-id" in all;
    },
    has: function (key) {
        var all = this.getAll();
        return key in all;
    },
    remove: function (key) {
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
exports.default = exports.Storage;
