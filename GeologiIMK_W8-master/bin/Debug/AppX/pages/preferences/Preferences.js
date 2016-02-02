
(function () {
    "use strict";

    var appdata = Windows.Storage.ApplicationData;

    WinJS.UI.Pages.define("/pages/preferences/Preferences.html", {
        ready: function (element, options) {
            var toggle = document.querySelector("#remember").winControl;

            var remember = appdata.current.roamingSettings.values["remember"];
            remember = !remember ? false : remember; 
            toggle.checked = remember;

            toggle.addEventListener("change", function (e) {
                appdata.current.roamingSettings.values["remember"] = e.target.winControl.checked;
            });

        },

        unload: function () {
        },

        updateLayout: function (element, viewState, lastViewState) {
        }
    });
})();
