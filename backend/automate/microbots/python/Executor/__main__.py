import os
import sys

try:
    bot_name = sys.argv[1]
    bot_version = sys.argv[2]
    process_instance_id = sys.argv[3]

except IndexError as indexError:
    print(f"Exception Occured in Executor __main__.py : Not enough parameters passed.")

# Create the Json folder for writing input and output folders

json_folder_path = os.path.join(os.path.abspath(os.curdir), "Json")
try:
    os.makedirs(os.path.join(json_folder_path, process_instance_id))
except FileExistsError as fileExistsError:
    print(
        f"Folder '{process_instance_id}' already exists under '{json_folder_path}'")
