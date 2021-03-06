import json

from django.conf import settings
from ..models import Configuration

from ..Framework.core.GitRemoteRepo import GitHubRepo


def create_details_file(request, microbot_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        path = f"microbots/{microbot_details.get('Technology')}/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}"

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
        GitHubRepo(getToken(config_entries),
                   repo_name=getRepoName(config_entries)).update_repo_file(path=path, message=commit_message, content=content, action="create")

    except Exception as e:
        print(
            f"Exception while creating Microbot Details file for {microbot_details.get('Name')} : {e.__str__()}")
        return False

    return True


def update_details_file(request, microbot_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        path = f"microbots/{microbot_details.get('Technology')}/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}"

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
        GitHubRepo(getToken(config_entries),
                   repo_name=getRepoName(config_entries)).update_repo_file(path=path, message=commit_message, content=content, action="update")

    except Exception as e:
        print(
            f"Exception while Updating Microbot Details file for {microbot_details.get('Name')} : {e.__str__()}")
        return False

    return True


def delete_details_file(request, microbot_details: dict = None):
    try:
        config_entries = Configuration.objects.get(
            user=request.user).entries.all()

        path = f"microbots/{microbot_details.get('Technology')}/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{getDetailsFileName(config_entries)}"

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
        GitHubRepo(getToken(config_entries),
                   repo_name=getRepoName(config_entries)).update_repo(path=path, message=commit_message, action="delete")

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
    return config_entries.get(name='microbotDetailsFileName').value
