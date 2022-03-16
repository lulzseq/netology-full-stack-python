i = 1
for color in 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet':
    print(i, '-th color of rainbow is ', color, sep = '')
    i += 1
print('-----')

for i in 1, 2, 3, 'one', 'two', 'three':
    print(i)
print('-----')

sum = 0
n = 5
for i in range(1, n + 1):
    sum += i
print(sum)
print('-----')

i = 1
while i <= 10:
    print(i)
    i += 1
print('-----')