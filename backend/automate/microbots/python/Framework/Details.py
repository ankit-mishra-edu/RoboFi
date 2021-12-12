import json
import os

from django.conf import settings

from .config import configurations


def create_details_file(microbot_details: dict = None):
    microbot_path = os.path.join(settings.AUTOMATE_PATH, "Microbots", "Python", "BotCodes", microbot_details.get(
        'Name'), f"V{microbot_details.get('Version').replace('.', '')}")
    os.makedirs(microbot_path, exist_ok=True)

    details_file_path = os.path.join(
        microbot_path, configurations.get("DETAILS_FILE_NAME"))

    try:
        microbot_details.get("specification").pop("Version")
        microbot_details.update(**microbot_details.pop("specification"))

        microbot_details.pop("id")

        for field in ("Inputs", "Outputs", "Dependencies", "Authors", "Errors"):
            for field_detail in microbot_details.get(field):
                field_detail.pop("id")

    except:
        pass

    try:
        mode = 'x'
        if os.path.exists(details_file_path):
            mode = 'w'

        with open(details_file_path, mode) as details_file_obj:
            details_file_obj.write(json.dumps(microbot_details, indent=4))

    except Exception as e:
        print(
            f"Exception while creating Details file for {microbot_details.get('Name')} : {e}")
        return False

    return True
