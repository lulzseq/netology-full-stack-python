import random
import pytest
from django.urls import reverse
from rest_framework.status import is_success


@pytest.mark.django_db
def test_get_first_course(client, course_factory, student_factory):
    student = student_factory(_quantity=3)
    course = course_factory(students=student)

    response = client.get(reverse('courses-detail', args=[course.id]))

    assert is_success(response.status_code)
    assert response.json()['id'] == course.id
    assert response.json()['name'] == course.name


@pytest.mark.django_db
def test_list_course(client, student_factory, course_factory):
    students = student_factory(_quantity=3)
    courses = course_factory(students=students, _quantity=5)
    expected_id_set = [course.id for course in courses]

    response = client.get(reverse('courses-list'))
    result_id_set = [res['id'] for res in response.json()]

    assert is_success(response.status_code)
    assert len(response.json()) == 5
    assert result_id_set == expected_id_set


@pytest.mark.django_db
def test_course_filter_by_id(client, course_factory, student_factory):
    students = student_factory(_quantity=3)
    courses = course_factory(students=students, _quantity=5)
    random_id = random.choice(courses).id

    response = client.get(reverse('courses-list'), {'id': random_id})

    assert is_success(response.status_code)
    assert response.json()[0]
    assert response.json()[0]['id'] == random_id


@pytest.mark.django_db
def test_courses_filter_by_name(client, course_factory, student_factory):
    students = student_factory(_quantity=3)
    courses = course_factory(students=students, _quantity=5)
    random_course = random.choice(courses)

    response = client.get(reverse('courses-list'), {'name': random_course.name})

    assert is_success(response.status_code)
    assert response.json()[0]
    assert response.json()[0]['id'] == random_course.id
    assert response.json()[0]['name'] == random_course.name


@pytest.mark.django_db
def test_course_create(client):
    course_detail = {'name': 'test_course_created'}
    url = reverse('courses-list')

    response = client.post(url, course_detail)
    response_get = client.get(url, {'name': course_detail['name']})

    assert is_success(response.status_code)
    assert response_get.json()[0]
    assert response_get.json()[0]['name'] == course_detail['name']


@pytest.mark.django_db
def test_course_update(client, course_factory, student_factory):
    students = student_factory(_quantity=3)
    course_old = course_factory(students=students)
    course_new = course_factory(students=students)

    response = client.patch(reverse('courses-detail', args=[course_old.id]), {'name': course_new.name})
    response_get = client.get(reverse('courses-detail', args=[course_old.id]), {'id': course_old.id})

    assert is_success(response.status_code)
    assert response.json()['id'] == course_old.id and response.json()['name'] == course_new.name
    assert response_get.json()['id'] == course_old.id and response_get.json()['name'] == course_new.name


@pytest.mark.django_db
def test_course_delete(client, course_factory, student_factory):
    students = student_factory(_quantity=3)
    courses = course_factory(students=students, _quantity=5)
    random_course = random.choice(courses)

    response = client.delete(reverse('courses-detail', args=[random_course.id]))
    response_get = client.get(reverse('courses-list'))

    existed_ids = [course['id'] for course in response_get.json()]

    assert is_success(response.status_code)
    assert random_course.id not in existed_ids
