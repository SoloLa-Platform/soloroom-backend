# 1. start virtualenvr
source Env/start_env_server.sh

# 2. deploy by python fab
fab deploy

## check fabfile.py 
fab fabfile.py
- deploy ( git pull + django collectstatic )
- deploy_static (collectstatic)
