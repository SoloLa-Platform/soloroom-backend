# FlowTab

A browser-based flowing guitar tablature web
## Requirements

- Python 2.7.10
- django 1.11.6
- MySQL
- SoloLa(Unintregated in this version, under standalone packing and testing)

## Installation

change requirement.txt tp pipenv

``
# create virtual env. and pip install
virtualenv --python=/path/to/python2.7 .ENV
source .ENV/bin/activate
pip install -r requirements.txt

# start dev server
python manage.py runserver
``

## Directory

- mysite: configuration files for django
- tabproject/ : backend source code
- tabproject/static/tabproject/js/: frontend source code ( unstable, under changing framework )
- tabproject/templates: html template
- static: django global static cache (DON'T MODIFY)
- script: deploy/develop shell scripts


