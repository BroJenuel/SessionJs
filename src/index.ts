var STORAGE: any = localStorage;
var SessionStorage: Storage = sessionStorage;
var VueSession = {
    key: "session-key",
    flash_key: "session-flash-key",
    setAll: function (all: any) {
        STORAGE.setItem(VueSession.key, JSON.stringify(all));
    },
};

export const session = {
    flash: {
        parent: function () {
            return SessionStorage;
        },
        get: function (key: string) {
            var all = this.parent().getAll();
            var all_flash = all[VueSession.flash_key] || {};

            var flash_value = all_flash[key];

            this.remove(key);

            return flash_value;
        },
        set: function (key: string, value: any) {
            var all = this.parent().getAll();
            var all_flash = all[VueSession.flash_key] || {};

            all_flash[key] = value;
            all[VueSession.flash_key] = all_flash;

            VueSession.setAll(all);
        },
        remove: function (key: string) {
            var all = this.parent().getAll();
            var all_flash = all[VueSession.flash_key] || {};

            delete all_flash[key];

            all[VueSession.flash_key] = all_flash;
            VueSession.setAll(all);
        },
    },
    getAll: function () {
        var all = JSON.parse(STORAGE.getItem(VueSession.key));
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

        VueSession.setAll(all);
    },
    get: function (key: string) {
        var all = this.getAll();
        return all[key];
    },
    start: function () {
        var all = this.getAll();
        all["session-id"] = "sess:" + Date.now();

        VueSession.setAll(all);
    },
    renew: function (sessionId: string) {
        var all = this.getAll();
        all["session-id"] = "sess:" + sessionId;
        VueSession.setAll(all);
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

        VueSession.setAll(all);
    },
    clear: function () {
        var all = this.getAll();

        VueSession.setAll({ "session-id": all["session-id"] });
    },
    destroy: function () {
        VueSession.setAll({});
    },
    id: function () {
        return this.get("session-id");
    },
};
