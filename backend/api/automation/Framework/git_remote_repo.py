from django.conf import settings
from github import Github
from github.Repository import Repository

from ..models import Configuration


def create_empty_file(path: str = None, message: str = None, token=None, repo_name=None):
    if path is not None and message is not None and token is not None and repo_name is not None:
        github: Github = Github(token)

        repo: Repository = github.get_repo(repo_name)

        repo.create_file(path=path, message=message)


def create_file_with_content(path: str = None, message: str = None, content: str = None, token=None, repo_name=None):
    if path is not None and message is not None and content is not None and token is not None and repo_name is not None:
        github: Github = Github(token)

        repo: Repository = github.get_repo(repo_name)

        status = repo.create_file(
            path=path, message=message, content=content)


def update_file(path: str = None, message: str = None, content: str = None, token=None, repo_name=None):
    if path is not None and message is not None and content is not None and token is not None and repo_name is not None:
        github: Github = Github(token)

        repo: Repository = github.get_repo(repo_name)

        repo_contents = repo.get_contents(path=path)

        status = repo.update_file(
            path=path, message=message, content=content, sha=repo_contents.sha)


def delete_file(path: str = None, message: str = None, token=None, repo_name=None):
    if path is not None and message is not None and token is not None and repo_name is not None:
        github: Github = Github(token)

        repo: Repository = github.get_repo(repo_name)

        repo_contents = repo.get_contents(path=path)

        status = repo.delete_file(
            path=path, message=message, sha=repo_contents.sha)
