**Adding calculators to Horizon.**

We support building the calculators as web components.
A command to generate the code for all of these is provided.

```
yarn web_build_all
```

This will write a folder for each supported calculator to the elements folder. The format is 
```
{calculator}
  - favicon.ico
  - {calculator}.js
  - {calculator}.umd.cjs
  - {calculator}.umd.js
```
where {calculator
A developer should be able to sync the whole `elements/` folder with the `elements/ folder` in the `practiceweb-calculaters/elements/` folder


The important file  is the `umd.js` the other files come from the overall vite and rollup workflow.

On the Horizon side we assume that the component name and the name used in the Horizon shortcode. It will then load the javascript and render the component tag.


**Dynamic date options**

On the payslip and propertytaxes calculators we support specifying a list of date options as a data attribute on  the tag.
This should be added as a json string representing an array of arrays where each item has a key and a label.
```
[["date-key1"," Date Label 1"],["date-key2"," Date Label 2"]]
```

To update this configuration it should be possible to use the wordpress cli
```
 wp  @develop option  update   pw_calculator_payslip_options '[["2023-01","2023 Tax Year Calculation from Jan 23"],["2022-07", "2022/23 Tax Year Calculation (from July)"],["2022-04", "2022/23 Tax Year Calculation (April to July)"], ["2021", "2021/22 Tax Year Calculation"]]'
```




