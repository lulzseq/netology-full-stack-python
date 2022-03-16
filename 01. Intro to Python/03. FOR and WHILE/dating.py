boys = ['Peter', 'Alex', 'John', 'Arthur', 'Richard']
girls = ['Kate', 'Liza', 'Kira', 'Emma', 'Trisha']

print('Идеальные пары:')
for man, woman in zip(boys, girls):
  print(man, woman)

if len(boys) > len(girls):
  print('\nБез пары остались:')
  difference = len(boys) - len(girls)
  for i in range(1, difference+1):
    print(boys[-i])
else:
  print('\nБез пары остались:')
  difference = len(girls) - len(boys)
  for i in range(1, difference+1):
    print(girls[-i])