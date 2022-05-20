from datetime import datetime as dt
from main import *


def get_datetime_now() -> None:
    return print(dt.now().date().strftime("%A, %d %B %Y"))


if __name__ == '__main__':
    main()
    get_datetime_now()