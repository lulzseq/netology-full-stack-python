import re
from collections import OrderedDict


class FormatList():

    def _get_new_contact_list(self, default_contact_list: list) -> list:
        new_contact_list = []
        new_contact_list.append(default_contact_list[0])

        for contact in default_contact_list[1:]:

            full_name = contact[:3]
            organization = contact[3]
            position = contact[4]
            phone = contact[5]
            email = contact[6]

            full_name_list = []
            for part_name in full_name:
                regexed_name = re.findall(r'[А-ЯЁ][а-яё]+', part_name)
                full_name_list.extend(regexed_name)

            full_name_list.append(organization)
            full_name_list.append(position)

            if phone != '':
                searched_number = re.findall(r'(?:(?:8|\+7)[\- ]?)?(?:\(?\d{3}\)?[\- ]?)?[\d\-]{7,18}', phone)
                number_without_characters = re.sub(r'[\+\-\(\)\ ]', '', searched_number[0])
                number = re.sub(r'^8', '7', number_without_characters)
                cleaned_number = f'+{number[0]}({number[1:4]}){number[4:7]}-{number[7:9]}-{number[9:11]}'
                if len(phone.split('доб')) == 2:
                    added_phone = 'доб.' + re.findall(r'\d+', phone.split('доб')[1])[0]
                    cleaned_number += ' ' + added_phone
                full_name_list.append(cleaned_number)

            if email != '':
                full_name_list.append(email)

            new_contact_list.append(full_name_list)

        result_list = self._remove_duplicates(new_contact_list)
        return result_list

    def _remove_duplicates(self, list_: list) -> list:
        k = 0
        while k < len(list_) - 1:
            for list1, list2 in zip(list_[k], list_[k + 1]):
                if list1 == list2:
                    new_list = list(OrderedDict.fromkeys(list_[k] + list_[k + 1]))
                    list_.remove(list_[k + 1])
                    list_.remove(list_[k])
                    list_.append(new_list)
                break
            k += 1
        return list_
