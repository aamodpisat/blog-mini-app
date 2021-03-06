module.exports = exports = {
    theme: "basic",
    languages: [
        {
            "code": "en-us",
            "relative_url_prefix": "/"
        },
        {
            "code": "ja-jp",
            "relative_url_prefix": "/ja-JP/"
        }
    ],
    plugins: {
        "blog-app" :{
            'baseRoute':'/blog'
        }
    },
    "indexes": {
        "authors": ["title", "uid"],
        "category": ["title", "uid"]
    },
    contentstack: {
        api_key: "blt2d30ea0cdd2efb23",
        access_token: "bltbb54fbf74b1331c4b8734d08"
    }
};