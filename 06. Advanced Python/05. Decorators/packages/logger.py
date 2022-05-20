from datetime import datetime as dt


def logger(path):
    def _logger(wrapped_func):
        def wrapper(*args, **kwargs):
            result = wrapped_func(*args, **kwargs)
            with open(path, 'a') as file:
                file.write(f"Дата и время запуска функции: {dt.now().strftime('%A, %d %B %Y %H:%M:%S')}")
                file.write('\n')
                file.write(f'Имя функции: {wrapped_func.__name__}')
                file.write('\n')
                file.write(f"Аргументы функции: {args} и {kwargs}")
                file.write('\n')
                file.write(f'Результат работы функции: {result}')
                file.write('\n-----\n')
            return result

        return wrapper

    return _logger
