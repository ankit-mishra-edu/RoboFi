from django.conf import settings
from github import Github
from github.Repository import Repository


def create_empty_file(path: str = None, message: str = None):
    if path is not None and message is not None:
        token: str = settings.AUTOMATION_TOKEN
        repo_name: str = settings.AUTOMATION_REPO
        github: Github = Github(token)

        repo: Repository = github.get_repo(repo_name)

        repo.create_file(path=path, message=message)


def create_file_with_content(path: str = None, message: str = None, content: str = None):
    if path is not None and message is not None and content is not None:
        token: str = settings.AUTOMATION_TOKEN
        repo_name: str = settings.AUTOMATION_REPO
        github: Github = Github(token)

        repo: Repository = github.get_repo(repo_name)

        repo.create_file(
            path=path, message=message, content=content)
