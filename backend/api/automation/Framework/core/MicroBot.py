from abc import ABC, abstractmethod


class MicroBot(ABC):
    def __init__(self, microbot_name: str = None) -> None:
        super().__init__()
        self.microbot_name = microbot_name
        print(f"Initialized the python bot with name {self.microbot_name}")

    @abstractmethod
    def execute_bot(self):
        pass
