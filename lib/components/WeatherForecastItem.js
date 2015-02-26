"use strict";

var React = require("react");
var WeatherCodeHelper = require("./WeatherCodeHelper");

var WeatherForecastItem = React.createClass({
    displayName: "WeatherForecastItem",
    render: function render() {
        var iconClass = "weather__icon weather__icon--" + WeatherCodeHelper.icon(this.props.data.weather[0].id);

        //{this.props.data.weather[0].id}

        return React.createElement(
            "div",
            { className: "weather__weather__forecast__item" },
            React.createElement("i", { className: iconClass }),
            React.createElement(
                "span",
                { className: "weather__weather__forecast__item__description" },
                this.props.data.weather[0].description
            ),
            React.createElement(
                "span",
                { className: "weather__weather__forecast__item__min-max" },
                React.createElement(
                    "span",
                    { className: "weather__weather__forecast__item__min" },
                    "min.",
                    React.createElement("br", null),
                    Math.round(this.props.data.temp.min - 273.15),
                    "°C"
                ),
                React.createElement(
                    "span",
                    { className: "weather__weather__forecast__item__max" },
                    "max.",
                    React.createElement("br", null),
                    Math.round(this.props.data.temp.max - 273.15),
                    "°C"
                )
            )
        );
    }
});

module.exports = WeatherForecastItem;