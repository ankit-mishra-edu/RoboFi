import os
import sys

sys.path.append(
    r"D:\Learnings\Python\robofi\backend\automate\microbots\python")
from Framework.MicroBot import MicroBot


class DeleteFile(MicroBot):
    def __init__(self) -> None:
        super().__init__(type(self).__name__)

    def execute_bot(self):
        pass


if __name__ == '__main__':
    microbot = DeleteFile()
