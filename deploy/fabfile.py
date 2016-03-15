from fabric.api import local

def deploy():
	pull()
	deploy_static()
def deploy_static():
        local("python ./manage.py collectstatic")
def pull():
	local("sudo git pull origin master")
