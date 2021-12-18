from django.conf import settings

from .github_repo import create_file_with_content


def create_details_file(microbot_details: dict = None):
    print(microbot_details)

    details_file_path = f"microbots/python/BotCodes/{microbot_details.get('Name')}/V{microbot_details.get('Version').replace('.', '')}/{settings.AUTOMATION_DETAILS_FILE_NAME}"

    try:
        microbot_details.get("specification").pop("Version")
        microbot_details.update(**microbot_details.pop("specification"))

        microbot_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in microbot_details.get(field):
                field_detail.pop("id")

    except Exception as e:
        print(f"Exception Occured : {e}")

    try:
        create_file_with_content(
            path=details_file_path, message=f"Create {settings.AUTOMATION_DETAILS_FILE_NAME}", content=microbot_details)

    except Exception as e:
        print(
            f"Exception while creating Details file for {microbot_details.get('Name')} : {e}")
        return False

    return True
