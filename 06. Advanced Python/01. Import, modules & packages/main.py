from typing import Tuple

from application.salary import calculate_salary
from application.db.people import get_employees


def main() -> Tuple[None, None]:
    return calculate_salary(), get_employees()


if __name__ == '__main__':
    main()