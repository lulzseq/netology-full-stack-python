def flat_generator(double_list):
    for one_list in double_list:
        for element in one_list:
            yield element
