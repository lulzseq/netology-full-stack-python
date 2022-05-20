import os
import csv


class Csv():

    def __init__(self):
        self.path = os.path.join('files/')
        self.filename = 'phonebook_raw.csv'
        self.new_filename = 'phonebook.csv'

    def _read_from_csv(self) -> list:
        with open(self.path + self.filename) as file:
            rows = csv.reader(file, delimiter=',')
            contact_list = list(rows)
        return contact_list

    def _save_to_csv(self, list_: list) -> None:
        with open(self.path + self.new_filename, 'w') as f:
            datawriter = csv.writer(f, delimiter=',')
            datawriter.writerows(list_)
        return print('File was saved.')
