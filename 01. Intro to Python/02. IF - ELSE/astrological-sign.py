month = str(input('Введите месяц вашего рождения: '))
number = int(input('Введите число вашего рождения: '))

if month == 'январь':
  if number <= 19:
    astrological_sign = 'Козерог'
  else:
    astrological_sign = 'Водолей'
elif month == 'февраль':
  if number <= 18:
    astrological_sign = 'Водолей'
  else:
    astrological_sign = 'Рыбы'
elif month == 'март':
  if number <= 20:
    astrological_sign = 'Рыбы'
  else:
    astrological_sign = 'Овен'
elif month == 'апрель':
  if number <= 20:
    astrological_sign = 'Овен'
  else:
    astrological_sign = 'Телец'
elif month == 'май':
  if number <= 20:
    astrological_sign = 'Телец'
  else:
    astrological_sign = 'Близнецы'
elif month == 'июнь':
  if number <= 20:
    astrological_sign = 'Близнецы'
  else:
    astrological_sign = 'Рак'
elif month == 'июль':
  if number <= 22:
    astrological_sign = 'Рак'
  else:
    astrological_sign = 'Лев'
elif month == 'август':
  if number <= 22:
    astrological_sign = 'Лев'
  else:
    astrological_sign = 'Дева'
elif month == 'сентябрь':
  if number <= 22:
    astrological_sign = 'Дева'
  else:
    astrological_sign = 'Весы'
elif month == 'октябрь':
  if number <= 22:
    astrological_sign = 'Весы'
  else:
    astrological_sign = 'Скорпион'
elif month == 'ноябрь':
  if number <= 21:
    astrological_sign = 'Скорпион'
  else:
    astrological_sign = 'Стрелец'
else:
  if number <= 21:
    astrological_sign = 'Стрелец'
  else:
    astrological_sign = 'Козерог'

print(f'-----\nВаш знак зодиака — {astrological_sign}')