{
    "appDir": "./assets",
    "dir": "./build",
    "mainConfigFile": "./assets/js/lib/config.js",
    "paths": {
        "page.params": "empty:"
    },
    "baseUrl": "./js",
    "useStrict": true,
    "removeCombined": true,
    "findNestedDependencies": true,
    "optimizeCss": "standard",
    "waitSeconds": 0,
    "modules": [
        {
            "name": "../pages/index/index",
            "include": [
                "jquery"
            ],
            "exclude": [
                "../js/lib/config"
            ]
        },
        {
            "name": "../pages/product/product",
            "include": [
                "jquery"
            ],
            "exclude": [
                "../js/lib/config"
            ]
        }
    ]
}