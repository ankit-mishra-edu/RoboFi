import json

from django.conf import settings

from ..Framework.git_remote_repo import (create_file_with_content, delete_file,
                                         update_file)
from ..models import Configuration


def create_details_file(request, microbot_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        details_file_path = f"microbots/{microbot_details.get('Technology')}/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}"

        microbot_details.get("specification").pop("Version")
        microbot_details.get("specification").pop("Description")
        microbot_details.update(**microbot_details.pop("specification"))

        microbot_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in microbot_details.get(field):
                field_detail.pop("id")

    except Exception as e:
        print(f"Exception Occured : {e}")

    try:
        content = json.dumps(microbot_details, indent=4)
        commit_message = f"Create Microbot {microbot_details.get('Name')} {getDetailsFileName(config_entries)} {microbot_details.get('Technology')} V{microbot_details.get('Version')}"
        create_file_with_content(
            path=details_file_path, message=commit_message, content=content, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while creating Microbot Details file for {microbot_details.get('Name')} : {e.__str__()}")
        return False

    return True


def update_details_file(request, microbot_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        details_file_path = f"microbots/{microbot_details.get('Technology')}/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}"

        microbot_details.get("specification").pop("Version")
        microbot_details.get("specification").pop("Description")
        microbot_details.update(**microbot_details.pop("specification"))

        microbot_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in microbot_details.get(field):
                field_detail.pop("id")

    except Exception as e:
        print(f"Exception Occured : {e}")

    try:
        content = json.dumps(microbot_details, indent=4)
        commit_message = f"Update {microbot_details.get('Name')} {getDetailsFileName(config_entries)} {microbot_details.get('Technology')} V{microbot_details.get('Version')}"
        update_file(path=details_file_path,
                    message=commit_message, content=content, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while Updating Microbot Details file for {microbot_details.get('Name')} : {e.__str__()}")
        return False

    return True


def delete_details_file(request, microbot_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        details_file_path = f"microbots/{microbot_details.get('Technology')}/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}"

        microbot_details.get("specification").pop("Version")
        microbot_details.get("specification").pop("Description")
        microbot_details.update(**microbot_details.pop("specification"))

        microbot_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in microbot_details.get(field):
                field_detail.pop("id")

    except Exception as e:
        print(f"Exception Occured : {e}")

    try:
        commit_message = f"Delete {microbot_details.get('Name')} {getDetailsFileName(config_entries)} {microbot_details.get('Technology')} V{microbot_details.get('Version')}"
        delete_file(path=details_file_path,
                    message=commit_message, token=getToken(config_entries), repo_name=getRepoName(config_entries))

    except Exception as e:
        print(
            f"Exception while Deleting Microbot Details file for {microbot_details.get('Name')} : {e.__str__()}")
        return False

    return True


def getToken(config_entries) -> str:
    return config_entries.get(name='gitRemoteToken').value


def getRepoName(config_entries) -> str:
    return config_entries.get(name='gitRemoteRepo').value


def getDetailsFileName(config_entries) -> str:
    return config_entries.get(name='microbotDetailsFileName').value or settings.AUTOMATION_DETAILS_FILE_NAME


def getReadmeFileName(config_entries) -> str:
    return config_entries.get(name='microbotReadmeFileName').value or settings.AUTOMATION_README_FILE_NAME
