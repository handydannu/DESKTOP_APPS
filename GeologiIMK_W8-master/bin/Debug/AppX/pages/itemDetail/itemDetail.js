(function () {
    "use strict";

    var storage = Windows.Storage;
    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager;
    var start = Windows.UI.StartScreen;
    var item;
    var capture = Windows.Media.Capture;
    var _photo;
    var _video;
    var notify = Windows.UI.Notifications;
    var popups = Windows.UI.Popups;
  
    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        ready: function (element, options) {

            showFlyout.onclick = function () {
                flyout.winControl.show(showFlyout);
            };

            item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            element.querySelector(".titlearea .pagetitle").textContent = item.group.title;
            element.querySelector("article .item-title").textContent = item.title;
            element.querySelector("article .item-subtitle").textContent = item.preptime;
            element.querySelector("article .item-image").src = item.backgroundImage;
            element.querySelector("article .item-image").alt = item.shortTitle;
            element.querySelector("article .item-gambar").src = item.backgroundImageDua;
            var ingredients = element.querySelector("article .item-ingredients");
            for (var i = 0; i < item.ingredients.length; i++) {
                var ingredient = document.createElement("h2");
                ingredient.textContent = item.ingredients[i];
                ingredient.className = "ingredient";
                ingredients.appendChild(ingredient);
            }

var app = Windows.ApplicationModel.Store.CurrentAppSimulator;
var license = app.licenseInformation;

if (license.productLicenses.ItalianRecipes.isActive || item.group.key !== "lainnya") {
    element.querySelector("article .item-directions").textContent = item.directions;
}
else {
    var button = document.querySelector("#purchaseRecipes");

    app.loadListingInformationAsync().then(function (listing) {
        var price = listing.productListings.ItalianRecipes.formattedPrice;
        button.style.display = 'block';
        button.textContent = "Produk ini dilindungi oleh UUD No. " + price;
    });

    button.onclick = function () {
        if (!app.licenseInformation.isTrial) {
            app.requestProductPurchaseAsync("Other", false).done(
                function () {
                    if (app.licenseInformation.productLicenses.lookup("Other").isActive) {
                        var directions = element.querySelector("article .item-directions");
                        if (directions !== null) {
                            directions.textContent = item.directions;
                        }
                        button.style.display = 'none'; 
                    }
                });
        }
        else
            new Windows.UI.Popups.MessageDialog("Program ini dilindungi oleh UUD Hak Cipta. Lihat di panel Tentang Developer.").showAsync(); 
    }; 
}

            element.querySelector(".content").focus();

            dtm.getForCurrentView().addEventListener("datarequested", this.onDataRequested);

            document.getElementById("photo").addEventListener("click", function (e) {
                var camera = new capture.CameraCaptureUI();

                camera.captureFileAsync(capture.CameraCaptureUIMode.photo).then(function (file) {
                    if (file != null) {
                        _photo = file;
                        dtm.showShareUI();
                    }
                });

            });
            document.getElementById("video").addEventListener("click", function (e) {
                var camera = new capture.CameraCaptureUI();
                camera.videoSettings.format = capture.CameraCaptureUIVideoFormat.wmv;

                camera.captureFileAsync(capture.CameraCaptureUIMode.video).then(function (file) {
                    if (file != null) {
                        _video = file;
                        dtm.showShareUI();
                    }
                });

            });

            document.getElementById("pin").addEventListener("click", function (e) {
                var uri = new Windows.Foundation.Uri("ms-appx:///" + item.tileImage);

                var tile = new start.SecondaryTile(
                    item.key,                                    
                    item.shortTitle,                          
                    item.title,                                 
                    JSON.stringify(Data.getItemReference(item)), 
                    start.TileOptions.showNameOnLogo,           
                    uri                                          
                );

                tile.requestCreateAsync();
            });

            document.getElementById("remind").addEventListener("click", function (e) {
               
                var notifier = notify.ToastNotificationManager.createToastNotifier();

                if (notifier.setting != notify.NotificationSetting.enabled) {
                    var dialog = new popups.MessageDialog("Pengingat dimatikan.");
                    dialog.showAsync();
                    return;
                }

                var template = notify.ToastNotificationManager.getTemplateContent(notify.ToastTemplateType.toastText01);
                var element = template.getElementsByTagName("text")[0];
                element.appendChild(template.createTextNode("Pengingat"));

                var date = new Date(new Date().getTime() + 30000);
                var stn = notify.ScheduledToastNotification(template, date);
                notifier.addToSchedule(stn);
            });

        },
        onDataRequested: function (e) {
            var request = e.request;
            request.data.properties.title = item.title;

            if (_photo != null) {
                request.data.properties.description = "Photo anda !";
                var reference = storage.Streams.RandomAccessStreamReference.createFromFile(_photo);
                request.data.properties.Thumbnail = reference;
                request.data.setBitmap(reference);
                _photo = null;
            }
            else if (_video != null) {
                request.data.properties.description = "Video Anda !";
                request.data.setStorageItems([_video]);
                _video = null;
            }
            else {

                request.data.properties.description = "Bagikan dengan teman anda";

                var recipe = "\r\nKonten\r\n" + item.ingredients.join("\r\n");
                recipe += ("\r\n\r\nDeskripsi\r\n" + item.directions);
                request.data.setText(recipe);

                var uri = item.backgroundImage;
                if (item.backgroundImage.indexOf("http://") != 0)
                    uri = "ms-appx:///" + uri;

                uri = new Windows.Foundation.Uri(uri);
                var reference = storage.Streams.RandomAccessStreamReference.createFromUri(uri);
                request.data.properties.thumbnail = reference;
                request.data.setBitmap(reference);
            }
        },

        unload: function () {
            WinJS.Navigation.removeEventListener("datarequested", this.onDataRequested);
        }

    });
})();