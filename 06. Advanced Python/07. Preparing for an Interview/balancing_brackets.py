from package.stack import Stack


def check_balanced(lst: list) -> str:

    my_stack = Stack()
    d = {'(': ')', '{': '}', '[': ']'}

    if len(lst) % 2 != 0 or lst[0] in d.values():
        return 'Your string is not balanced'

    for item in lst:
        if item in d.keys():
            my_stack.push(item)
        else:
            if my_stack.size() == 0:
                return 'Your string is not balanced'
            key = my_stack.peek()
            if d[key] != item:
                return 'Your string is not balanced'
            my_stack.pop()

    if my_stack.isEmpty():
        return 'Your string is balanced'
    else:
        return 'Your string is not balanced'


if __name__ == '__main__':
    lst = list(input('Input string: '))
    print(check_balanced(lst))
