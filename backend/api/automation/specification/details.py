import json

from django.conf import settings

from ..Framework.git_remote_repo import (create_file_with_content, delete_file,
                                         update_file)
from ..models import Configuration


def create_details_file(request, specification_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        specification_path = f"specifications/{specification_details.get('Name')}/V{specification_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}"
        details_file_path = f"{specification_path}/{getDetailsFileName(config_entries)}"
        readme_file_path = f"{specification_path}/{getReadmeFileName(config_entries)}"

        specification_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in specification_details.get(field):
                field_detail.pop("id")

    except Exception as e:
        print(f"Exception Occured : {e}")

    try:
        content = json.dumps(specification_details, indent=4)
        commit_message = f"Create Specification {specification_details.get('Name')} {getDetailsFileName(config_entries)} V{specification_details.get('Version')}"
        create_file_with_content(
            path=details_file_path, message=commit_message, content=content, token=getToken(config_entries), repo_name=getRepoName(config_entries))

        content = f"###{specification_details.get('Name')}_V{specification_details.get('Version')}"
        commit_message = f"Create Specification {specification_details.get('Name')} {getReadmeFileName(config_entries)} V{specification_details.get('Version')}"
        create_file_with_content(
            path=readme_file_path, message=commit_message, content=content, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while creating Specification Details file for {specification_details.get('Name')} : {e.__str__()}")
        return False

    return True


def update_details_file(request, specification_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        details_file_path = f"specifications/{specification_details.get('Name')}/V{specification_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}/{getDetailsFileName(config_entries)}"

        specification_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in specification_details.get(field):
                field_detail.pop("id")

    except Exception as e:
        print(f"Exception Occured : {e}")

    try:
        content = json.dumps(specification_details, indent=4)
        commit_message = f"Update Specification {specification_details.get('Name')} {getDetailsFileName(config_entries)} V{specification_details.get('Version')}"
        update_file(path=details_file_path,
                    message=commit_message, content=content, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while Updating Specification Details file for {specification_details.get('Name')} : {e.__str__()}")
        return False

    return True


def delete_details_file(request, specification_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        details_file_path = f"specifications/{specification_details.get('Name')}/V{specification_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}/{getDetailsFileName(config_entries)}"

        commit_message = f"Delete Specification {specification_details.get('Name')} {getDetailsFileName(config_entries)} V{specification_details.get('Version')}"
        delete_file(path=details_file_path,
                    message=commit_message, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while Deleting Specification Details file for {specification_details.get('Name')} : {e.__str__()}")
        return False

    return True


def getToken(config_entries) -> str:
    return config_entries.get(name='gitRemoteToken').value


def getRepoName(config_entries) -> str:
    return config_entries.get(name='gitRemoteRepo').value


def getDetailsFileName(config_entries) -> str:
    return config_entries.get(name='specificationDetailsFileName').value or settings.AUTOMATION_DETAILS_FILE_NAME


def getReadmeFileName(config_entries) -> str:
    return config_entries.get(name='specificationReadmeFileName').value or settings.AUTOMATION_README_FILE_NAME
