class Student:
    def __init__(self, name, surname, gender):
        self.name = name
        self.surname = surname
        self.gender = gender
        self.finished_courses = []
        self.courses_in_progress = []
        self.grades = {}

    def rate_lecturer(self, lecturer, course, grade):
        if isinstance(lecturer,
                      Lecturer) and course in lecturer.courses_attached and course in self.courses_in_progress:
            if course in lecturer.grades:
                lecturer.grades[course] += [grade]
            else:
                lecturer.grades[course] = [grade]
        else:
            return 'Error'

    def __get_avg(self):
        avg_list = []

        for i in self.grades.values():
            avg_list += i

        return round(sum(avg_list) / len(avg_list), 2)

    def __str__(self):
        return f'Имя: {self.name}\nФамилия: {self.surname}\nСредняя оценка за лекции: {self.__get_avg()}\n' \
               f'Курсы в процессе изучения: {(", ").join(self.courses_in_progress)}\n' \
               f'Завершенные курсы: {(", ").join(self.finished_courses)}'


class Mentor:
    def __init__(self, name, surname):
        self.name = name
        self.surname = surname
        self.courses_attached = []


class Lecturer(Mentor):
    def __init__(self, name, surname):
        self.grades = {}
        super().__init__(name, surname)

    def __get_avg(self):
        avg_list = []

        for i in self.grades.values():
            avg_list += i

        self.avg_score = round(sum(avg_list) / len(avg_list), 2)
        return self.avg_score

    def __lt__(self, other):
        if isinstance(other, Lecturer):
            return self.__get_avg() > other.__get_avg()
        else:
            return print(f'{other} not a Lecturer')

    def __str__(self):
        return f'Имя: {self.name}\nФамилия: {self.surname}\nСредняя оценка за лекции: {self.__get_avg()}'


class Reviewer(Mentor):
    def __init__(self, name, surname):
        super().__init__(name, surname)

    def rate_hw(self, student, course, grade):
        if isinstance(student, Student) and course in self.courses_attached and course in student.courses_in_progress:
            if course in student.grades:
                student.grades[course] += [grade]
            else:
                student.grades[course] = [grade]
        else:
            return 'Error'

    def __str__(self):
        return f'Имя: {self.name}\nФамилия: {self.surname}'


def get_avg(person):
    avg_list = []

    for i in person.__dict__['grades'].values():
        avg_list += i

    person.avg_score = round(sum(avg_list) / len(avg_list), 2)
    return person.avg_score


def compare(person1, person2):
    if (isinstance(person1, Lecturer) and isinstance(person2, Lecturer)) \
            or (isinstance(person1, Student) and isinstance(person2, Student)):
        if get_avg(person1) < get_avg(person2):
            return f'\n-- Comparsion --\n{person1.name} {person1.surname} ({person1.avg_score}) has a less average ' \
                   f'score than {person2.name} {person2.surname} ({person2.avg_score})'
        else:
            return f'\n-- Comparsion --\n{person1.name} {person1.surname} ({person1.avg_score}) has a more average ' \
                   f'score than {person2.name} {person2.surname} ({person2.avg_score})'


def avg_score_students(list_, course):
    avg_list = []

    for person in list_:
        if course in person.courses_in_progress:
            for val in person.grades[course]:
                avg_list.append(val)

    return round(sum(avg_list) / len(avg_list), 2)


def avg_score_lectures(list_, course):
    avg_list = []

    for person in list_:
        if course in person.courses_attached:
            for val in person.grades[course]:
                avg_list.append(val)

    return round(sum(avg_list) / len(avg_list), 2)


best_student = Student('Ruoy', 'Eman', 'male')
best_student.courses_in_progress += ['Python', 'Git']
best_student.finished_courses += ['Введение в программирование']

best_student2 = Student('New', 'Student', 'male')
best_student2.courses_in_progress += ['Python', 'Git']
best_student2.finished_courses += ['Введение в программирование']

cool_reviewer = Reviewer('Some', 'Buddy')
cool_reviewer.courses_attached += ['Python', 'Git', 'Math']

cool_reviewer.rate_hw(best_student, 'Python', 10)
cool_reviewer.rate_hw(best_student, 'Python', 6)
cool_reviewer.rate_hw(best_student, 'Python', 8)

cool_reviewer.rate_hw(best_student2, 'Python', 1)
cool_reviewer.rate_hw(best_student2, 'Python', 3)
cool_reviewer.rate_hw(best_student2, 'Python', 4)

cool_lecturer = Lecturer('Guido', 'van Rossum')
cool_lecturer.courses_attached += ['Python']

best_student.rate_lecturer(cool_lecturer, 'Python', 10)
best_student.rate_lecturer(cool_lecturer, 'Python', 9)

cool_lecturer2 = Lecturer('Some', 'Lecturer')
cool_lecturer2.courses_attached += ['Python']

best_student2.rate_lecturer(cool_lecturer2, 'Python', 2)
best_student2.rate_lecturer(cool_lecturer2, 'Python', 3)

print(f"\n-- Student's grades --\n{best_student.grades}")
print(f"\n-- Lecturer's grades --\n{cool_lecturer.grades}")

print(f"\n-- Overload in: Reviewer --\n{cool_reviewer}")
print(f"\n-- Overload in: Lecturer --\n{cool_lecturer}")
print(f"\n-- Overload in: Student --\n{best_student}")

print(compare(cool_lecturer, cool_lecturer2))
print(compare(best_student2, best_student))

best_student3 = Student('Third', 'Student', 'female')
best_student3.courses_in_progress += ['Math', 'Python']

cool_reviewer.rate_hw(best_student3, 'Math', 10)
cool_reviewer.rate_hw(best_student3, 'Math', 10)
cool_reviewer.rate_hw(best_student3, 'Math', 10)
cool_reviewer.rate_hw(best_student3, 'Python', 10)
cool_reviewer.rate_hw(best_student3, 'Python', 10)
cool_reviewer.rate_hw(best_student3, 'Python', 10)

cool_lecturer3 = Lecturer('Third', 'Lecturer')
cool_lecturer3.courses_attached += ['Math']

best_student3.rate_lecturer(cool_lecturer3, 'Math', 10)
best_student3.rate_lecturer(cool_lecturer3, 'Math', 10)

students_list = [best_student, best_student2, best_student3]
lectures_list = [cool_lecturer, cool_lecturer2, cool_lecturer3]

print(f"Average score for students and current course: {avg_score_students(students_list, 'Python')}")
print(f"Average score for lectures and current course: {avg_score_lectures(lectures_list, 'Python')}")