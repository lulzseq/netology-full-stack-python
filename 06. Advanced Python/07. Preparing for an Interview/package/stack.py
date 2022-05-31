class Stack:
    def __init__(self) -> None:
        self.stack = []

    def isEmpty(self) -> bool:
        if len(self.stack) == 0:
            return True
        else:
            return False

    def pop(self) -> str:
        self.stack.pop()
        if not self.isEmpty:
            return self.peek()

    def peek(self) -> str:
        return self.stack[-1]

    def size(self) -> int:
        return len(self.stack)

    def print(self) -> list:
        return self.stack

    def clear(self) -> None:
        return self.stack.clear()

    def push(self, element: int) -> None:
        self.stack.append(element)
