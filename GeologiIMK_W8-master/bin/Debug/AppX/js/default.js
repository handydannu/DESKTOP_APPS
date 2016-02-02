(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var appdata = Windows.Storage.ApplicationData;
    var notify = Windows.UI.Notifications;
    var push = Windows.Networking.PushNotifications;
    var net = Windows.Networking.Connectivity;
    var wsc = Windows.Security.Cryptography;
    var popups = Windows.UI.Popups;
    var appmodel = Windows.ApplicationModel;
    var storage = Windows.Storage;


    app.addEventListener("activated", function (args) {

        var remember = appdata.current.roamingSettings.values["remember"];
        remember = !remember ? false : remember;

        if (remember) {
            var history = appdata.current.roamingSettings.values["history"];
            if (history !== undefined) {
                nav.history = JSON.parse(history);
            }
        }

        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
     
            } else {
            }

            app.onsettings = function (e) {
                e.detail.applicationcommands = {
                   
                    "about": {
                        href: "/pages/about/about.html",
                        title: "Tentang Developer"
                    } ,
                    "preferences": {
                    href: "/pages/preferences/preferences.html",
                    title: "Pengaturan dan Bantuan"
                    }
                }

                WinJS.UI.SettingsFlyout.populateSettings(e);
            };

            notify.TileUpdateManager.createTileUpdaterForApplication().clear();
            notify.BadgeUpdateManager.createBadgeUpdaterForApplication().clear();

            var profile = net.NetworkInformation.getInternetConnectionProfile();

            if (profile.getNetworkConnectivityLevel() === net.NetworkConnectivityLevel.internetAccess) {
                push.PushNotificationChannelManager.createPushNotificationChannelForApplicationAsync().then(function (channel) {
                    var buffer = wsc.CryptographicBuffer.convertStringToBinary(channel.uri, wsc.BinaryStringEncoding.utf8);
                    var uri = wsc.CryptographicBuffer.encodeToBase64String(buffer);


                    WinJS.xhr({ url: "http://ContosoRecipes8.cloudapp.net?uri=" + uri + "&type=tile" }).then(function (xhr) {
                        if (xhr.status < 200 || xhr.status >= 300) {
                            var dialog = new popups.MessageDialog("Unable to open push notification channel");
                            dialog.showAsync();
                        }
                    });
                });
            }

            appmodel.Package.current.installedLocation.getFileAsync("data\\license.xml").done(
                 function (file) {
                     Windows.ApplicationModel.Store.CurrentAppSimulator.reloadSimulatorAsync(file).done();
                 }); 


            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (args.detail.arguments !== "") {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate("/pages/itemDetail/itemDetail.html", { item: JSON.parse(args.detail.arguments) });
                }
                else

                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }



            }));
        }
    });

    app.oncheckpoint = function (args) {
        var remember = appdata.current.roamingSettings.values["remember"];
        remember = !remember ? false : remember; 

        if (remember) {
            appdata.current.roamingSettings.values["history"] = JSON.stringify(nav.history);
        }

        app.sessionState.history = nav.history;
    };

    app.start();
})();
