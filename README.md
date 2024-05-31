# FINAL PROJECT

### 4Geeks Final Project, using React + Flask, Built with Tailwind

### Cheatsheet for devs:
 
| Command                  | Definition                            |
|--------------------------|--------------------------------------:|
| `$ pipenv install`       | install the required PIP modules      |
| `$ pipenv shell`         | gets into the pip environment         |
| `$ pipenv run start`     | run the *Backend* on :3001            |
| `$ pipenv run remake`    | remake all DB tables/models           |
| `$ npm run start`        | run the *Frontend* on :3000           |
| `$ npm install`          | install the required NPM packages     |
| `$ npm run tailwind`     | update custom tailwind.css build      |
 
--- 
 
### Avoid: 
| Command                  | Definition                            |
|--------------------------|--------------------------------------:|
| `$ pipenv run init`      | initializes the migrations            |
| `$ pipenv run upgrade`   | apply changes from a migration        |
| `$ pipenv run migrate`   | Inspects and updates your tables      |
| `$ pipenv run downgrade` | Rollback your tables to prev. version |

 * its enough to just remake the DB on every change by now, even knowing that it would clear all the data stored
