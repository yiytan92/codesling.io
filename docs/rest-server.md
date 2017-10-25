# Codesling RESTful Server Developer Documentation

**Note:** If you want to run all backend services along with the clientside development server, check out the main `README.md` [instructions](README.md#getting-started)

To begin developing on the RESTful JSON Data API, run the following from the `rest-server` folder:

```bash
yarn
yarn start
```

# API

```plaintext
POST /run
  request
    body = JSON {
      code: STRING (required)
    }
  response
    status = 200 | 400
    data = JSON {
      success: BOOLEAN
      message: STRING
    }
```
