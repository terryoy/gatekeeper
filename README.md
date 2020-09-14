Gatekeeper
==========

Because of some [security-related limitations](http://blog.vjeux.com/2012/javascript/github-oauth-login-browser-side.html), Github prevents you from implementing the OAuth Web Application Flow on a client-side only application.

This is a real bummer. So we built Gatekeeper, which is the missing piece you need in order to make it work.

Gatekeeper works well with [Github.js](http://github.com/michael/github), which helps you access the [Github API](http://developer.github.com/v3/) from the browser. Gatekeeper is free to use under the [MIT license](https://github.com/prose/gatekeeper/blob/master/LICENSE).

## New Release

:tada: We are currently working on releasing a new major version of gatekeeper. You can join the discussion and get involved by following this [issue](https://github.com/prose/gatekeeper/issues/38). :tada:

## API

Use AJAX request to acquire an access token from github, by sending the OAuth code to the following URL:

```
GET http://localhost:9999/authenticate/TEMPORARY_CODE
```

Response:

```
{ }
```


## Reference: Github OAuth Steps

Also see the [documentation on Github](http://developer.github.com/v3/oauth/).

1. Redirect users to request GitHub access.

   ```
   GET https://github.com/login/oauth/authorize
   ```

2. GitHub redirects back to your site including a temporary code you need for the next step.

   You can grab it like so:

   ```js
   var code = window.location.href.match(/\?code=(.*)/)[1];
   ```

3. Request the actual token using your instance of Gatekeeper, which knows your `client_secret`.

   ```js
   $.getJSON('http://localhost:9999/authenticate/'+code, function(data) {
     console.log(data.token);
   });
   ```

## Setup your Gatekeeper

1. Clone it

    ```
    git clone git@github.com:prose/gatekeeper.git
    ```

2. Install Dependencies

    ```
    cd gatekeeper && npm install
    ```

3. Create your OAuth app

Go to [Developer Settings](https://github.com/settings/developers), create an OAuth app.

(The callback url should use your frontend url. Your frontend application get the code from URL, and send to gatekeeper; the gatekeeper return an access token after verify with github.)


4. Adjust config.json

   ```json
   {
     "oauth_client_id": "GITHUB_APPLICATION_CLIENT_ID",
     "oauth_client_secret": "GITHUB_APPLICATION_CLIENT_SECRET",
     "oauth_host": "github.com",
     "oauth_port": 443,
     "oauth_path": "/login/oauth/access_token",
     "oauth_method": "POST",
     "port": 9999
   }
   ```

   You can also set environment variables to override the settings if you don't want Git to track your adjusted config.json file. Just use UPPER_CASE keys.

5. Serve it

   ```
   $ node index.js
   ```

## Deploy on Heroku

### Heroku Button

Use the button below to instantly setup your own Gatekeeper instance on Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Heroku manually

1. Create a new Heroku app

   ```
   heroku apps:create APP_NAME
   ```

3. Provide OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET:

   ```
   heroku config:set OAUTH_CLIENT_ID=XXXX OAUTH_CLIENT_SECRET=YYYY
   ```

4. Push changes to heroku

   ```
   git push heroku master
   ```
OR

   ```
   heroku restart
   ```

## Deploy on Azure

### Azure Button

Use the button below to instantly setup your own Gatekeeper instance on Azure.

[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

### Azure manually

1. Create a new Azure site

   ```
   azure site create SITE_NAME --git
   ```

2. Provide OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET:

   ```
   azure site appsetting add OAUTH_CLIENT_ID=XXXX
   azure site appsetting add OAUTH_CLIENT_SECRET=YYYY
   ```

3. Push changes to Azure

   ```
   git push azure master
   ```
