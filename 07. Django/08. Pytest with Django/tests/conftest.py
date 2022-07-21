import pytest
from model_bakery import baker
from rest_framework.test import APIClient


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def course_factory():
    def factory(**kwargs):
        return baker.make('Course', **kwargs)

    return factory


@pytest.fixture
def student_factory():
    def factory(**kwargs):
        return baker.make('Student', **kwargs)

    return factory
