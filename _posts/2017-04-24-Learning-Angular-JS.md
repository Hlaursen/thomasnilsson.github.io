---
published: true
---
I'm starting to learn angular, and so I made a couple of projects.

[Todo List](https://thomasnilsson.github.io/todoapp)

_A simple todo list, a great learning example._

Here the challenge was binding the contents of the table to the list of todo `items` in the `ng-model`.

Whenever an `item` is added, the list is appended with the new `item`, the `ng-model` registers this, and updates the view.

Whenever the delete button is pressed, a new list is then created in the `ng-model`, only containing the items for which the `done` field is `false`, and the original list is then set to this list.

[Flag and Country Overview](https://thomasnilsson.github.io/flagapp)

_Overview of countries and their corresponding flags, with various filtering options._

[Original repository from hjnilsson](https://github.com/hjnilsson/country-flags)

Here the challenge lied in mapping each country's ISO code to the corresponding flag. Luckily the original project had including a number of flag SVG files, named after the ISO code. 

However in Angular I had difficulty using the original projects JSON file, which mapped the ISO code to the country name, since the JSON file was composed of one big `countries` object, instead of an array of countries. This made it hard to filter out countries via the search function, as well as ordering them lexicographically by clicking on the table headers.

I therefore made a python script to translate this `countries` object into individual country objects, which is included in the  [repository](https://github.com/thomasnilsson/thomasnilsson.github.io/tree/master/flagapp).

By doing so, the angular functions `filter` and `orderBy` can now be applied to the country names, as well as the ISO codes: `ng-repeat = country in countries | filter:selected | orderBy:sortField:order`

The links to wikipedia were easy to generate with an angular expression:
```javascript
en.wikipedia.org/wiki/{{country.name}}
```

, and even in the case of country names including space separated words, such as `United States`, wikipedia will automatically convert spaces ` ` into underscores `_`: [en.wikipedia.org/wiki/United States](https://en.wikipedia.org/wiki/United States)





