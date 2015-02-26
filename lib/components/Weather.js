"use strict";

var React = require("react");
var Reflux = require("reflux");
var moment = require("moment");
var format = require("string-template");
var ApiConsumerMixin = require("mozaik/browser").Mixin.ApiConsumer;
var WeatherForecastItem = require("./WeatherForecastItem");
var WeatherCodeHelper = require("./WeatherCodeHelper");

// see http://openweathermap.org/weather-conditions for `weather.id` meaning

var Weather = React.createClass({
    displayName: "Weather",
    mixins: [Reflux.ListenerMixin, ApiConsumerMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            lang: "en",
            limit: 3
        };
    },

    propTypes: {
        city: React.PropTypes.string.isRequired,
        country: React.PropTypes.string.isRequired,
        limit: React.PropTypes.number.isRequired,
        lang: React.PropTypes.oneOf(["en", // English
        "ru", // Russian
        "it", // Italian
        "es", "sp", // Spanish
        "uk", "ua", // Ukrainian
        "de", // German
        "pt", // Portuguese
        "ro", // Romanian
        "pl", // Polish
        "fi", // Finnish
        "nl", // Dutch
        "fr", // French
        "bg", // Bulgarian
        "sv", "se", // Swedish
        "zh_tw", // Chinese Traditional
        "zh", "zh_cn", // Chinese Simplified
        "tr", // Turkish
        "hr", // Croatian
        "ca" // Catalan
        ]).isRequired
    },

    getInitialState: function getInitialState() {
        return {
            current: null,
            forecast: []
        };
    },

    getApiRequest: function getApiRequest() {
        var params = {
            city: this.props.city,
            country: this.props.country,
            lang: this.props.lang,
            limit: this.props.limit
        };

        return {
            id: format("weather.combined.{city}.{country}.{lang}.{limit}", params),
            params: params
        };
    },

    onApiData: function onApiData(weather) {
        this.setState(weather);
    },

    render: function render() {
        var descriptionNode = null;
        var tempNode = null;
        var iconNode = null;

        if (this.state.current) {
            if (this.state.current.weather.length > 0) {
                //{this.state.current.weather[0].id}
                descriptionNode = React.createElement(
                    "div",
                    { className: "weather__weather__description" },
                    this.state.current.weather[0].description
                );

                var iconClass = "weather__icon weather__icon--" + WeatherCodeHelper.icon(this.state.current.weather[0].id);
                iconNode = React.createElement("i", { className: iconClass });
            }

            tempNode = React.createElement(
                "span",
                { className: "weather__weather__temp" },
                React.createElement(
                    "span",
                    { className: "weather__weather__temp__value" },
                    Math.round(this.state.current.main.temp - 273.15)
                ),
                React.createElement(
                    "span",
                    { className: "weather__weather__temp__unit" },
                    "°C"
                )
            );
        }

        var forecastItemNodes = this.state.forecast.map(function (data, i) {
            return React.createElement(WeatherForecastItem, { key: i, data: data });
        });

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "widget__header" },
                React.createElement(
                    "span",
                    { className: "widget__header__subject" },
                    this.props.city,
                    " - ",
                    this.props.country
                ),
                React.createElement("i", { className: "fa fa-info-circle" })
            ),
            React.createElement(
                "div",
                { className: "widget__body" },
                React.createElement(
                    "div",
                    { className: "weather__weather__current" },
                    iconNode,
                    tempNode,
                    descriptionNode
                ),
                React.createElement(
                    "div",
                    { className: "weather__weather__forecast" },
                    forecastItemNodes
                )
            )
        );
    }
});

module.exports = Weather;