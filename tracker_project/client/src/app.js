const Form = require('./models/form.js')
const FormView = require('./views/form_view.js')
const Booze = require('./models/booze.js');
const Settings = require('./models/settings.js')
const DrinksListView = require('./views/drinks_list_view.js')
const SettingsView = require('./views/settings_view.js')
const ChartView = require('../src/views/chart_view.js')
const Charts = require('./models/charts.js')
const ResultsView = require('./views/result_view.js')
const Results = require('./models/result.js')
const DailyChart = require('./views/daily_info_chart_view.js')

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded')

    const resultsContainer = document.querySelector('#tracker-details');
    resultsView = new ResultsView(resultsContainer);
    resultsView.bindEvents();

    const results = new Results()
    results.bindEvents();

    const settingsUrl = 'http://localhost:3000/api/settings';
    const settings = new Settings(settingsUrl)
    settings.bindEvents()
    settings.getData();


    const chartContainer = document.querySelector('div#chart-view')
    const chartView  = new ChartView(chartContainer);
    chartView.bindEvents();

    const settingsButtonElement = document.querySelector('#settings-btn');

    const settingsContainer = document.querySelector('#settings-form');
    const settingsView = new SettingsView(settingsButtonElement, settingsContainer);
    settingsView.bindEvents();

    const formContainer = document.querySelector('#form-div');

    const drinkContainerSelect = document.querySelector('div#drink-type-selection')
    const form = new Form(drinkContainerSelect);
    form.bindEvents();

    const sizeContainer = document.querySelector('#size-selection')
    const formView = new FormView(formContainer, sizeContainer);
    formView.bindEvents();

    const url = 'http://localhost:3000/api/booze';
    const booze = new Booze(url);
    booze.getData();
    booze.bindEvents();


    const drinksContainer = document.querySelector('#list-table')
    const drinksListView = new DrinksListView(drinksContainer);
    drinksListView.bindEvents();

    const charts = new Charts();
    charts.bindEvents();

    const dailyChartContainer = document.querySelector('div#container')
    const dailyChart = new DailyChart(dailyChartContainer);
    dailyChart.bindEvents();

})
