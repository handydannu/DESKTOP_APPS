(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {
        navigateToGroup: function (key) {
            nav.navigate("/pages/groupDetail/groupDetail.html", { groupKey: key });
        },

        ready: function (element, options) {
        var semanticZoom = element.querySelector("#zoom").winControl;
    var zoomedInListView = element.querySelector("#zoomedInListView").winControl;
    var zoomedOutListView = element.querySelector("#zoomedOutListView").winControl;

    zoomedOutListView.itemTemplate = element.querySelector(".zoomedOutItemTemplate");
    zoomedOutListView.itemDataSource = Data.groups.dataSource;
    zoomedOutListView.groupDataSource = null;
    zoomedOutListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });

    zoomedInListView.groupHeaderTemplate = element.querySelector(".headertemplate");
    zoomedInListView.itemTemplate = element.querySelector(".itemtemplate");
    zoomedInListView.oniteminvoked = this._itemInvoked.bind(this);

    if (appView.value === appViewState.snapped) {
        zoomedInListView.itemDataSource = Data.groups.dataSource;
        zoomedInListView.groupDataSource = null;
        zoomedInListView.layout = new ui.ListLayout();
        semanticZoom.locked = true;
    }
    else {
        zoomedInListView.itemDataSource = Data.items.dataSource;
        zoomedInListView.groupDataSource = Data.groups.dataSource;
        zoomedInListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
        semanticZoom.locked = false;
    }

    semanticZoom.element.focus();
},

updateLayout: function (element, viewState, lastViewState) {

    var semanticZoom = element.querySelector("#zoom").winControl;
    var zoomedInListView = element.querySelector("#zoomedInListView").winControl;

    if (appView.value === appViewState.snapped) {
        zoomedInListView.itemDataSource = Data.groups.dataSource;
        zoomedInListView.groupDataSource = null;
        zoomedInListView.layout = new ui.ListLayout();
        semanticZoom.zoomedOut = false;
        semanticZoom.locked = true;
    }
    else {
        zoomedInListView.itemDataSource = Data.items.dataSource;
        zoomedInListView.groupDataSource = Data.groups.dataSource;
        zoomedInListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
        semanticZoom.locked = false;

    }
}, 
        _initializeLayout: function (listView, viewState) {

            if (viewState === appViewState.snapped) {
                listView.itemDataSource = Data.groups.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();
            } else {
                listView.itemDataSource = Data.items.dataSource;
                listView.groupDataSource = Data.groups.dataSource;
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
            }
        },

        _itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                var group = Data.groups.getAt(args.detail.itemIndex);
                this.navigateToGroup(group.key);
            } else {
                var item = Data.items.getAt(args.detail.itemIndex);
                nav.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
            }
        }
    });
})();
