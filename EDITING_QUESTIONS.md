## Editing Questions
The question files can be found [here](https://github.com/NorthwestGreenChemistry/PrISM/tree/develop/app/assets/quiz) (`app/assets/quiz`).

Each step has it's own question, ui, and rules files. For example, for step two, there are `guiding_questions2.json`, `guiding_questions2_ui.json` and `guiding_questions2_rules.json` files.

**guiding_questions*.json** have the text for all of the questions and answers for each step.

**guiding_questions*_ui.json** define the user interface schema for each question (e.g. checkboxes, textarea).

**guiding_questions*_rules.json** define rules for any conditional questions for each step.

## Question Types
Currently, all of the questions in PrISM are either text areas, radio buttons, checkboxes or sliders.

### Text area
Questions file:
```
"Who are the intended users?": {
    "type": "string"
}
```

UI Schema:
```
"Who are the intended users?": {
    "ui:widget": "textarea"
}
```

* If you'd just like a text box and not a text area, you can just take out the ui:widget for the question (leave nothing between `{` and `}`) as a small text box is the default.

### Radio (Select One)
Questions file:
```
"Is the biobased feedstock rapidly renewable?": {
    "enum": ["Yes", "No","I don't know"],
    "type": "string"
}
```
UI Schema:
```
"Is the biobased feedstock rapidly renewable?": {
    "ui:widget": "radio"
}
```
* To add more options, add a new comma separated option within the `[` and `]` for the "enum" field in the question file.
* Options will appear in the same order as they are entered.

### Checkbox (Select Multiple)
Question file:
```
"For chemicals used and produced during production and manufacturing, what are the likely routes of exposure?": {
    "type": "array",
    "items": {
        "type": "string",
        "enum": [
            "Oral",
            "Dermal",
            "Inhalation",
            "Other",
            "Don't Know"
        ]
    },
    "uniqueItems": "true"
}
```
UI Schema:
```
"For chemicals used and produced during production and manufacturing, what are the likely routes of exposure?": {
    "ui:widget": "checkboxes"
}
```
* To add new options add another quoted phrase to the comma separated list between `[` and `]` for the enum field. (Spacing doesn't matter so these can be on the same line or spaced out as above, whatever is more readable).

### Slider
Question file:
```
"What is the likelihood that your product will end up as litter or that it will otherwise leak into the environment?": {
    "description": "National statistics from waste inventories could give you a good indication.  Consider the use phase of your product.",
    "type": "integer",
    "minimum": "0",
    "maximum": "100",
    "multipleOf": "5"
}
```
UI Schema:
```
"What is the likelihood that your product will end up as litter or that it will otherwise leak into the environment?": {
    "ui:widget": "range"
}
```
* This is for allowing the user to pick a value between two numbers. `minimum` is the lowest possible value, `maximum` is the highest possible value, `multipleOf` indicates how much the values can increase by.
* `minimum`, `maximum` and `multipleOf` are all optional and default to 0, 100 and 1 respectively.

## Rules
For conditionals to work, you'll need to enter all questions including those you want hidden in the questions file under the sections you want them to appear.

* The logic for the rules is based off of [predicate.js](http://landau.github.io/predicate/) and can get a bit complicated...

### General Rule Structure
Each rule is comprised of a `condtions` and `event` section.
* `conditions` define the conditions the rule is looking for
* `event` defines what happens when those conditions are met

Since the options for `event` are limited to `remove` and `require`, the conditions are written as the inverse to how you'd think about them for conditionally adding questions.

```
{
  "conditions": {
    ...
  },
  "events": {
    "type": "remove",
    "params": {
      "field": [
        ...
      ]
    }
  }
}
```
* `field` is where you'd put the names of questions you'd like to remove
  * You can enter multiple questions to remove here, separated by commas between `[` and `]`.
* If you're referencing a nested question in either your conditions or in `field` you'll need to reference it like `section.question`.

### Common Operations

#### Adding questions based on radio selection
```
{
    "conditions": {
        "Can the feedstock be depleted (ie, it is not renewable)?": {
            "not":
                {"equal": "Yes"}
        }
    },
    "event": {
        "type": "remove",
        "params": {
            "field": [
                "Is that feedstock currently considered abundant or rare?",
                "Based on what source of information?"
            ]
        }
    }
}
```
* This reads "If the answer to 'Can the feedstock be depleted (ie, it is not renewable)?' is not 'Yes' remove questions 'Is that feedstock currently considered abundant or rare?' and 'Based on what source of information?' "

#### Adding a question based on checkbox option
```
{
    "conditions": {
        "Select the following attributes that describe the base feedstock:": {
            "or": [
                "empty",
                {"not":
                    {"includes": "Waste/Recycled"}
                }
            ]
        }
    },
    "event": {
        "type": "remove",
        "params": {
            "field": [
                "Is the feedstock derived from waste recycled?",
                "Is the feedstock derived from agricultural waste?",
                "To what extent can virgin feedstock be replaced by the waste feedstock?"
            ]
        }
    }
}
```
* If "Select the following attributes that describe the base feedstock:" is empty or does not include "Waste/Recycled" remove `fields`.

* The logic for one of multiple checkbox options would look like:
```
"or": [
    "empty",
    {
        "not": {
            "or": [
                {"includes": "Certification"},
                {"includes": "3rd-party testing"},
                {"includes": "In-house testing"}
            ]
        }
    }
]
```

### 'Dependencies'

If you see anything with the field `dependencies` in a question file at the end of a section, those are how react-jsonschema-form handles conditionals. Some conditionals that aren't checkbox related are still in this format.
  * Ideally these will be switched over. But for the time being if you make a change to a question that's referenced in `dependencies`, you should change the question text there too.

## Adding New Questions

Each question section is made up of `title`, `type`, and `properties` fields.
* `title` is what you want the section to be called
* `type` will always be `"object"`
* `properties` is where you enter all of your questions for the section separated by commas.

#### Example

```
"title": "Example",
"type": "object",
"properties": {
  "section1 question1": {
    ...
  },
  "section1 question2": {
    ...
  },
  "section2": {
    "title": "Second Section",
    "type": "object",
    properties: {
      "section2 question1": {
        ...
      },
      "section2 question2": {
        ...
      }
    }
  },
  "section3": {
    ...
  }
}
```
* Additional sections are added within the top level object's `properties`, separated with a comma.
  * These will still display as if they're at the same level as the first section (not nested).

#### Example UI
```
"section1 question1": {
  ...
},
"section1 question2": {

},
"section2": {
  "section2 question1": {
    ...
  },
  "section2 question2": {
    ...
  }
},
"section3": {
  ...
}
```
* When addressing questions for UI definitions, references are made relative to the top level properties attribute.
  * Make sure you have your questions under the same parent element as in the question schema or the ui style won't apply.

#### Example Rules
```
[
  {
    {
      "conditions": {
        "section1 question1": {
          ...
        }
      },
      "event": {
        "type": "remove",
        "params": {
          "field": [
            "section2.section2 question1"
          ]
        }
      }
    }
  },
  ...
]
```
* On some condition on `section1 question1`, `section2 question1` in `section2` will appear.
* Add additional rules between `[` and `]`, separated by commas.
* You can reference the same question in multiple rules. Just make sure your conditions don't interact/interfere with eachother.

## Gotchas
* Currently no questions that have conditional rules can contain the "." character.
* If you edit the text of a question you'll need to make the same edits to the question text in the ui and rules file if applicable.

## Links
* [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form#react-jsonschema-form)
* [react-jsonschem-form playground](https://mozilla-services.github.io/react-jsonschema-form/)
* [react-jsonschema-form-conditionals](https://github.com/RxNT/react-jsonschema-form-conditionals)
  * [json-rules-engine-simplified](https://github.com/RxNT/json-rules-engine-simplified)
  * [predicate.js docs](http://landau.github.io/predicate/)
* [json spec](https://www.json.org/)
