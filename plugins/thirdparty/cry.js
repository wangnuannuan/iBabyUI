(function() {

   freeboard.addStyle('.cry-picture', "border-radius:20%;width:32px;height:32px;margin-top:-1px;float:left;margin-right:10px;");
    freeboard.addStyle('.cry-picture.on', "box-shadow: inset -0.2em 0 0.3em #FFEC8B;border-color:#ff0000;");
    freeboard.addStyle('.cry-text', "margin-top:1px;");
   var indicatorWidget = function (settings) {
        var self = this;
        var titleElement = $('<h2 class="section-title"></h2>');
        var stateElement = $('<div class="cry-text"></div>');
        var indicatorElement = $('<div class="cry-picture"></div>');
        var currentSettings = settings;
        var isOn = false;
        var onText=currentSettings.on_text;
        var offText=currentSettings.off_text;
        var data_body;
        function updateState() {
           // indicatorElement.toggleClass("on",isOn);

            if (isOn=='true') {
                stateElement.text((_.isUndefined(onText) ? (_.isUndefined(currentSettings.on_text) ? "" : currentSettings.on_text) : onText));
                
            }
            else {
                stateElement.text((_.isUndefined(offText) ? (_.isUndefined(currentSettings.off_text) ? "" : currentSettings.off_text) : offText));
               
            }
        }

        this.render = function (element) {
            $(element).append(titleElement).append(indicatorElement).append(stateElement);
            $(".cry-picture").append('<img src="img/cry.png">');
            updateState();
           
        }

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
            titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
            updateState();
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName == "value") {
                isOn = newValue;

            }
           /* if (settingName == "on_text") {
                onText = newValue;
            }
            if (settingName == "off_text") {
                offText = newValue;
            }*/
        
 

            updateState();
        }

        this.onDispose = function () {
        }

        this.getHeight = function () {
            return 1;
        }

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        type_name: "cry",
        display_name: "Cry",
        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
            {
                name: "value",
                display_name: "Value",
                type: "calculated"
            },
            {
                name: "on_text",
                display_name: "On Text",
                type: "text"
            },
            {
                name: "off_text",
                display_name: "Off Text",
                type: "text"
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new indicatorWidget(settings));
        }
    });

}());