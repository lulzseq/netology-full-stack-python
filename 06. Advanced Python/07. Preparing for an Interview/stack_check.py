from package.stack import Stack

my_stack = Stack()

my_stack.push('2')
print('Add element "2" on top')

my_stack.push('5')
print('Add element "5" on top')

my_stack.push('8')
print('Add element "8" on top')

print(f'My stack now: {my_stack.print()}')

my_stack.pop()
print(f'Delete top element. New top element: {my_stack.peek()}')

print(f'My stack now: {my_stack.print()}')
print(f'My top element now: {my_stack.peek()}')
print(f'My stack is empty? \t {my_stack.isEmpty()}')
print(f'My stack size now: {my_stack.size()}')

my_stack.clear()
print('Clear my stack')

print(f'My stack now: {my_stack.print()}')
print(f'My stack is empty? \t {my_stack.isEmpty()}')
print(f'My stack size now: {my_stack.size()}')
