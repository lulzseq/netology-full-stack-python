from package.csv import Csv
from package.format_list import FormatList

if __name__ == '__main__':
    contact_list = Csv()._read_from_csv()
    new_contact_list = FormatList()._get_new_contact_list(contact_list)
    Csv()._save_to_csv(new_contact_list)
