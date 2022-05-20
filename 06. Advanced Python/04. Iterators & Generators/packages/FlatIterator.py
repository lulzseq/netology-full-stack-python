class FlatIterator:
    def __init__(self, list_):
        self.list_ = list_
        self.cursor = -1
        self.list_cursor = 0
        self.list_len = len(self.list_)

    def __iter__(self):
        self.cursor += 1
        self.list_cursor = 0
        return self

    def __next__(self):
        while self.cursor - self.list_len and self.list_cursor == len(self.list_[self.cursor]):
            iter(self)
        if self.cursor == self.list_len:
            raise StopIteration
        self.list_cursor += 1
        return self.list_[self.cursor][self.list_cursor - 1]
