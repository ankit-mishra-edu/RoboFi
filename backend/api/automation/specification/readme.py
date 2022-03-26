import json

from django.conf import settings
from ..models import Configuration

from ..Framework.core.GitRemoteRepo import GitHubRepo


def create_readme_file(request, specification_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        path = f"specifications/{specification_details.get('Name')}/V{specification_details.get('Version').replace('.', '')}/{getReadmeFileName(config_entries)}"

        specification_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in specification_details.get(field):
                field_detail.pop("id")

    except Exception as e:
        print(f"Exception Occured : {e}")

    try:
        content = f"# {specification_details.get('Name')}_V{specification_details.get('Version')}"
        commit_message = f"Create Specification {specification_details.get('Name')} {getReadmeFileName(config_entries)} V{specification_details.get('Version')}"
        GitHubRepo(getToken(config_entries),
                   repo_name=getRepoName(config_entries)).update_repo_file(path=path, message=commit_message, content=content, action="create")

        # create_file_with_content(
        #     path=path, message=commit_message, content=content, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while creating Specification Readme file for {specification_details.get('Name')} : {e.__str__()}")
        return False

    return True


def update_readme_file(request, specification_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        path = f"specifications/{specification_details.get('Name')}/V{specification_details.get('Version').replace('.', '')}/{getReadmeFileName(config_entries)}"

        specification_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in specification_details.get(field):
                field_detail.pop("id")

    except Exception as e:
        print(f"Exception Occured : {e}")

    try:
        content = f"# {specification_details.get('Name')}_V{specification_details.get('Version')}"
        commit_message = f"Update Specification {specification_details.get('Name')} {getReadmeFileName(config_entries)} V{specification_details.get('Version')}"
        GitHubRepo(getToken(config_entries),
                   repo_name=getRepoName(config_entries)).update_repo_file(path=path, message=commit_message, content=content, action="update")

        # update_file(path=path,
        #             message=commit_message, content=content, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while Updating Specification Readme file for {specification_details.get('Name')} : {e.__str__()}")
        return False

    return True


def delete_readme_file(request, specification_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        path = f"specifications/{specification_details.get('Name')}/V{specification_details.get('Version').replace('.', '')}/{getReadmeFileName(config_entries)}"

        commit_message = f"Delete Specification {specification_details.get('Name')} {getReadmeFileName(config_entries)} V{specification_details.get('Version')}"
        GitHubRepo(getToken(config_entries),
                   repo_name=getRepoName(config_entries)).update_repo(path=path, message=commit_message, action="delete")

        # delete_file(path=path,
        #             message=commit_message, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while Deleting Specification Readme file for {specification_details.get('Name')} : {e.__str__()}")
        return False

    return True


def getToken(config_entries) -> str:
    return config_entries.get(name='gitRemoteToken').value


def getRepoName(config_entries) -> str:
    return config_entries.get(name='gitRemoteRepo').value


def getReadmeFileName(config_entries) -> str:
    return config_entries.get(name='specificationReadmeFileName').value
