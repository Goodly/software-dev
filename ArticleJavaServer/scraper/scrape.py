#!/usr/bin/python3
import sys
import os
import pandas as pd
import time
# https://newspaper.readthedocs.io/en/latest/
# !pip3 install newspaper3k
from newspaper import Article

url = sys.argv[1]

article = Article(url)
article.download()
article.parse()
print(article.text);
