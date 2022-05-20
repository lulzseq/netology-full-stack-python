from packages.FlatIterator import FlatIterator
from packages.flat_generator import flat_generator

nested_list = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f', 'h', False],
    [1, 2, None],
]
if __name__ == '__main__':
    print('Print generator elements:')
    for element in flat_generator(nested_list):
        print(element)

    print()
    print('Print iterator elements:')
    for item in FlatIterator(nested_list):
        print(item)

    flat_list = [item for item in FlatIterator(nested_list)]
    print(flat_list)
