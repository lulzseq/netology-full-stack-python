from packages.logger import logger


@logger(path='logs/log.txt')
def summator(a, b):
    result = a + b
    return result


@logger(path='logs/log.txt')
def generator(*args, **kwargs):
    new_list = []

    def flat_generator(double_list):
        for one_list in double_list:
            for element in one_list:
                yield element

    for item in flat_generator(args):
        print(item)
        new_list.append(item)

    return new_list
