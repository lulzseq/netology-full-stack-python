square_side = int(input('Введите длину стороны квадрата: '))

print (f'\nПериметр: {4*square_side}')
print(f'Площадь: {square_side**2}\n')

rectangle_length = int(input('Введите длину прямоугольника: '))
rectangle_width = int(input('Введите ширину прямоугольника: '))

print (f'\nПериметр: {2*(rectangle_length + rectangle_width)}')
print(f'Площадь: {rectangle_length * rectangle_width}')