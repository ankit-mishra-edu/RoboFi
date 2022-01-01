import json

from django.conf import settings

from ..Framework.git_remote_repo import create_file_with_content, delete_file, update_file


def create_details_file(microbot_details: dict = None):
    try:
        details_file_path = f"microbots/python/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{settings.AUTOMATION_DETAILS_FILE_NAME}"

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
        commit_message = f"Create {settings.AUTOMATION_DETAILS_FILE_NAME} V{microbot_details.get('Version')}"
        create_file_with_content(
            path=details_file_path, message=commit_message, content=content)

    except Exception as e:
        print(
            f"Exception while creating Details file for {microbot_details.get('Name')} : {e.__str__()}")
        return False

    return True


def update_details_file(microbot_details: dict = None):
    try:
        details_file_path = f"microbots/python/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{settings.AUTOMATION_DETAILS_FILE_NAME}"

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
        commit_message = f"Update {settings.AUTOMATION_DETAILS_FILE_NAME} V{microbot_details.get('Version')}"
        update_file(path=details_file_path,
                    message=commit_message, content=content)

    except Exception as e:
        print(
            f"Exception while Updating Details file for {microbot_details.get('Name')} : {e.__str__()}")
        return False

    return True


def delete_details_file(microbot_details: dict = None):
    details_file_path = f"microbots/python/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{settings.AUTOMATION_DETAILS_FILE_NAME}"

    try:
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
        commit_message = f"Delete {settings.AUTOMATION_DETAILS_FILE_NAME} V{microbot_details.get('Version')}"
        delete_file(path=details_file_path, message=commit_message)

    except Exception as e:
        print(
            f"Exception while Updating Details file for {microbot_details.get('Name')} : {e.__str__()}")
        return False

    return True
