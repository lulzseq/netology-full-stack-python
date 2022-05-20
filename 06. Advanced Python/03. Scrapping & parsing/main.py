from packages.habr_parse import Habr


def print_all_articles(articles):
    for article in articles:
        print(article)
    return


if __name__ == '__main__':
    keywords = ['DevOps', 'SQL', 'дайдж']

    habr = Habr()
    page = habr._get_page_content()
    articles = habr._get_articles(page, *keywords)

    print_all_articles(articles)
