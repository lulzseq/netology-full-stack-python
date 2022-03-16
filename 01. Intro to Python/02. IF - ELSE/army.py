age = int(input('Введите возраст: '))

if 18 <= age <= 27:
  kids = int(input('Наличие детей (введите количество): '))
  if kids >= 2:
      print('-----\nОтсрочка от армии')
  else:
    education = int(input("Есть ли учеба в данный момент (введите '1' если есть учеба или '0' если нет: "))
    if education == 1:
      print('-----\nОтсрочка от армии')
    else:
      height = int(input('Введите рост: '))
      if height < 170:
        print('-----\nВ танкисты')
      elif height < 185:
        print('-----\nНа флот')
      elif height < 200:
        print('-----\nВ десантники')
      else:
        print('-----\nВ другие войска')
else:
  print('-----\nНепризывной возраст')