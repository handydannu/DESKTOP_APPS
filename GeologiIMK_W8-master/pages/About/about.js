(function () {
    "use strict";
    var app = Windows.ApplicationModel.Store.CurrentAppSimulator;

    WinJS.UI.Pages.define("/pages/About/about.html", {
        ready: function (element, options) {
            if (app.licenseInformation.isTrial) {
                var button = document.querySelector("#purchase");

                app.loadListingInformationAsync().then(function (listing) {
                    button.textContent = "Program ini dilindungi oleh " + listing.formattedPrice;
                });
                button.onclick = function () {
                    app.requestAppPurchaseAsync(false);
                };

            }
            else {
                document.querySelector("#info").textContent = "Berlaku hingga " + app.licenseInformation.expirationDate.toLocaleDateString();
                document.querySelector("#purchase").style.visibility = "hidden";
            }

        },

        unload: function () {
        },

        updateLayout: function (element, viewState, lastViewState) {
        }
    });
})();
