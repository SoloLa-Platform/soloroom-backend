# FlowTab 

A browser-based flowing guitar tablature editing system integrated with solola guitar technique transcription algorithm

## Requirements

- [pipenv](https://github.com/pypa/pipenv)
- python 3.7 (or 3+)
- django 2.1.1
- PostgresSQL
- Docker / docker-compose
- [SoloLa](https://github.com/SoloLa-Platform/SoloLa)

(Detail packages dependency recored in Pipfile)

## Status

This web app is not full integrated with SoloLa
- [trello kanban for FlowTab](https://trello.com/b/eBcjm7aR/kanban-for-solola-platform)

## Installation

Use docker-compose to create development environment

```shell

cd FlowTab
# start postgress and django environment
docker-compose up
# the web app start up at http://localhost:8000

```

## Directory

- mysite: configuration files for django
- tabproject/ : backend source code
- tabproject/static/tabproject/js/: frontend source code ( unstable, under changing framework )
- tabproject/templates: html template
- static: django global static cache (DON'T MODIFY)
- script: deploy/develop shell scripts


