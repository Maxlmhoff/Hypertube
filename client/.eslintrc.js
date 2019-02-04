module.exports = {
    "extends": "airbnb",
    "ecmaFeatures": {"jsx": true},
    "env":{
        "browser": true
    },
    "rules": {
        "react/forbid-prop-types": "off",
        "jsx-a11y/label-has-associated-control": [ "error", {
            "required": {
              "some": [ "nesting", "id"  ]
            }
          }],
          "jsx-a11y/label-has-for": [ "error", {
            "required": {
              "some": [ "nesting", "id"  ]
            }
          }]
    },
    "parser": "babel-eslint"
};