from tqdm import tqdm
from bs4 import BeautifulSoup
from packages.api_basic import ApiBasic


class Habr(ApiBasic):
    def _get_page_content(self):
        page = self._send_request(self.host).text
        return page

    def _make_soup_articles(self, page):
        soup = BeautifulSoup(page, 'html.parser')
        articles = soup.find_all('article')
        return articles

    def _get_full_article_text(self, link):
        page = self._send_request(link).text
        article = self._make_soup_articles(page)
        article_str = ''
        for charachter in article:
            article_str += charachter.text.strip()
            article_str.replace('\n', '')
        return article_str

    def _get_articles(self, page, *keywords):
        articles_list = []
        articles = self._make_soup_articles(page)

        for article in tqdm(articles, desc='Parse all articles on page'):
            for keyword in keywords:
                additional_url = article.find_all('a', class_='tm-article-snippet__title-link')[0]['href']
                link = self.host[:16] + additional_url
                if keyword.lower() in str(article).lower():
                    datetime = article.time['title']
                    title = article.h2.text
                    articles_list.append(f'{datetime}\n{title}\n{link}\n')
                elif keyword.lower() in self._get_full_article_text(link).lower():
                    datetime = article.time['title']
                    title = article.h2.text
                    articles_list.append(f'{datetime}\n{title}\n{link}\n')
        return articles_list
