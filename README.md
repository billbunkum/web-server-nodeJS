# Current LOCATION in tutorial
	Section 9: Lesson 64 'git'

+ Lately
	1. Updating my repos to make the web-server portion its own repo.
	2. Played around w/ *git submodules* but decided it was not the way for me to go as the `weather app` is *not* a part of a larger `project` (the tutorial).

* `https://github.com/billbunkum/web-server-nodeJS.git`

# Goal of WEATHER APP

* User can use TERMINAL or WEB APP to get weather info. for a region They specify.

## Gaining Access to TERMINAL variables

* Accessing argv
	+ `const noob = process.argv;`
	
	+ `$ node app.js "some string"` 'some string' will appear as an index on `noob` and can thus be ACCESSED in the code.

## Line notes for EXPRESS & HBS
* Section 6: Lesson 43 'Explains initial setup'

* Installing & Setting up `hbs`, a 'templating engine' 'plugin' for Express which uses `handlebars` behind the scenes	
	1. handlebars -> for Express is called `hbs`
		`$ npm install hbs@4.0.1` (or whatever version is newest)
	
		+ Tell Express which 'templating engine' to use:
			syntax: `app.set('settingName', 'templateName')`
			1. `app.set('view engine', 'hbs');`

	2. `hbs` templates live in `views/` -> need to `mkdir` this guy

		+ It is beneficial to name this folder *templates* -> this requires some configuration
			1. `const viewPath = path.join(__dirname, '../templates')`

		+ View `partials` are a thing. Using them requires creating a couple extra folders and then restructuring the file structure somewhat, and thus what `viewPath` points towards
			1. `const viewsPath = path.join(__dirname, '../templates/views');`
			2. `const partialsPath = path.join(__dirname, '../templates/partials');`

		+ Finally, *register* your views & partials
			1. `app.set('views', viewsPath);`
			2. `hbs.registerPartials(partialsPath);`

		+ Setup `nodemon` to monitor files w/extensions by:
			`$ nodemon src/app.js -e js,hbs`

		+ Partials are *pieces of html* and bear the `.hbs` extension and live in `../templates/partials`. Theyare used within an HTML doc (but w/ an *.hbs* extension). 

		+ Using a Partial requires putting a `>` flag between `{{ }}` braces and then supplying the *file name* sans dir or extension. 
			e.g A Partial with the name `header.hbs`:
				`<body> 
					{{ >header }}
				</body>`

## Using Flexbox (CSS)
* https://css-tricks.com/snippets/css/a-guide-to-flexbox/
	+ Using Flexbox to have a 'sticky' Footer
	+ Main Flexbox CSS points:
		1. `display: flex` 
		2. `flex-direction` 
		3. `min-height` 
		4. `flex-grow`
	+ Placing `footer` outside of the `.flex-container`

### EXAMPLE
`	body {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
`

`	.flex-container {
		flex-grow: 1;
	}
`

## Using EXPRESS to create Server ENDPOINTS

## Clientside `fetch()`

* CLIENT-SIDE JS, fetch() IS NOT ACCESSIBLE IN NODEJS
then() IS A promise
`fetch('http://puzzle.mead.io/puzzle').then( (response) => {
	response.json().then( (data) => {
		console.log('promise data -> ', data);
	});
});`

## Setting up SSH (key pairs)
* Makes everything easier (and more secure) when *pushing* to Git or Heroku
	1. `$ ls -la ~/.ssh` <- checks to see if *ssh keypairs* have been generated
	2. `$ ssh-keygen -t rsa -b 4096 -C "<foo@bar.com>"`
		+ `-t` type of encoding
		+ `-b` # of bits to use for key *4096* is standard
		+ `-C` comment
		+ When prompted, sometimes password is used, sometimes not.
	3. Generates (2) files in `~/.ssh`
		1. id_rsa *secret* key
		2. id_rsa.pub *publically* shared key
	4. `$ eval "$(ssh-agent -s)"` 
		+ Windows *no* double quotes
		+ Makes sure the program is *running*
		+ `-s` for *start*
	5. `$ ssh-add -K <path>` e.g. `~/.ssh/id_rsa`
		+ mac *needs* `-K`, otherwise *no flags*
		+ Registers the key
* Will need to share the `id_rsa.pub` file w/ Github -> can do this through their website once logged in.

### Applying to Github
* Use to following command:
	+ `$ ssh -T git@github.com`
		+ Tests the SSH connection w/github. Will prompt, hit *yes* and you should be good.

### Applying to Heroku
* Use the following command:
	1. `$ heroku keys:add`
		+ Searches your local for a key -> *confirm* it to set up
	2. `$ heroku create <unique-app-name>`
		+ Starts up a new project on Heroku w/specified name
		+ Provides 1) a front-facing URL and 2) a git repo for code where app is stored.
	3. Add `"start": "node src/app.js"` to package.json
		+ Shows Heroku where *app starts*
		+ Also allows for `$ npm run start` to *run* the `start` script and thus *run* the application.
	4. Add in `src/app.js` > `const port = process.env.PORT || 3000;` beneath `const app = express();`
		+ Changes the "listening" `port` from *3000* to the one which Heroku doles out. 
		+ This replaces the usual code at the bottom of `app.js`
		FROM `// LISTENER
app.listen(3000, () => {
	console.log('Server is up on 3000');
});` TO
`// LISTENER
app.listen(port, () => {
	console.log('Server is up on ' + port);
});`
	5. Must change the URL which `fetch()` uses in `public/js/app.js`
	FROM `http://localhost:3000/weather?address` TO `/weather?...` 