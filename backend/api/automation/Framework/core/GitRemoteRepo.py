from github import Github
from github.Repository import Repository


class GitHubRepo():
    def __init__(self, token=None, repo_name=None):
        self.__is_valid_repo = token is not None and repo_name is not None
        if self.__is_valid_repo:
            self.__github_object: Github = Github(token)
            self.__github_repo: Repository = self.__github_object.get_repo(
                repo_name)
            print('Github self.__github_repo from Framework.core initialized')

    def update_repo(self, path: str = None, message: str = None, action: str = None):
        if self.__is_valid_repo and (action == 'create'):
            self.__create_empty_file(path, message)
        elif self.__is_valid_repo and (action == 'delete'):
            self.__delete_file(path, message)

    def update_repo_file(self, path: str = None, message: str = None, content: str = None, action: str = None):
        if self.__is_valid_repo and (action == 'create'):
            self.__create_file_with_content(path, message, content)
        elif self.__is_valid_repo and (action == 'update'):
            self.__update_file(path, message, content)

    def __create_empty_file(self, path: str = None, message: str = None):
        if path is not None and message is not None:
            self.__github_repo.create_file(path=path, message=message)

    def __create_file_with_content(self, path: str = None, message: str = None, content: str = None):
        if path is not None and message is not None and content is not None:
            self.__github_repo.create_file(
                path=path, message=message, content=content)

    def __update_file(self, path: str = None, message: str = None, content: str = None):
        if path is not None and message is not None and content is not None:
            repo_contents = self.__github_repo.get_contents(path=path)
            status = self.__github_repo.update_file(
                path=path, message=message, content=content, sha=repo_contents.sha)

    def __delete_file(self, path: str = None, message: str = None):
        if path is not None and message is not None:
            repo_contents = self.__github_repo.get_contents(path=path)
            status = self.__github_repo.delete_file(
                path=path, message=message, sha=repo_contents.sha)
