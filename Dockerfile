from python:3.7.1-stretch

WORKDIR /FlowTab



# Install Python Dependency
RUN pip install --upgrade pip
RUN pip install pipenv
COPY ./Pipfile /FlowTab/Pipfile
RUN pipenv install --system --skip-lock
# RUN pipenv shell

# Copy project source code
COPY  . /FlowTab/

# RUN python manage.py runserver
