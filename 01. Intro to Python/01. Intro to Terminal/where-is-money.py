salary = int(input('Введите заработную плату в месяц: '))
mortgage = int(input('Введите, какой процент(%) уходит на ипотеку: '))
daily_expenses = int(input('Введите, какой процент(%) уходит на жизнь: '))

print(f'\nНа ипотеку было потрачено: {int(salary * (mortgage / 100) * 12)}')
print(f'Было накоплено: {int((salary * (100 - mortgage - daily_expenses) / 100) * 12)}')